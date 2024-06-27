import React, { useState } from "react";
import { AreaTop } from "../../components";
import ClassForm from "../../components/classess/classForm/ClassForm";
import ClassTable from "../../components/classess/classTable/ClassTable";
import "../../components/classess/classForm/ClassForm.scss";
import "../../components/classess/classTable/ClassTable.scss";

const Class = () => {
  const handleTitle = {
    title: "Class",
  };

  const [classList, setClassList] = useState(null);

  return (
    <div className="content-area">
      <AreaTop handleTitle={handleTitle} />
      <section className="content-section-screen">
        <ClassForm />
        <ClassTable />
      </section>
    </div>
  );
};

export default Class;
