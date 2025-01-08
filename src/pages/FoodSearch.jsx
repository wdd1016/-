import { useContext, useState } from "react";
import FoodCard from "./FoodCard";
import FoodContext from "./FoodContext";


const FoodSearch = () => {
  const [input, setInput] = useState("");
  const { allFoods } = useContext(FoodContext);


  const filteredFoods = input
    ? allFoods.filter((food) => {
        const productName = (food.product_name || "").toLowerCase();
        const brandName = (food.brands || "").toLowerCase();
        return (
          productName.includes(input.toLowerCase()) ||
          brandName.includes(input.toLowerCase())
        );
      })
    : allFoods;


  const handleSearch = (e) => {
    setInput(e.target.value);
  };


  return (
    <div>
      <div style={{ margin: "20px 0" }}>
        <input
          type="text"
          value={input}
          placeholder="상품명을 입력해주세요"
          onChange={handleSearch}
          style={{
            padding: "8px",
            width: "200px",
            marginRight: "10px",
          }}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {filteredFoods.map((food) => (
          <FoodCard key={food.code} food={food} />
        ))}
      </div>


      {filteredFoods.length === 0 && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
};


export default FoodSearch;
