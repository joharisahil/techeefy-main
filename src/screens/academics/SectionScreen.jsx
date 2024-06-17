import { AreaTop } from "../../components";
import SectionForm from "../../components/section/sectionForm/SectionForm";
import SectionTable from "../../components/section/sectionTable/SectionTable";
import "../../components/section/sectionForm/SectionForm.scss";
import "../../components/section/sectionTable/SectionTable.scss";

const Section = () => {
  const handleTitle = {
    title: "Section",
  };
  return (
    <div className="content-area">
      <AreaTop handleTitle={handleTitle} />
      <section className="content-section-screen">
        <SectionForm />
        <SectionTable />
      </section>
    </div>
  );
};

export default Section;
