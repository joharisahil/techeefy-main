import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { Button } from "primereact/button";
import { MdDeleteOutline } from "react-icons/md";
//import "primereact/resources/themes/arya-purple/theme.css"; // or any other theme

const SectionTable = ({
  products,
  setProducts,
  updateSection,
  deleteSection,
}) => {
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

  return (
    <div className="section-form">
      <div className="form-top-title" style={{ marginBottom: "22px" }}>
        Section List
      </div>
      <DataTable
        value={products}
        editMode="row"
        onRowEditComplete={onRowEditComplete}
        paginator
        rows={5}
        removableSort
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
