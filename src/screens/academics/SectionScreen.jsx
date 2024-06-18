import React, { useState, useEffect } from "react";
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
        // Update products state with the new section added
        setProducts((prevProducts) => [
          ...prevProducts,
          {
            section_id: result.section_id,
            serialNumber: prevProducts.length + 1,
            section: sectionName,
          },
        ]);
        return { success: true, message: "Section created successfully!" };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.message || "An error occurred. Please try again.",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "An error occurred. Please try again.",
      };
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
        let updatedProducts = [...products];
        updatedProducts[index].section = section;
        setProducts(updatedProducts);
      } else {
        console.error("Failed to update section.");
      }
    } catch (error) {
      console.error("Error updating section:", error);
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
      } else {
        console.error("Failed to delete section.");
      }
    } catch (error) {
      console.error("Error deleting section:", error);
    }
  };

  return (
    <div className="content-area">
      <AreaTop handleTitle={handleTitle} />
      <section className="content-section-screen">
        <SectionForm addSection={addSection} />
        <SectionTable
          products={products}
          setProducts={setProducts}
          updateSection={updateSection}
          deleteSection={deleteSection}
        />
      </section>
    </div>
  );
};

export default Section;
