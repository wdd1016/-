import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import YouTube from "react-youtube";

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    autoplay: 0,
  },
};

export default function RecipeDetail() {
  const params = useParams();
  const recipeid = params.recipeid;

  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // List에서 받아온 id를 넣어줌
    const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeid}`;
    axios
      .get(endpoint)
      .then((res) => {
        setRecipe(res.data.meals[0]);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [recipeid]);

  if (isLoading) {
    return <h1>데이터를 가져오고 있습니다.</h1>;
  }

  if (!recipe) {
    return <h1>레시피를 찾을 수 없습니다.</h1>;
  }

  // strYoutube에서 videoId(유튜브 링크) 추출
  // v= 뒤로는 영상별 id값이다.
  const videoId = recipe.strYoutube ? recipe.strYoutube.split("v=")[1] : null;

  const ingredients = Object.keys(recipe) // 레시피 필터링해서 "" 값 제외하고 배열저장
    .filter((key) => key.startsWith("strIngredient") && recipe[key] !== "") // 빈 값 제외
    .map((key) => recipe[key]);

  // strInstructions을 구간별로 나누기 (줄바꿈 기준으로 분리)
  const instructions = recipe.strInstructions.split("\r\n");

  return (
    <div>
      <h1>{recipe.strMeal}</h1>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        style={{ width: "300px" }}
      />
      <p>
        <strong>카테고리:</strong> {recipe.strCategory}
      </p>
      <p>
        <strong>지역:</strong> {recipe.strArea}
      </p>

      <h2>재료</h2>
      <div>
        {/* 재료 출력 */}
        {ingredients.map((ingredient, index) => (
          <p key={index}>● {ingredient}</p>
        ))}
      </div>

      <h2>조리 방법</h2>
      <div>
        {/* 레시피 요소의 각 구간을 나누어 보여줌 */}
        {instructions.map((step, index) => (
          <p key={index}>●{step}</p>
        ))}
      </div>

      {/* 유튜브 영상 링크가 있으면 영상 출력 */}
      {videoId ? (
        <div>
          <h2>레시피 영상</h2>
          <YouTube videoId={videoId} opts={opts} />
        </div>
      ) : (
        <p>관련 영상이 없습니다.</p>
      )}
    </div>
  );
}
