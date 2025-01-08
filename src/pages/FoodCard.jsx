import { useContext, useState } from "react";
import FoodContext from "./FoodContext.jsx";


const FoodCard = ({ food }) => {
  const [quantity, setQuantity] = useState(0);
  const { addFood } = useContext(FoodContext);


  return (
    <div
      key={food.code}
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "15px",
        backgroundColor: "white",
      }}
    >
      {food.image_url && (
        <img
          src={food.image_url}
          alt={food.product_name}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
      )}
      <h3 style={{ marginTop: "10px", fontSize: "16px" }}>
        {food.product_name || "제품명 없음"}
      </h3>
      <p style={{ color: "#666" }}>브랜드: {food.brands || "정보 없음"}</p>
      <input
        type="text"
        value={quantity || ""}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button
        onClick={() => {
          addFood(food, quantity);
          setQuantity(0);
        }}
      >
        재고 추가
      </button>
    </div>
  );
};


export default FoodCard;