import React, { useState } from "react";
import { Form } from "react-router-dom";

const SectionForm = () => {
  const [sectionName, setSectionName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (sectionName.trim() === "") {
      setErrorMessage("This field is required");
    } else {
      setErrorMessage("");
      // Submit the form and handling successful submission
      setSuccessMessage("");

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
          setSuccessMessage("Section created successfully!");
          setSectionName(""); // Clear the form
        } else {
          const errorData = await response.json();
          setErrorMessage(
            errorData.message || "An error occurred. Please try again."
          );
        }
      } catch (error) {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <Form className="section-form" onSubmit={handleSubmit}>
      <div className="form-top-title">Create Section</div>
      <div className="form-area">
        <div className="form-second-title">Name</div>
        <div className="form-textarea">
          <textarea
            placeholder="Section Name"
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
          ></textarea>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
      </div>
      <button type="submit" className="submit-btn">
        Submit
      </button>
    </Form>
  );
};

export default SectionForm;
