"use client";
import Banner from "@/components/Banner/Banner";
import Navbar from "@/components/Navbar/Navbar";
import Recommended from "@/components/Recommended/Recommended";
import Sidebar from "@/components/Sidebar/Sidebar";
import TopRated from "@/components/TopRated/Toprated";
import Trending from "@/components/Trending/Trending";
import Upcoming from "@/components/Upcoming/Upcoming";
import { movieContext } from "@/context/Context";
import React, { useContext, useEffect, useState } from "react";
import style from "./page.module.css";
function Home() {
  const [lightMode, setLightMode] = useContext(movieContext);
  return (
    <main className={`${style.main} `}>
      <Sidebar />
      <Navbar />
      <div
        className={`${style.contentsDisplay} ${lightMode ? "mainLight" : ""}`}
      >
        <Banner
          BannerApi={`https://api.themoviedb.org/3/discover/movie?api_key=0febce395055c78ab86a029443008afc&page=1&certification_country=US&certification.lte=G&with_genres=16&include_adult=false`}
        />
        <div className={style.movieList}>
          <Upcoming title={"Upcoming Cartoons"} />
          <Recommended
            title={"Recommended Cartoons"}
            seeAllTypes={"See All Cartoons"}
            api={`https://api.themoviedb.org/3/discover/movie?api_key=0febce395055c78ab86a029443008afc&page=1&certification_country=US&certification.lte=G&with_genres=16&include_adult=false&primary_release_date.lte`}
          />
          <Trending title={"Popular Cartoons"} />
          <TopRated title={"Toprated Cartoons"} />
        </div>
      </div>
    </main>
  );
}

export default Home;

{
  /* <div className={style.items}>
    {movies.length === 0 ? (
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <Skeleton count={80} inline className={style.loader}  height={270} width={180} duration={3} />
      </SkeletonTheme>
    ) : (
      <div className={style.grid}>
        {movies.map((movie, index) => (
          <    Image


            key={index}
            src={`https://    Image

.tmdb.org/t/p/original/${movie.poster_path}`}
            width={200}
            height={270}
            objectFit="cover"
            className={style.    Image

}
          />
        ))}
      </div>
    )}
  </div> */
}
