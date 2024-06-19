import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
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
//import "primereact/resources/themes/arya-purple/theme.css"; // or any other theme

const SectionTable = ({
  products,
  setProducts,
  updateSection,
  deleteSection,
}) => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const onRowEditComplete = async (e) => {
    const { newData, index } = e;
    const { section_id, section } = newData;

    await updateSection(section_id, section, index);
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

  const actionBodyTemplate = (rowData) => {
    return (
      <Button
        icon={<MdDeleteOutline size={20} />}
        style={{ margin: "9px", color: "var(--text-color-inverted)" }}
        onClick={() => deleteSection(rowData.section_id)}
      />
    );
  };

  // Create a function to generate serial numbers based on the current sorted order
  const serialNumberBodyTemplate = (rowData, options) => {
    return options.rowIndex + 1;
  };

  const exportToExcel = () => {
    // Transform the data to include only serial number and section name
    const exportData = products.map((product, index) => ({
      SerialNumber: index + 1,
      SectionName: product.section,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sections");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "sections.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Serial Number", "Name"]],
      body: products.map((product, index) => [index + 1, product.section]),
    });
    doc.save("sections.pdf");
  };

  return (
    <div className="section-form">
      <div className="form-top-title" style={{ marginBottom: "22px" }}>
        Section List
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
            //className="p-button-success"
            style={{
              marginRight: "10px",
              color: "#ffffff",
              fontSize: "16px",
              padding: "12px 20px",
              backgroundColor: "var(--primary-color)",
              borderRadius: "8px",
            }}
          />
          <Button
            label="Export to PDF"
            icon="pi pi-file-pdf"
            onClick={exportToPDF}
            style={{
              color: "#ffffff",
              fontSize: "16px",
              padding: "12px 20px",
              backgroundColor: "var(--primary-color)",
              borderRadius: "8px",
            }}
            //className="p-button-warning"
          />
        </div>
      </div>
      <DataTable
        value={products}
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
          style={{ width: "10%", padding: "8px" }}
        ></Column>
        <Column
          field="section"
          header="Name"
          sortable
          editor={(options) => textEditor(options)}
          style={{ width: "10%", padding: "8px" }}
        ></Column>
        <Column
          rowEditor
          header="Edit"
          style={{ width: "10%", minWidth: "2rem" }}
        ></Column>
        <Column
          body={actionBodyTemplate}
          header="Delete"
          style={{ width: "10%", minWidth: "2rem" }}
        ></Column>
      </DataTable>
    </div>
  );
};

export default SectionTable;
