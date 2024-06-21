import React, { useState } from "react";
import { Form } from "react-router-dom";
import { toast } from "react-toastify"; // Make sure to import toast

const SubjectForm = ({ addSubject }) => {
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#ffff");

  const [subjectNameError, setSubjectNameError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [imageError, setImageError] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setImage(file);
      setImageError("");
    } else {
      setImageError("This field is required");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let valid = true;

    if (subjectName.trim() === "") {
      setSubjectNameError("This field is required");
      valid = false;
    } else {
      setSubjectNameError("");
    }

    if (type.trim() === "") {
      setTypeError("This field is required");
      valid = false;
    } else {
      setTypeError("");
    }

    if (!image) {
      setImageError("This field is required");
      valid = false;
    } else {
      setImageError("");
    }

    if (!valid) {
      return;
    }

    const formData = new FormData();
    formData.append("subject_name", subjectName);
    formData.append("subject_code", subjectCode);
    formData.append("subject_type", type);
    formData.append("subject_image", image);
    formData.append("subject_background_color", backgroundColor);

    try {
      await addSubject(formData);
      setSubjectName(""); // Clear the form
      setSubjectCode("");
      setType("");
      setImage(null);
      setFileName("");
      setSubjectNameError("");
      setTypeError("");
      setImageError("");
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("An error occurred during form submission.");
    }
  };

  return (
    <Form
      className="section-form"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <div className="form-top-title">Create Subject</div>
      <div className="form-area">
        <div className="form-second-title">Name</div>
        <div className="form-textarea">
          <textarea
            placeholder="Subject Name"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
          ></textarea>
          {subjectNameError && (
            <div className="error-message">{subjectNameError}</div>
          )}
        </div>
      </div>
      <div className="form-area">
        <div className="form-second-title">Type</div>
        <div className="form-radio-buttons">
          <label>
            <input
              type="radio"
              value="Practical"
              checked={type === "Practical"}
              onChange={(e) => setType(e.target.value)}
              style={{ marginRight: "5px" }}
            />
            Practical
          </label>
          <label>
            <input
              type="radio"
              value="Theory"
              checked={type === "Theory"}
              onChange={(e) => setType(e.target.value)}
              style={{ marginRight: "5px" }}
            />
            Theory
          </label>
        </div>
        {typeError && <div className="error-message">{typeError}</div>}
      </div>
      <div className="form-area">
        <div className="form-title">Subject code</div>
        <div className="form-textarea">
          <textarea
            placeholder="Subject Code"
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="form-area">
        <div className="form-second-title">Image</div>
        <div className="form-textarea">
          <div className="image-upload-container">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="image-upload"
              className="image-upload-input"
            />
            <input
              type="text"
              value={fileName}
              readOnly
              placeholder="No file chosen"
              className="image-upload-filename"
            />
            <label htmlFor="image-upload" className="image-upload-button">
              Upload
            </label>
          </div>
          {imageError && <div className="error-message">{imageError}</div>}
        </div>
      </div>
      <button type="submit" className="submit-btn">
        Submit
      </button>
    </Form>
  );
};

export default SubjectForm;
