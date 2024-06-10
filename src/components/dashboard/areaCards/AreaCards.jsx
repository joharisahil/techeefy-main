import AreaCard from "./AreaCard";
import "./AreaCards.scss";

const AreaCards = () => {
  return (
    <section className="content-area-cards">
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={80}
        cardInfo={{
          title: "Todays Fees Collection",
          value: "2,34,900 rs",
          text: "We have got 150 student fees.",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={93}
        cardInfo={{
          title: "Todays Attendence (Staff)",
          value: "93%",
          text: "Better than previous week",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={60}
        cardInfo={{
          title: "Todays Attendence (Student's)",
          value: "60%",
          text: "Lower than previous week",
        }}
      />
    </section>
  );
};

export default AreaCards;
