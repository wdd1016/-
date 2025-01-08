import { useState } from "react";
import axios from "axios";
import "./RecipeList.css";
import { Link } from "react-router-dom";

export default function RecipeList() {
  const [title, setTitle] = useState("");
  const [recipe, setRecipe] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const searchRecipe = () => {
    setIsSearch(true);

    const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${title}`;
    axios
      .get(endpoint)
      .then((res) => {
        console.log(res);
        setRecipe(res.data.meals);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h1>레시피 조회</h1>
      <div className="search">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={searchRecipe}>조회</button>
      </div>
      {isSearch && recipe.length === 0 && (
        <div>일치하는 음식이 존재하지 않습니다.</div>
      )}
      {!isSearch && <div>검색할 레시피의 음식이름을 입력하세요.</div>}
      {recipe.length !== 0 &&
        recipe.map((r) => (
          <div className="movie">
            <h1>{r.strMeal}</h1>
            <div className="poster">
              <img src={r.strMealThumb} />
            </div>
            <div className="text">
              <h1>
                <Link to={`/recipeDetail/${r.idMeal}`}>
                  이름: {r.strMeal}, 대표지역: {r.strArea}
                </Link>
              </h1>
              <p>
                레시피 미리보기 - {r.strInstructions.split("\r\n").slice(0, 2)}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}
