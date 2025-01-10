import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // 필요하면 스타일링 파일 추가

function Home() {
  const services = [
    {
      title: "노래방 번호·가사 검색",
      description: "Search karaoke songs and lyrics.",
      linkPath: "/search",
    },
    {
      title: "e뮤지엄 소장품 조회",
      description: "Browse relics and artifacts.",
      linkPath: "/reliclist",
    },
    {
      title: "Book List",
      description: "View and manage your book collection.",
      linkPath: "/books",
    },
    {
      title: "레시피 조회",
      description: "Find recipes and cooking tips.",
      linkPath: "/recipeList",
    },
    {
      title: "Food Management",
      description: "Manage and search for food products.",
      linkPath: "/foodManage",
    },
    {
      title: "장소 검색",
      description: "Get detailed search information.",
      linkPath: "/searchInfo",
    },
    {
      title: "뉴스 조회",
      description: "Read the latest news articles.",
      linkPath: "/newsList2",
    },
    {
      title: "음악 조회",
      description: "Create and manage your music playlist.",
      linkPath: "/mymusiclist",
    },
    {
      title: "강아지 조회",
      description: "Find dog breeds and picture.",
      linkPath: "/dogsearch",
    },
  ];

  return (
    <div className="home-container">
      <h2>Welcome to My Services</h2>
      <br />
      <br />
      <br />
      <div className="card-container">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <Link to={service.linkPath} className="card-link">
              Explore
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
