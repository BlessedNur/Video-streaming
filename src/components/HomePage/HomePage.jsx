"use client";
import React, { useContext } from "react";
import style from "./Homepage.module.css";
import { movieContext } from "@/context/Context";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import Banner from "../Banner/Banner";
import Recommended from "../Recommended/Recommended";
import Trending from "../Trending/Trending";
import TopRated from "../TopRated/Toprated";
import Upcoming from "../Upcoming/Upcoming";

function HomePage() {
  const [lightMode, setLightMode] = useContext(movieContext);
  return (
    <main className={`${style.main} `}>
      <Sidebar />
      <Navbar />
      <div
        className={`${style.contentsDisplay} ${lightMode ? "mainLight" : ""}`}
      >
        <Banner
          BannerApi={`https://api.themoviedb.org/3/discover/movie?api_key=0febce395055c78ab86a029443008afc&page=1`}
        />
        <div className={style.movieList}>
          <Upcoming
            title={"Upcoming Movies & Tv Shows"}
            api={`https://api.themoviedb.org/3/movie/upcoming?api_key=0febce395055c78ab86a029443008afc&page=1`}
          />
          <Recommended
            title={"Recommended Movies & Tv Shows"}
            seeAllTypes={"See All Movies & Tv Shows"}
            api={`https://api.themoviedb.org/3/movie/popular?api_key=0febce395055c78ab86a029443008afc&page=1`}
            
          />
          <Trending
            title={"Trending Movies & Tv Shows"}
            api={`https://api.themoviedb.org/3/discover/movie?api_key=0febce395055c78ab86a029443008afc&page=1`}
          />
          <TopRated
            title={"Popular Movies & Tv Shows"}
            api={`https://api.themoviedb.org/3/movie/top_rated?api_key=0febce395055c78ab86a029443008afc`}
          />
        </div>
      </div>
    </main>
  );
}

export default HomePage;
