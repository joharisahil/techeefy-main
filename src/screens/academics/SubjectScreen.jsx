import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AreaTop } from "../../components";
import SubjectForm from "../../components/subject/subjectForm/SubjectForm";
import SubjectTable from "../../components/subject/subjectTable/SubjectTable";
import "../../components/subject/subjectForm/SubjectForm.scss";
import "../../components/subject/subjectTable/SubjectTable.scss";

const Subject = () => {
  const handleTitle = {
    title: "Subject",
  };

  const [subjects, setSubjects] = useState(null); // State to manage table data

  const fetchSubjects = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/subject/get-subjects"
      );
      if (response.ok) {
        const result = await response.json();
        setSubjects(result.subjects);
      } else {
        toast.error("Failed to fetch subjects. Please try again.");
      }
    } catch (error) {
      console.error("Error while fetching subjects:", error);
      toast.error("An error occurred while fetching the subjects.");
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const addSubject = async (formData) => {
    try {
      const response = await fetch(
        "http://localhost:3000/subject/add-subject",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.result.success) {
          setSubjects((prevSubjects) => [
            ...prevSubjects,
            {
              subject_id: result.result.subjectId,
              subject_name: formData.get("subject_name"),
              subject_code: formData.get("subject_code"),
              subject_type: formData.get("subject_type"),
              subject_background_color: formData.get(
                "subject_background_color"
              ),
              subject_image: formData.get("subject_image").name,
            },
          ]);
          toast.success("Subject created successfully!");
        } else {
          toast.error(result.message || "An error occurred. Please try again.");
        }
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.message || "An error occurred. Please try again."
        );
      }
    } catch (error) {
      console.error("Error while adding subject:", error);
      toast.error("An error occurred while adding the subject.");
    }
  };

  const updateSubject = async (subject_id, formData) => {
    try {
      const foormData = new FormData();
      foormData.append("subject_name", formData.subject_name);
      foormData.append("subject_code", formData.subject_code);
      foormData.append("subject_type", formData.subject_type);
      foormData.append("subject_image", formData.subject_image);
      foormData.append("subject_id", subject_id);
      console.log(formData);
      const response = await fetch(
        `http://localhost:3000/subject/update-subject`,
        {
          method: "PUT",
          body: foormData,
        }
      );
      if (response.ok) {
        const result = await response.json();
        const updatedSubjects = subjects.map((subject) =>
          subject.subject_id === subject_id ? result.updatedSubject : subject
        );
        setSubjects(updatedSubjects);
        toast.success("Subject updated successfully!");
      } else {
        const errorData = await response.json();
        console.error(
          "Failed to update subject:",
          errorData.message || response.statusText
        );
        toast.error("Failed to update subject. Please try again.");
      }
    } catch (error) {
      console.error("Error updating subject:", error);
      toast.error("An error occurred while updating the subject.");
    }
  };

  const deleteStream = async (stream_id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/stream/delete-stream/${stream_id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setSubjects((prevSubjects) => {
          // Filter out the deleted section
          const updatedSubjects = prevSubjects.filter(
            (subject) => subject.stream_id !== stream_id
          );

          // Reassign serial numbers
          return updatedSubjects.map((subject, index) => ({
            ...subject,
            serialNumber: index + 1,
          }));
        });
        toast.success("Subject deleted successfully!");
      } else {
        toast.error("Failed to delete subject.");
      }
    } catch (error) {
      console.error("Error deleting subject:", error);
      toast.error("Error deleting subject. Please try again.");
    }
  };

  return (
    <div className="content-area">
      <AreaTop handleTitle={handleTitle} />
      <section className="content-section-screen">
        <SubjectForm addSubject={addSubject} />
        <SubjectTable
          subjects={subjects}
          setSubjects={setSubjects}
          updateSubject={updateSubject}
          deleteStream={deleteStream}
        />
      </section>
    </div>
  );
};

export default Subject;
