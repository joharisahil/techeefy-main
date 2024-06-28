import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";

const ClassForm = ({ addClass }) => {
  const [streams, setStreams] = useState([]);
  const [sections, setSections] = useState([]);
  const [state, setState] = useState({});
  const [name, setName] = useState("");
  const [sectionError, setSectionError] = useState("");
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/class/get-section-and-stream"
        );
        const data = await response.json();
        if (data.dataFound) {
          const streamsData = data.streams.map((stream) => ({
            stream_id: stream.stream_id,
            stream_name: stream.stream_name,
          }));
          const sectionsData = data.sections.map((section) => ({
            section_id: section.section_id,
            section_name: section.section_name,
          }));
          setStreams(streamsData);
          setSections(sectionsData);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setState((prevState) => ({ ...prevState, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setNameError("This field is required");
    } else {
      setNameError("");
    }

    const selectedSections = Object.keys(state)
      .filter(
        (key) =>
          state[key] &&
          sections.some((section) => section.section_id === parseInt(key))
      )
      .map(
        (key) =>
          sections.find((section) => section.section_id === parseInt(key))
            .section_name
      );

    const selectedStreams = Object.keys(state)
      .filter(
        (key) =>
          state[key] &&
          streams.some((stream) => stream.stream_id === parseInt(key))
      )
      .map(
        (key) =>
          streams.find((stream) => stream.stream_id === parseInt(key))
            .stream_name
      );

    if (selectedSections.length === 0) {
      setSectionError("At least one section must be selected");
    } else {
      setSectionError("");
    }

    if (name && selectedSections.length > 0) {
      try {
        const formData = {
          class_name: name,
          class_section: selectedSections.join(", "),
          class_stream: selectedStreams.join(", "),
        };

        const response = await addClass(formData);
        setName("");
        setState({});
        setSectionError("");
        setNameError("");
      } catch (error) {
        console.error("Error adding class:", error);
        // Handle error state or display error message to user
      }
    }
  };

  return (
    <Form
      className="section-form"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <div className="form-top-title">Create Class</div>
      <div className="form-area">
        <div className="form-second-title">Name</div>
        <div className="form-textarea">
          <textarea
            placeholder="Class Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></textarea>
          {nameError && <div className="error-message">{nameError}</div>}
        </div>
      </div>
      <div className="form-area">
        <div className="form-second-title">Section</div>
        <div className="form-textarea">
          <ul>
            {sections.map((item) => (
              <li
                key={item.section_id}
                style={{ color: "var(--base-text-color)" }}
              >
                <input
                  type="checkbox"
                  name={item.section_id}
                  checked={!!state[item.section_id]}
                  onChange={handleChange}
                  style={{ marginRight: "5px" }}
                />
                {item.section_name}
              </li>
            ))}
          </ul>
          {sectionError && <div className="error-message">{sectionError}</div>}
        </div>
      </div>
      <div className="form-area">
        <div className="form-title">
          Stream
          <span style={{ color: "var(--primary-color)", marginLeft: "5px" }}>
            (optional)
          </span>
        </div>
        <div className="form-textarea">
          <ul>
            {streams.map((item) => (
              <li
                key={item.stream_id}
                style={{ color: "var(--base-text-color)" }}
              >
                <input
                  type="checkbox"
                  name={item.stream_id}
                  checked={!!state[item.stream_id]}
                  onChange={handleChange}
                  style={{ marginRight: "5px" }}
                />
                {item.stream_name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button type="submit" className="submit-btn">
        Submit
      </button>
    </Form>
  );
};

export default ClassForm;
