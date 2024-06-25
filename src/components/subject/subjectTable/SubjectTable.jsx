import React, { useState, useEffect } from "react";
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
  updateStream,
  deleteStream,
}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const onRowEditComplete = async (e) => {
    const { newData, index } = e;
    const { stream_id, stream } = newData;
    await updateStream(stream_id, stream, index);
  };

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
        style={{
          backgroundColor: "var(--secondary-color)",
          color: "var(--text-color-inverted)",
          width: "100%",
          fontSize: "16px",
          padding: "5px",
        }}
      />
    );
  };

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
    setIsDialogVisible(true);
  };

  const hideDialog = (rowData) => {
    //setSelectedRow(" ");
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
      <Button label="Save" className="dialog-btn" />
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
    const imageUrl = `data:image/jpeg;base64,${rowData.subject_image}`;
    console.log(`Image for ${rowData.subject_name}:`, rowData.subject_image);

    return (
      <img
        src={imageUrl}
        // alt={rowData.subject_name}
        // onError={(e) => {
        //   e.target.src = "path/to/placeholder.jpg"; // Fallback image
        // }}
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
        onRowEditComplete={onRowEditComplete}
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
          editor={(options) => textEditor(options)}
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
              <label htmlFor="name" className="font-bold">
                Name
              </label>
              <textarea
                id="name"
                // value={product.name}
                // onChange={(e) => onInputChange(e, "name")}
                required
                autoFocus
                className="dialog-input-text"
                // style={{
                //   height: "32px",
                //   border: " 1px solid var(--text-color-inverted)",
                //   borderRadius: "10px",
                //   background: "var(--input-background-color)",
                //   padding: "8px",
                //   color: "var(--base-text-color)",
                // }}
                //className={classNames({ "p-invalid": submitted && !product.name })}
              />
              {/* {submitted && !product.name && (
            <small className="p-error">Name is required.</small>
          )} */}
            </div>
          </div>
          <div className="field">
            <label className="mb-3 font-bold">Type</label>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className="field-radiobutton ">
                <RadioButton
                  inputId="category1"
                  name="category"
                  value="Accessories"
                  // onChange={onCategoryChange}
                  // checked={product.category === "Accessories"}
                />
                <label htmlFor="category1">Practical</label>
              </div>
              <div className="field-radiobutton ">
                <RadioButton
                  inputId="category2"
                  name="category"
                  value="Clothing"
                  // onChange={onCategoryChange}
                  // checked={product.category === "Clothing"}
                />
                <label htmlFor="category2">Theory</label>
              </div>
            </div>
          </div>
          <div className="field">
            <div className="dialog-label">
              <label htmlFor="description" className="font-bold">
                Subject Code
              </label>
              <textarea
                id="description"
                // value={product.description}
                // onChange={(e) => onInputChange(e, "description")}
                className="dialog-input-text"
                required
                rows={3}
                cols={20}
              />
            </div>
          </div>
          <div className="field">
            <div className="dialog-label">
              <label htmlFor="description" className="font-bold">
                Image
              </label>
              {/* <textarea
                id="description"
                // value={product.description}
                // onChange={(e) => onInputChange(e, "description")}
                className="dialog-input-text"
                required
                rows={3}
                cols={20}
              /> */}
              <div className="dialog-input-text">
                <div className="dialog-image-upload-container">
                  <input
                    type="file"
                    accept="image/*"
                    // onChange={handleImageUpload}
                    id="image-upload"
                    className="dialog-image-upload-input"
                  />
                  <input
                    type="text"
                    // value={fileName}
                    readOnly
                    placeholder="No file chosen"
                    className="dialog-image-upload-filename"
                  />
                  <label
                    htmlFor="image-upload"
                    className="dialog-image-upload-button"
                  >
                    Upload
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="form-area">
        <div className="form-second-title">Image</div>
        <div className="form-textarea">
          <div className="image-upload-container">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="image-upload"
              className="image-upload-input"
            />
            <input
              type="text"
              value={fileName}
              readOnly
              placeholder="No file chosen"
              className="image-upload-filename"
            />
            <label htmlFor="image-upload" className="image-upload-button">
              Upload
            </label>
          </div>
          {imageError && <div className="error-message">{imageError}</div>}
        </div>
      </div> */}
        </div>
      </Dialog>
    </div>
  );
};

export default SubjectTable;
