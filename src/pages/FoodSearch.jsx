import { useContext, useEffect, useRef, useState } from "react";
import FoodCard from "./FoodCard";
import FoodContext from "./FoodContext";

const FoodSearch = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { allFoods } = useContext(FoodContext);

  useEffect(() => {
    allFoods.length !== 0 && setIsLoading(false);
  }, []);

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        gap: "30px",
      }}
    >
      <div
        style={{
          width: "80%",
          maxWidth: "800px",
          display: "flex",
          gap: "10px",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <input
          type="text"
          value={input}
          placeholder="상품명을 입력해주세요"
          onChange={handleSearch}
          style={{
            flex: 1,
            padding: "12px 16px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "16px",
            outline: "none",
          }}
        />
        <button
          style={{
            padding: "12px 24px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#4A90E2",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          검색
        </button>
      </div>
      <div
        style={{
          width: "80%",
          maxWidth: "1200px",
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

      {!isLoading && filteredFoods.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: "#666",
            fontSize: "18px",
          }}
        >
          검색 결과가 없습니다.
        </div>
      )}
      {isLoading && <div>데이터를 가져오는 중입니다.</div>}
    </div>
  );
};

export default FoodSearch;
