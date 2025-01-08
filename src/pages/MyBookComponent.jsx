import React, { useState, useEffect } from "react";
import axios from "axios";

const MyBookComponent = () => {
  const [books, setBooks] = useState([]); // 책 데이터를 저장할 공간
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 메시지 관리
  const [searchQuery, setSearchQuery] = useState("bestsellers"); // 검색어 상태

  const fetchBooks = (query) => {
    setLoading(true);
    setError(null);

    axios
      .get(`https://openlibrary.org/search.json?q=${query}`)
      .then((response) => {
        const topBooks = response.data.docs.slice(0, 9); // 상위 9권 가져오기
        setBooks(topBooks); // books 상태 업데이트
        setLoading(false); // 로딩 상태 종료
      })
      .catch((err) => {
        setError("데이터를 가져오는 중 문제가 발생했습니다."); // 에러 상태 업데이트
        setLoading(false); // 로딩 상태 종료
      });
  };

  // 컴포넌트 처음 렌더링 시 기본 데이터 가져오기
  useEffect(() => {
    fetchBooks(searchQuery);
  }, []);

  // 검색 버튼 클릭 시 동작
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      alert("검색어를 입력해주세요.");
      return;
    }
    fetchBooks(searchQuery); // 새로운 검색어로 API 호출
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 style={styles.title}>베스트셀러 추천</h1>

      {/* 검색 입력 및 버튼 */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="책 제목 또는 저자 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
        <button onClick={handleSearch} style={styles.searchButton}>
          검색
        </button>
      </div>

      {/* 그리드 컨테이너 */}
      <div style={styles.gridContainer}>
        {books.map((book, index) => (
          <div key={index} style={styles.bookItem}>
            {/* 책 표지 이미지 */}
            {book.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={`${book.title} 표지`}
                style={styles.bookImage}
              />
            ) : (
              <div style={styles.noImage}>표지 없음</div>
            )}
            {/* 책 정보 */}
            <h3 style={styles.bookTitle}>{book.title}</h3>
            <p>
              저자:{" "}
              {book.author_name ? book.author_name.join(", ") : "알 수 없음"}
            </p>
            <p>첫 출판 연도: {book.first_publish_year || "알 수 없음"}</p>
            <p>
              책 상세 정보:{" "}
              <a
                href={`https://openlibrary.org${book.key}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                자세히 보기
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  searchInput: {
    padding: "10px",
    width: "300px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    marginRight: "10px",
  },
  searchButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    padding: "20px",
  },
  bookItem: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  bookImage: {
    width: "100px",
    height: "150px",
    objectFit: "cover",
    marginBottom: "10px",
  },
  noImage: {
    width: "100px",
    height: "150px",
    backgroundColor: "#ccc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10px",
    fontSize: "12px",
    color: "#555",
  },
  bookTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
};

export default MyBookComponent;
