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

  const [products, setProducts] = useState(null); // State to manage table data

  useEffect(() => {
    // Fetch data for the table initially
    fetch("http://localhost:3000/stream/get-stream")
      .then((response) => response.json())
      .then((data) => {
        if (data.dataFound) {
          const formattedData = data.streams.map((item, index) => ({
            ...item,
            serialNumber: index + 1,
            stream: item.stream_name,
          }));
          setProducts(formattedData);
        }
      });
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

      const data = await response.json();

      if (data.result.success) {
        toast.success("Record Inserted Successfully");
      } else {
        toast.error("Record already exists");
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
          products={products}
          //addStream={addStream}
          updateStream={updateStream}
          deleteStream={deleteStream}
        />
      </section>
    </div>
  );
};

export default Subject;
