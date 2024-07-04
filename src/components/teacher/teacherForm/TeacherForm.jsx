import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";

const TeacherForm = () => {
  return (
    <Form
      className="section-form"
      // encType="multipart/form-data"
      // onSubmit={handleSubmit}
    >
      <div className="form-top-title">Create Teacher</div>
      <div className="form-area">
        <div className="form-second-title">Name</div>
        <div className="form-textarea">
          <textarea
            placeholder="Class Name"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
          ></textarea>
          {/* {nameError && <div className="error-message">{nameError}</div>} */}
        </div>
      </div>
      <div className="form-area">
        <div className="form-second-title">Section</div>
        <div className="form-textarea">
          {/* {sectionError && <div className="error-message">{sectionError}</div>} */}
        </div>
      </div>
      <div className="form-area">
        <div className="form-title">
          Stream
          <span style={{ color: "var(--primary-color)", marginLeft: "5px" }}>
            (optional)
          </span>
        </div>
        <div className="form-textarea"></div>
      </div>
      <button type="submit" className="submit-btn">
        Submit
      </button>
    </Form>
  );
};

export default TeacherForm;
