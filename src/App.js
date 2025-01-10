import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";

import KaraokeSearch from "./pages/KaraokeSearch.jsx";
import RelicList from "./pages/RelicList.jsx";
import MyBookComponent from "./pages/MyBookComponent.jsx";
import RecipeList from "./pages/RecipeList.jsx";
import RecipeDetail from "./pages/RecipeDetail.jsx";
import FoodLayout from "./pages/FoodLayout.jsx";
import FoodSearch from "./pages/FoodSearch.jsx";
import FoodSell from "./pages/FoodSell.jsx";
import FoodStatus from "./pages/FoodStatus.jsx";
import SearchInfo from "./pages/SearchInfo.jsx";
import NewsList2 from "./pages/NewsList2.jsx";
import MyMusicList from "./pages/MyMusicList.jsx";
import SearchMusic from "./pages/SearchMusic.jsx";
import MusicDetail from "./pages/MusicDetail.jsx";

import "./App.css";
import FoodContextProvider from "./pages/FoodContextProvider.jsx";
import DogSearch from "./pages/DogSearch.jsx";

function App() {
  return (
    <>
      <Header />
      <div className="main-container">
        <FoodContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<KaraokeSearch />} />
            <Route path="/reliclist" element={<RelicList />} />
            <Route path="/books" element={<MyBookComponent />} />
            <Route path="/recipeList" element={<RecipeList />} />
            <Route path="/recipeDetail" element={<RecipeDetail />}>
              <Route path=":recipeid" element={<RecipeDetail />} />
            </Route>
            <Route path="/foodManage" element={<FoodLayout />}>
              <Route path="search" element={<FoodSearch />} />
              <Route path="sell" element={<FoodSell />} />
              <Route path="status" element={<FoodStatus />} />
            </Route>
            <Route path="/searchInfo" element={<SearchInfo />} />
            <Route path="/newsList2" element={<NewsList2 />} />
            <Route path="/mymusiclist" element={<MyMusicList />} />
            <Route
              path="/musicdetail/:artist/:title"
              element={<MusicDetail />}
            />
            <Route path="/dogsearch" element={<DogSearch />} />
          </Routes>
        </FoodContextProvider>
      </div>
    </>
  );
}

export default App;
