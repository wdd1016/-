import { Outlet } from "react-router-dom";
import FoodNavigation from "./FoodNavigation.jsx";

const FoodLayout = () => {
  return (
    <div
      style={{
        width: "80vh",
        height: "100vh",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        paddingTop: "60px",
        border: "1px solid red",
        overflow: "auto",
      }}
    >
      <FoodNavigation />
      <div style={{ padding: "20px", marginTop: 200 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default FoodLayout;
