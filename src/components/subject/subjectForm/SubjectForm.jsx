import React, { useState } from "react";
import { Form } from "react-router-dom";

const SubjectForm = ({ addStream }) => {
  const [streamName, setStreamName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (streamName.trim() === "") {
      setErrorMessage("This field is required");
    } else {
      setErrorMessage("");
      // setSuccessMessage("");
      const result = await addStream(streamName);
      if (result.success) {
        //(result.message);
        setStreamName(""); // Clear the form
      } else {
        setErrorMessage(result.message);
      }
    }
  };

  return (
    <Form className="section-form" onSubmit={handleSubmit}>
      <div className="form-top-title">Create Subject</div>
      <div className="form-area">
        <div className="form-second-title">Name</div>
        <div className="form-textarea">
          <textarea
            placeholder="Stream Name"
            value={streamName}
            onChange={(e) => setStreamName(e.target.value)}
          ></textarea>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
      </div>
      <button type="submit" className="submit-btn">
        Submit
      </button>
      {/* {successMessage && (
        <div className="success-message">{successMessage}</div>
      )} */}
    </Form>
  );
};

export default SubjectForm;
