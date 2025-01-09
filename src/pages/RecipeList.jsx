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
        setRecipe(res.data.meals || []);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h1>Find-Your-ReCipe</h1>
      <div className="search">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="영어로 원하는 레시피를 찾아보세요!"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              searchRecipe();
            }
          }}
        />
        <button onClick={searchRecipe}>검색</button>
      </div>
      {isSearch && recipe.length === 0 && (
        <div className="text">일치하는 음식이 존재하지 않습니다.</div>
      )}
      {!isSearch && <div className="text"></div>}
      {recipe.length !== 0 &&
        recipe.map((r) => (
          <div className="recipe">
            <div className="poster">
              <Link to={`/recipeDetail/${r.idMeal}`}>
                <img src={r.strMealThumb} />
              </Link>
              <h2>{r.strMeal}</h2>
            </div>
            <div className="text">
              <h1>
                <Link to={`/recipeDetail/${r.idMeal}`}>
                  지역: {r.strArea}
                  <br />
                  카테고리: {r.strCategory}{" "}
                </Link>
              </h1>
              <p className="infos">
                [레시피 미리보기] <br />{" "}
                {r.strInstructions.split("\r\n").slice(0, 1)}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}
