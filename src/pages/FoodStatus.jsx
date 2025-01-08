import { useContext } from "react";
import FoodContext from "./FoodContext";


const FoodStatus = () => {
  const { foods, deleteFood } = useContext(FoodContext);


  console.log(foods);


  return (
    <div>
      {foods.map((food) => (
        <div key={food.food.code}>
          <img src={`${food.food.image_url}`} alt="image" />
          <p>브랜드 : {food.food.brands}</p>
          <p>상품명 : {food.food.product_name}</p>
          <p>수량 : {food.quantity}</p>
          <button onClick={() => deleteFood(food.food)}>삭제</button>
        </div>
      ))}
    </div>
  );
};


export default FoodStatus;
