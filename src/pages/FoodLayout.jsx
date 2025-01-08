import { Outlet } from "react-router-dom";
import FoodNavigation from "./FoodNavigation.jsx";
import FoodContextProvider from "./FoodContextProvider.jsx";


const FoodLayout = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FoodNavigation />
      <FoodContextProvider>
        <Outlet />
      </FoodContextProvider>
    </div>
  );
};


export default FoodLayout;
