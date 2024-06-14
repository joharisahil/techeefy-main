import { AreaCards, AreaCharts, AreaTable, AreaTop } from "../../components";

const Dashboard = () => {
  const handleTitle = {
    title: "Dashboard",
  };
  return (
    <div className="content-area">
      <AreaTop handleTitle={handleTitle} />
      <AreaCards />
      {/* <AreaCharts />
      <AreaTable /> */}
    </div>
  );
};

export default Dashboard;
