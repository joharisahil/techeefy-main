import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
//import "primereact/resources/themes/arya-purple/theme.css"; // or any other theme

const SectionTable = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/section/get-sections")
      .then((response) => response.json())
      .then((data) => {
        if (data.dataFound) {
          const formattedData = data.sections.map((item, index) => ({
            ...item,
            serialNumber: index + 1,
            section: item.section_name,
          }));
          setProducts(formattedData);
        }
      });
  }, []);

  const onRowEditComplete = (e) => {
    let _products = [...products];
    let { newData, index } = e;

    _products[index] = newData;

    setProducts(_products);
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

  return (
    <div className="section-form">
      <div className="form-top-title" style={{ marginBottom: "22px" }}>
        Section List
      </div>
      <DataTable
        value={products}
        editMode="row"
        dataKey="section_id"
        onRowEditComplete={onRowEditComplete}
        tableStyle={{ minWidth: "50rem" }}
        className="p-datatable-gridlines section-table"
      >
        <Column
          field="serialNumber"
          header="Serial Number"
          style={{ width: "10%", padding: "8px" }}
        ></Column>
        <Column
          field="section"
          header="Name"
          editor={(options) => textEditor(options)}
          style={{ width: "10%", padding: "8px" }}
        ></Column>
        <Column
          rowEditor
          header="Action"
          style={{ width: "10%", minWidth: "2rem" }}
          //bodyStyle={{ textAlign: "center" }}
        ></Column>
      </DataTable>
    </div>
  );
};

export default SectionTable;
