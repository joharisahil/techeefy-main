import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { Button } from "primereact/button";
import { MdDeleteOutline } from "react-icons/md";
import { FilterMatchMode } from "primereact/api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

const SubjectTable = ({
  subjects,
  setSubjects,
  updateSubject,
  deleteStream,
}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [formData, setFormData] = useState({
    subject_id: "",
    subject_name: "",
    subject_code: "",
    subject_type: "",
    subject_image: "",
  });

  const editTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-text"
        onClick={() => onEditRow(rowData)}
      />
    );
  };

  const onEditRow = (rowData) => {
    setSelectedRow(rowData);
    setFormData({ ...rowData });
    setIsDialogVisible(true);
  };

  const hideDialog = () => {
    setSelectedRow(null);
    setIsDialogVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        subject_image: file.name,
      }));
    }
  };

  const handleSave = async () => {
    await updateSubject(formData.subject_id, formData);
    setIsDialogVisible(false);
  };

  const productDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        className="dialog-btn"
        outlined
        onClick={hideDialog}
      />
      <Button label="Save" className="dialog-btn" onClick={handleSave} />
    </React.Fragment>
  );

  const actionBodyTemplate = (rowData) => {
    return (
      <Button
        icon={<MdDeleteOutline size={20} />}
        style={{ margin: "9px", color: "var(--text-color-inverted)" }}
        onClick={() => deleteStream(rowData.stream_id)}
      />
    );
  };

  const serialNumberBodyTemplate = (rowData, options) => {
    return options.rowIndex + 1;
  };

  const imageBodyTemplate = (rowData) => {
    const imageUrl = rowData.subject_image;
    return (
      <img
        src={imageUrl}
        //alt={rowData.subject_name}
        style={{ width: "30px", height: "30px", objectFit: "cover" }}
      />
    );
  };

  const exportToExcel = () => {
    const exportData = subjects.map((subject, index) => ({
      SerialNumber: index + 1,
      SubjectName: subject.subject_name,
      SubjectCode: subject.subject_code,
      SubjectType: subject.subject_type,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Subjects");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "subjects.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Serial Number", "Name", "Code", "Type"]],
      body: subjects.map((subject, index) => [
        index + 1,
        subject.subject_name,
        subject.subject_code,
        subject.subject_type,
      ]),
    });
    doc.save("subjects.pdf");
  };

  return (
    <div className="section-form">
      <div className="form-top-title" style={{ marginBottom: "22px" }}>
        Subject List
      </div>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          marginBottom: "5px",
          width: "100%",
          gap: "17rem",
        }}
      >
        <InputText
          onInput={(e) => {
            setFilters({
              global: {
                value: e.target.value,
                matchMode: FilterMatchMode.CONTAINS,
              },
            });
          }}
          placeholder="Filter by Name"
          style={{
            backgroundColor: "var(--secondary-color)",
            color: "var(--text-color-inverted)",
            maxWidth: "20%",
            fontSize: "16px",
            padding: "5px",
            border: "2px solid var(--text-color-inverted)",
            borderRadius: "4px",
            marginRight: "10px",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            fontSize: "20px",
          }}
        >
          <Button
            label="Export to Excel"
            icon="pi pi-file-excel"
            onClick={exportToExcel}
            style={{
              marginRight: "10px",
              color: "var(--light-color)",
              fontSize: "16px",
              padding: "12px 20px",
              backgroundColor: "var(--primary-color)",
              borderRadius: "8px",
              fontFamily: "ui-sans-serif",
            }}
          />
          <Button
            label="Export to PDF"
            icon="pi pi-file-pdf"
            onClick={exportToPDF}
            style={{
              color: "var(--light-color)",
              fontSize: "16px",
              padding: "12px 20px",
              backgroundColor: "var(--primary-color)",
              borderRadius: "8px",
              fontFamily: "ui-sans-serif",
            }}
          />
        </div>
      </div>
      <DataTable
        value={subjects}
        editMode="row"
        paginator
        rows={5}
        removableSort
        filters={filters}
        tableStyle={{ minWidth: "50rem" }}
        className="p-datatable-gridlines section-table"
      >
        <Column
          field="serialNumber"
          header="Serial Number"
          body={serialNumberBodyTemplate}
          style={{ width: "20%", padding: "8px" }}
        ></Column>
        <Column
          field="subject_name"
          header="Name"
          sortable
          style={{ width: "20%", padding: "8px" }}
        ></Column>
        <Column
          field="subject_code"
          header="Subject Code"
          sortable
          style={{ width: "20%", padding: "8px" }}
        ></Column>
        <Column
          field="subject_image"
          header="Image"
          body={imageBodyTemplate}
          style={{ width: "10%", padding: "8px" }}
        ></Column>
        <Column
          field="subject_type"
          header="Type"
          sortable
          style={{ width: "20%", padding: "8px" }}
        ></Column>
        <Column
          body={editTemplate}
          header="Edit"
          style={{ width: "10%", minWidth: "2rem" }}
        ></Column>
        <Column
          body={actionBodyTemplate}
          header="Delete"
          style={{ width: "10%", minWidth: "2rem" }}
        ></Column>
      </DataTable>
      <Dialog
        visible={isDialogVisible}
        style={{
          width: "32rem",
          backgroundColor: "var(--secondary-color)",
          color: "var(--text-color-inverted)",
          border: "3px solid var(--text-color-inverted)",
          fontWeight: "bold",
          borderRadius: "12px",
          padding: "25px",
        }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Edit"
        modal
        dismissableMask={true}
        footer={productDialogFooter}
        onHide={hideDialog}
        draggable={false}
      >
        <div style={{ overflowX: "hidden" }}>
          <div className="field" style={{ marginTop: "22px" }}>
            <div className="dialog-label">
              <label htmlFor="subject_name" className="font-bold">
                Name
              </label>
              <textarea
                id="subject_name"
                name="subject_name"
                value={formData.subject_name}
                onChange={handleInputChange}
                required
                autoFocus
                className="dialog-input-text"
              />
            </div>
          </div>
          <div className="field">
            <label className="mb-3 font-bold">Type</label>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className="field-radiobutton">
                <RadioButton
                  inputId="type_practical"
                  name="subject_type"
                  value="Practical"
                  checked={formData.subject_type === "Practical"}
                  onChange={handleInputChange}
                />
                <label htmlFor="type_practical">Practical</label>
              </div>
              <div className="field-radiobutton">
                <RadioButton
                  inputId="type_theory"
                  name="subject_type"
                  value="Theory"
                  checked={formData.subject_type === "Theory"}
                  onChange={handleInputChange}
                />
                <label htmlFor="type_theory">Theory</label>
              </div>
            </div>
          </div>
          <div className="field">
            <div className="dialog-label">
              <label htmlFor="subject_code" className="font-bold">
                Subject Code
              </label>
              <textarea
                id="subject_code"
                name="subject_code"
                value={formData.subject_code}
                onChange={handleInputChange}
                className="dialog-input-text"
                required
                rows={3}
                cols={20}
              />
            </div>
          </div>
          <div className="field">
            <div className="dialog-label">
              <label htmlFor="subject_image" className="font-bold">
                Image
              </label>
              <div className="dialog-input-text">
                <div className="dialog-image-upload-container">
                  <input
                    type="file"
                    accept="image/*"
                    id="dialog_image-upload"
                    className="dialog-image-upload-input"
                    onChange={handleImageChange}
                  />
                  <input
                    type="text"
                    readOnly
                    value={formData.subject_image}
                    className="dialog-image-upload-filename"
                  />
                  <label
                    htmlFor="dialog_image-upload"
                    className="dialog-image-upload-button"
                  >
                    Upload
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default SubjectTable;
