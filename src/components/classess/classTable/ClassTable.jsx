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

const ClassTable = ({ classList }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [formData, setFormData] = useState({
    class_id: "",
    class_name: "",
    class_section: "",
    class_stream: "",
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

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       subject_image: file,
  //     }));
  //   }
  // };

  const handleSave = async () => {
    // await updateSubject(formData.subject_id, formData);
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

  // const actionBodyTemplate = (rowData) => {
  //   return (
  //     <Button
  //       icon={<MdDeleteOutline size={20} />}
  //       style={{ margin: "9px", color: "var(--text-color-inverted)" }}
  //       onClick={() => deleteStream(rowData.stream_id)}
  //     />
  //   );
  // };

  const serialNumberBodyTemplate = (rowData, options) => {
    return options.rowIndex + 1;
  };

  // const imageBodyTemplate = (rowData) => {
  //   const imageUrl = JSON.stringify(rowData.subject_image);
  //   return (
  //     <img
  //       src={imageUrl}
  //       //alt={rowData.subject_name}
  //       style={{ width: "30px", height: "30px", objectFit: "cover" }}
  //     />
  //   );
  // };

  // const exportToExcel = () => {
  //   const exportData = subjects.map((subject, index) => ({
  //     SerialNumber: index + 1,
  //     SubjectName: subject.subject_name,
  //     SubjectCode: subject.subject_code,
  //     SubjectType: subject.subject_type,
  //   }));

  //   const worksheet = XLSX.utils.json_to_sheet(exportData);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Subjects");
  //   const excelBuffer = XLSX.write(workbook, {
  //     bookType: "xlsx",
  //     type: "array",
  //   });
  //   const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  //   saveAs(data, "subjects.xlsx");
  // };

  // const exportToPDF = () => {
  //   const doc = new jsPDF();
  //   doc.autoTable({
  //     head: [["Serial Number", "Name", "Code", "Type"]],
  //     body: subjects.map((subject, index) => [
  //       index + 1,
  //       subject.subject_name,
  //       subject.subject_code,
  //       subject.subject_type,
  //     ]),
  //   });
  //   doc.save("subjects.pdf");
  // };

  return (
    <div className="section-form">
      <div className="form-top-title" style={{ marginBottom: "22px" }}>
        Class List
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
            // onClick={exportToExcel}
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
            // onClick={exportToPDF}
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
        value={classList}
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
          field="name"
          header="Name"
          sortable
          style={{ width: "20%", padding: "8px" }}
        ></Column>
        <Column
          field="sections"
          header="Section"
          sortable
          style={{ width: "20%", padding: "8px" }}
        ></Column>
        <Column
          field="streams"
          header="Stream"
          style={{ width: "10%", padding: "8px" }}
        ></Column>
        <Column
          body={editTemplate}
          header="Edit"
          style={{ width: "10%", minWidth: "2rem" }}
        ></Column>
        <Column
          //body={actionBodyTemplate}
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
                id="name"
                name="class_name"
                value={formData.class_name}
                onChange={handleInputChange}
                required
                autoFocus
                className="dialog-input-text"
              />
            </div>
          </div>
          <div className="field">
            <div className="dialog-label">
              <label htmlFor="subject_code" className="font-bold">
                Section
              </label>
              <textarea
                id="subject_code"
                name="subject_code"
                value={formData.class_section}
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
              <label htmlFor="subject_code" className="font-bold">
                Stream
              </label>
              <textarea
                id="subject_code"
                name="subject_code"
                value={formData.class_stream}
                onChange={handleInputChange}
                className="dialog-input-text"
                required
                rows={3}
                cols={20}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ClassTable;
