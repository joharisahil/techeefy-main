import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AreaTop } from "../../components";
import SectionForm from "../../components/section/sectionForm/SectionForm";
import SectionTable from "../../components/section/sectionTable/SectionTable";
import "../../components/section/sectionForm/SectionForm.scss";
import "../../components/section/sectionTable/SectionTable.scss";

const Section = () => {
  const handleTitle = {
    title: "Section",
  };

  const [products, setProducts] = useState(null); // State to manage table data

  useEffect(() => {
    // Fetch data for the table initially
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

  const addSection = async (sectionName) => {
    try {
      const response = await fetch(
        "http://localhost:3000/section/add-section",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ section: sectionName }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.result.success) {
          // Update products state with the new section added
          fetch("http://localhost:3000/section/get-sections")
            .then((response) => response.json())
            .then((data) => {
              setProducts((prevProducts) => [
                ...prevProducts,
                {
                  section_id:
                    data.sections[data.sections.length - 1].section_id,
                  serialNumber: prevProducts.length + 1,
                  section: data.sections[data.sections.length - 1].section_name,
                },
              ]);
            });
          toast.success("Section created successfully!");
        } else {
          toast.error(result.message || "An error occurred. Please try again.");
        }
        return { success: true, message: "Section created successfully!" };
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.message || "An error occurred. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const updateSection = async (section_id, section, index) => {
    const url = `http://localhost:3000/section/update-section/?section_id=${section_id}&section_name=${encodeURIComponent(
      section
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
          if (!result.result.sectionExist) {
            let updatedProducts = [...products];
            updatedProducts[index].section = section;
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

  const deleteSection = async (section_id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/section/delete-section/${section_id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setProducts((prevProducts) => {
          // Filter out the deleted section
          const updatedProducts = prevProducts.filter(
            (product) => product.section_id !== section_id
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
        <SectionForm addSection={addSection} />
        <SectionTable
          products={products}
          addSection={addSection}
          updateSection={updateSection}
          deleteSection={deleteSection}
        />
      </section>
    </div>
  );
};

export default Section;
