import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AreaTop } from "../../components";
import "../../components/teacher/teacherForm/TeacherForm.scss";
import "../../components/teacher/teacherTable/TeacherTable.scss";
import TeacherForm from "../../components/teacher/teacherForm/TeacherForm";
import TeacherTable from "../../components/teacher/teacherTable/TeacherTable";

const AddNewTeacherScreen = () => {
  const handleTitle = {
    title: "Manage Teacher",
  };

  return (
    <div className="content-area">
      <ToastContainer />
      <AreaTop handleTitle={handleTitle} />
      <section className="content-section-screen">
        <TeacherForm />
        <TeacherTable />
      </section>
    </div>
  );
};

export default AddNewTeacherScreen;
