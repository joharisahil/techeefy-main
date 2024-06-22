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
        setSubjects(result.subjects); // Assuming the API response has a "subjects" field
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
              subject_image: formData.get("subject_image").name, // Assuming you need the image name
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

  const updateStream = async (stream_id, stream, index) => {
    const url = `http://localhost:3000/stream/update-stream/?stream_id=${stream_id}&stream_name=${encodeURIComponent(
      stream
    )}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.result.success) {
          // Check if sectionExist is false to avoid updating existing values
          if (!result.result.streamExist) {
            let updatedProducts = [...products];
            updatedProducts[index].stream = stream;
            setProducts(updatedProducts);
            toast.success("Section updated successfully!");
          } else {
            toast.error(
              "Section name already exists. Please choose a different name."
            );
          }
        } else {
          toast.error(result.message || "Failed to update section.");
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to update section.");
      }
    } catch (error) {
      console.error("Error updating section:", error);
      toast.error("Error updating section. Please try again.");
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
        setProducts((prevProducts) => {
          // Filter out the deleted section
          const updatedProducts = prevProducts.filter(
            (product) => product.stream_id !== stream_id
          );

          // Reassign serial numbers
          return updatedProducts.map((product, index) => ({
            ...product,
            serialNumber: index + 1,
          }));
        });
        toast.success("Section deleted successfully!");
      } else {
        toast.error("Failed to delete section.");
      }
    } catch (error) {
      console.error("Error deleting section:", error);
      toast.error("Error deleting section. Please try again.");
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
          //addStream={addStream}
          updateStream={updateStream}
          deleteStream={deleteStream}
        />
      </section>
    </div>
  );
};

export default Subject;
