import { useContext, useState } from "react";
import FoodContext from "./FoodContext";
import { useRef } from "react";


const FoodSellItem = ({ food, quantity, addBucket }) => {
  const [purchase, setPurchase] = useState(0);
  const purchaseQuantity = useRef(0);


  return (
    <div style={{ border: "1px solid red", padding: 10, margin: 4 }}>
      <img src={`${food.image_url}`} alt="image" />
      <p>{food.product_name}</p>
      <p>구매 가능 수량 : {quantity - purchaseQuantity.current}</p>
      <div>
        <input
          type="number"
          value={purchase || ""}
          onChange={(e) => setPurchase(e.target.value)}
        />
        <button
          onClick={() => {
            addBucket(food, purchase);
            purchaseQuantity.current += Number(purchase);
            setPurchase(0);
          }}
        >
          담기
        </button>
      </div>
    </div>
  );
};


const FoodSell = () => {
  const { foods } = useContext(FoodContext);
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
    setBuckets(newBucket);
  };


  console.log(bucket);


  return (
    <div>
      <div>
        <h1>재고 목록</h1>
        <div style={{ display: "flex", flexDirection: "row" }}>
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
    </div>
  );
};


export default FoodSell;
