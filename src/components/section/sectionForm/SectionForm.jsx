const SectionForm = () => {
  return (
    <form className="section-form">
      <div className="form-top-title">Create Section</div>
      <div className="form-area">
        <div className="form-second-title">Name</div>
        <div className="form-textarea">
          <textarea placeholder="Section Name"></textarea>
        </div>
      </div>
      <button className="submit-btn">Submit</button>
    </form>
  );
};

export default SectionForm;
