import { useContext, useState } from "react";
import FoodContext from "./FoodContext.jsx";

const FoodCard = ({ food }) => {
  const [quantity, setQuantity] = useState(0);
  const { addFood } = useContext(FoodContext);

  return (
    <div
      key={food.code}
      style={{
        width: 300,
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "15px",
        backgroundColor: "white",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {food.image_url && (
          <img
            src={food.image_url}
            alt={food.product_name}
            style={{
              width: 100,
              height: 120,
              objectFit: "contain",
              borderRadius: "4px",
            }}
          />
        )}
        <h3 style={{ marginTop: "10px", fontSize: "16px" }}>
          {food.product_name || "제품명 없음"}
        </h3>
        <p style={{ color: "#666" }}>브랜드: {food.brands || "정보 없음"}</p>
        <div style={{ display: "flex", alignItems: "center", marginTop: 4 }}>
          <input
            type="text"
            value={quantity || ""}
            onChange={(e) => setQuantity(e.target.value)}
            style={{ padding: 6 }}
          />
          <button
            style={{ padding: 6 }}
            onClick={() => {
              addFood(food, quantity);
              setQuantity(0);
            }}
          >
            재고 추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
