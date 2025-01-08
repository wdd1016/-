import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./NewsList2.css";

export default function NewsList2() {
  const [title, setTitle] = useState("");
  const [news, setNews] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  const searchNews = () => {
    const endpoint = `https://newsapi.org/v2/everything?q=${title}&apiKey=c23a60d4725b4c778bf968e89740dab4`;
    axios
      .get(endpoint)
      .then((res) => {
        console.log(res);
        setNews(res.data.articles);
        setIsSearch(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h1>뉴스 조회</h1>
      <div className="search">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="뉴스 제목을 입력하세요"
        />
        <button onClick={searchNews}>조회</button>
      </div>
      {isSearch && news.length === 0 && (
        <div>일치하는 뉴스 정보가 존재하지 않습니다.</div>
      )}
      {!isSearch && <div>검색할 뉴스 제목을 입력하세요.</div>}
      {news.length !== 0 &&
        news.map((m, index) => (
          <div
            key={index}
            className="news"
            //onClick={() => navigate(`/newsDetail2`, { state: { url: m.url } })}
            style={{ cursor: "pointer" }}
          >
            <div className="newsimage">
              {m.urlToImage && <img src={m.urlToImage} alt={m.title} />}
            </div>
            <div className="text">
              <h1>{m.title}</h1>
              <p>{m.description}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
