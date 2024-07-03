import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AreaTop } from "../../components";
import ClassForm from "../../components/classess/classForm/ClassForm";
import ClassTable from "../../components/classess/classTable/ClassTable";
import "../../components/classess/classForm/ClassForm.scss";
import "../../components/classess/classTable/ClassTable.scss";

const AddNewTeacherScreen = () => {
  const handleTitle = {
    title: "Manage Teacher",
  };

  return (
    <div className="content-area">
      <ToastContainer />
      <AreaTop handleTitle={handleTitle} />
      <section className="content-section-screen">
        {/* <ClassForm addClass={addClass} />
        <ClassTable classList={classList} updateClass={updateClass} /> */}
      </section>
    </div>
  );
};

export default AddNewTeacherScreen;
