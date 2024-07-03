import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { FilterMatchMode } from "primereact/api";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ClassTable = ({ classList, updateClass }) => {
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

  const [sections, setSections] = useState([]);
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/class/get-section-and-stream"
        );
        const data = await response.json();
        if (data.dataFound) {
          const streamsData = data.streams.map((stream) => ({
            label: stream.stream_name,
            value: stream.stream_name,
          }));
          const sectionsData = data.sections.map((section) => ({
            label: section.section_name,
            value: section.section_name,
          }));
          setStreams(streamsData);
          setSections(sectionsData);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

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

  const handleSave = async () => {
    // Call updateClass with formData
    await updateClass(formData);
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

  const serialNumberBodyTemplate = (rowData, options) => {
    return options.rowIndex + 1;
  };

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
          header="Sections"
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
          // body={actionBodyTemplate}
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
              <label htmlFor="class_name" className="font-bold">
                Name
              </label>
              <InputText
                id="class_name"
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
              <label htmlFor="class_section" className="font-bold">
                Section
              </label>
              <Dropdown
                id="class_section"
                name="class_section"
                value={formData.class_section}
                options={sections}
                onChange={handleInputChange}
                placeholder="Select a Section"
                className="dialog-input-text "
                required
              />
            </div>
          </div>
          <div className="field">
            <div className="dialog-label">
              <label htmlFor="class_stream" className="font-bold">
                Stream
              </label>
              <Dropdown
                id="class_stream"
                name="class_stream"
                value={formData.class_stream}
                options={streams}
                onChange={handleInputChange}
                placeholder="Select a Stream"
                className="dialog-input-text"
                required
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ClassTable;
