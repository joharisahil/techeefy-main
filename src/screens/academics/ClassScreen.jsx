import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AreaTop } from "../../components";
import ClassForm from "../../components/classess/classForm/ClassForm";
import ClassTable from "../../components/classess/classTable/ClassTable";
import "../../components/classess/classForm/ClassForm.scss";
import "../../components/classess/classTable/ClassTable.scss";

const Class = () => {
  const handleTitle = {
    title: "Class",
  };

  const [classList, setClassList] = useState([]);

  const addClass = async (formData) => {
    try {
      const response = await fetch("http://127.0.0.1:3000/class/add-class", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.result.success) {
        toast.success("Record Inserted Successfully");

        setClassList((prevList) => [
          ...prevList,
          {
            id: data.result.class_id,
            name: formData.class_name,
            sections: formData.class_section,
            streams: formData.class_stream,
          },
        ]);
      } else {
        toast.error("Record already exists");
      }
    } catch (error) {
      console.error("Error adding class:", error);
      toast.error("An error occurred while adding the class");
    }
  };

  return (
    <div className="content-area">
      <AreaTop handleTitle={handleTitle} />
      <section className="content-section-screen">
        <ClassForm addClass={addClass} />
        <ClassTable classList={classList} />
      </section>
      <ToastContainer />
    </div>
  );
};

export default Class;
