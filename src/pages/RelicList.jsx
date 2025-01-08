import { useState } from "react";
import axios from "axios";

export default function RelicList() {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [relics, setRelics] = useState([]); // 조회된 소장품 데이터
  const [isSearch, setIsSearch] = useState(false); // 검색 수행 여부

  const searchRelic = () => {
    setIsSearch(true); // 검색 수행 여부 업데이트
    const endpoint = `http://api.kcisa.kr/openapi/service/rest/meta/MPKreli?serviceKey=61e69856-19d1-4063-a67f-07785093b21a&numOfRows=30&pageNo=100`;
    axios
      .get(endpoint)
      .then((res) => {
        console.log(res.data);
        const items = res.data.response.body.items.item || []; // 유물 데이터 가져오기

        const filteredRelics = items.filter((item) =>
          item.title.includes(searchTerm)
        );
        setRelics(filteredRelics);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
        marginTop: isSearch ? "900px" : "0px", // 검색 중일 때 공백 추가
        transition: "margin 0.3s ease", 
        }}
      ></div>
      <h1>e뮤지엄 소장품 조회</h1>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="유물 이름을 검색하세요"
          style={{
            width: "300px",
            height: "40px",
            fontSize: "16px",
            padding: "5px 10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={searchRelic}
          style={{
            width: "100px",
            height: "50px",
            fontSize: "16px",
            marginLeft: "10px",
            backgroundColor: "#4169E1", //버튼 색상 파란색
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          검색
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center", // 컨테이너를 중앙 정렬
          marginTop: "20px",
        }}
      >
        <div
          style={{
            width: "80%", // 컨테이너 너비 줄이기
            maxWidth: "900px", // 화면이 커도 최대 너비 제한
            textAlign: "left", // 텍스트 왼쪽 정렬
          }}
        >
          {isSearch && relics.length === 0 && (
            <div>일치하는 유물이 존재하지 않습니다.</div>
          )}
          {!isSearch}
          {relics.length > 0 && (
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {relics.map((relic, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "20px",
                    padding: "15px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    backgroundColor: "#f9f9f9",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  <h3
                    style={{
                      margin: "0 0 10px 0",
                      textAlign: "center", // 제목 중앙 정렬
                    }}
                  >
                    {`${relic.title || "제목 없음"}`}
                  </h3>
                  <p>
                    <strong>크기:</strong> {relic.extent || "정보 없음"}
                  </p>
                  <p>
                    <strong>설명:</strong> {relic.description || "정보 없음"}
                  </p>
                  <p>
                    <strong>시대:</strong> {relic.temporal || "정보 없음"}
                  </p>
                  <p>
                    <strong>재질:</strong> {relic.medium || "정보 없음"}
                  </p>
                  <p>
                    <strong>추가 설명:</strong>{" "}
                    {relic.subDescription || "정보 없음"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
