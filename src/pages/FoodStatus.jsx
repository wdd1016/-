import { useContext } from "react";
import FoodContext from "./FoodContext";

const FoodStatus = () => {
  const { foods, deleteFood } = useContext(FoodContext);

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {foods.map((food) => (
          <div
            key={food.food.code}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "20px",
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={food.food.image_url}
              alt={food.food.product_name}
              style={{
                width: "120px",
                height: "160px",
                objectFit: "contain",
                marginBottom: "15px",
              }}
            />
            <div style={{ width: "100%" }}>
              <p
                style={{ fontSize: "14px", color: "#666", marginBottom: "4px" }}
              >
                브랜드: {food.food.brands}
              </p>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginBottom: "8px",
                }}
              >
                {food.food.product_name}
              </p>
              <p style={{ fontSize: "15px", marginBottom: "15px" }}>
                재고: {food.quantity}개
              </p>
              <button
                onClick={() => deleteFood(food.food)}
                style={{
                  width: "100%",
                  padding: "8px",
                  backgroundColor: "#ff4d4d",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodStatus;
