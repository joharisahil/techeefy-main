import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";

const ClassForm = () => {
  const [streams, setStreams] = useState([]);
  const [sections, setSections] = useState([]);
  const [state, setState] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/class/get-section-and-stream"
        );
        const data = await response.json();
        if (data.dataFound) {
          const streamsData = data.streams.map((stream) => ({
            id: stream.stream_id,
            name: stream.stream_name,
          }));
          const sectionsData = data.sections.map((section) => ({
            id: section.section_id,
            name: section.section_name,
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

  return (
    <Form className="section-form" encType="multipart/form-data">
      <div className="form-top-title">Create Class</div>
      <div className="form-area">
        <div className="form-second-title">Name</div>
        <div className="form-textarea">
          <textarea placeholder="Class Name"></textarea>
        </div>
      </div>
      <div className="form-area">
        <div className="form-second-title">Section</div>
        <div className="form-textarea">
          <ul>
            {sections.map((item) => (
              <li key={item.id} style={{ color: "var(--base-text-color)" }}>
                <input
                  type="checkbox"
                  name={item.id}
                  checked={!!state[item.id]}
                  onChange={handleChange}
                  style={{ marginRight: "5px" }}
                />
                {item.name}
              </li>
            ))}
          </ul>
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
              <li key={item.id} style={{ color: "var(--base-text-color)" }}>
                <input
                  type="checkbox"
                  name={item.id}
                  checked={!!state[item.id]}
                  onChange={handleChange}
                  style={{ marginRight: "5px" }}
                />
                {item.name}
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
