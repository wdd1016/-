import { useContext, useState } from "react";
import FoodContext from "./FoodContext";

const FoodSellItem = ({ food, quantity, addBucket }) => {
  const [purchase, setPurchase] = useState(0);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        margin: "10px",
        width: "300px",
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src={food.image_url}
        alt={food.product_name}
        style={{
          width: "120px",
          height: "160px",
          objectFit: "contain",
          marginBottom: "15px",
        }}
      />
      <p style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "8px" }}>
        {food.product_name}
      </p>
      <p style={{ color: "#666", marginBottom: "12px" }}>
        구매 가능 수량: {quantity}
      </p>
      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        <input
          type="number"
          value={purchase || ""}
          onChange={(e) => setPurchase(e.target.value)}
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        <button
          onClick={() => {
            addBucket(food, purchase);
            setPurchase(0);
          }}
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          담기
        </button>
      </div>
    </div>
  );
};

const FoodSell = () => {
  const { foods, purchaseFood } = useContext(FoodContext);
  const [bucket, setBuckets] = useState([]);

  const addBucket = (food, quantity) => {
    if (bucket.length === 0) {
      setBuckets([{ food, quantity: Number(quantity) }]);
      return;
    }

    const newBucket = bucket.map((item) =>
      item.food.code === food.code
        ? { ...item, quantity: Number(quantity) + Number(item.quantity) }
        : item
    );
    setBuckets([...newBucket, { food, quantity: Number(quantity) }]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1
          style={{
            marginBottom: "20px",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          재고 목록
        </h1>
        <div
          style={{
            width: 220,
            padding: 10,
            backgroundColor: "white",
            borderRadius: 10,
            border: "1px solid black",
          }}
        >
          <p>영수증</p>
          {bucket.map((item, idx) => (
            <div
              key={idx}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <p>{item.food.product_name}</p>
              <p>{item.quantity}개</p>
            </div>
          ))}
          <button
            onClick={() => {
              purchaseFood(bucket);
              setBuckets([]);
            }}
          >
            구매하기
          </button>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
          gap: "20px",
          justifyItems: "center",
        }}
      >
        {foods.map((item, idx) => (
          <FoodSellItem
            key={idx}
            food={item.food}
            quantity={item.quantity}
            addBucket={addBucket}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodSell;
