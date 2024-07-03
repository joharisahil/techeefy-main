import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    // Fetch data for the table initially
    fetch("http://localhost:3000/class/get-classes")
      .then((response) => response.json())
      .then((data) => {
        if (data.dataFound) {
          const formattedData = data.classes.map((item, index) => ({
            ...item,
            serialNumber: index + 1,
            name: item.class_name,
            sections: item.class_section,
            streams: item.class_stream,
          }));
          setClassList(formattedData);
        }
      });
  }, []);

  const addClass = async (formData) => {
    try {
      const response = await fetch("http://localhost:3000/class/add-class", {
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
            serialNumber: prevList.length + 1,
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

  const updateClass = async (formData) => {
    try {
      const { class_id, ...data } = formData;
      const url = `http://127.0.0.1:3000/class/update-class/${class_id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if (result && result.result && result.result.success) {
        toast.success("Record Updated Successfully");

        // Update the classList state to reflect the changes
        setClassList((prevList) =>
          prevList.map((item) =>
            item.id === class_id
              ? {
                  ...item,
                  name: formData.class_name,
                  sections: formData.class_section,
                  streams: formData.class_stream,
                }
              : item
          )
        );
      } else {
        toast.error("Failed to update record");
      }
    } catch (error) {
      console.error("Error updating class:", error);
      toast.error("An error occurred while updating the class");
    }
  };

  return (
    <div className="content-area">
      <ToastContainer />
      <AreaTop handleTitle={handleTitle} />
      <section className="content-section-screen">
        <ClassForm addClass={addClass} />
        <ClassTable classList={classList} updateClass={updateClass} />
      </section>
    </div>
  );
};

export default Class;
