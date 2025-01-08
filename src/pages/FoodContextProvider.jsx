import { useEffect, useState } from "react";
import FoodContext from "./FoodContext.jsx";
import axios from "axios";

const FoodContextProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);
  const [allFoods, setAllFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const endPoint = `https://world.openfoodfacts.org/api/v2/search?fields=code,product_name,brands,image_url`;
        const response = await axios.get(endPoint);
        setAllFoods(response.data.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFoods();
  }, []);

  const addFood = (food, quantity) => {
    if (foods.length === 0) {
      setFoods([{ food, quantity: Number(quantity) }]);
      return;
    }

    const existingFood = foods.find((item) => item.food.code === food.code);

    if (existingFood) {
      const newFoods = foods.map((item) =>
        item.food.code === food.code
          ? {
              food: item.food,
              quantity: Number(item.quantity) + Number(quantity),
            }
          : item
      );
      setFoods(newFoods);
    } else {
      setFoods([...foods, { food, quantity: Number(quantity) }]);
    }
  };

  const deleteFood = (food) => {
    const newFoods = foods.filter((f) => f.food.code !== food.code);
    setFoods(newFoods);
  };

  const purchaseFood = (purchasedItems) => {
    const updatedFoods = foods.map((item) => {
      const targetQuantity = purchasedItems.find(
        (p) => p.food.code === item.food.code
      );

      return targetQuantity
        ? {
            ...item,
            quantity: Number(item.quantity) - Number(targetQuantity.quantity),
          }
        : item;
    });
    setFoods(updatedFoods);
  };

  return (
    <FoodContext.Provider
      value={{
        foods,
        addFood,
        setAllFoods,
        allFoods,
        deleteFood,
        purchaseFood,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export default FoodContextProvider;
