"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./page.module.css";
import { movieContext } from "@/context/Context";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Banner from "@/animecomps/Banner/Banner";
import Upcoming from "@/animecomps/Upcoming/Upcoming";
import Recommended from "@/animecomps/Recommended/Recommended";
import Trending from "@/animecomps/Trending/Trending";
import TopRated from "@/animecomps/TopRated/Toprated";

function HomePage() {
  const [lightMode, setLightMode] = useContext(movieContext);
  const movieListRef = useRef(null);
  const [showScrollDown, setShowScrollDown] = useState(true);
  const [showScrollAllDown, setShowScrollAllDown] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = movieListRef.current.scrollTop;
      setShowScrollDown(scrollPosition < 1);
      setShowScrollAllDown(scrollPosition < 300);
    };

    if (movieListRef.current) {
      movieListRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (movieListRef.current) {
        movieListRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <main className={`${style.main} `}>
      <Sidebar />
      <Navbar />
      <div
        className={`${style.contentsDisplay} ${lightMode ? "mainLight" : ""}`}
      >
        <div className={`${style.movieList} scroller`}>
          <div
            ref={movieListRef}
            className={`${style.lists} ${lightMode ? style.lineDark : ""} ${
              style.lineThree
            } ${style.lineTwo} ${
              !showScrollDown ? style.lineTwoShow : style.lineTwoHide
            } ${lightMode && style.lineTwoLight} ${
              showScrollAllDown ? style.lineThreeShow : style.lineThreeHide
            }`}
          >
            <Banner BannerApi={`/myapi/anime`} bannerWidth={"100%"} />
            <div
              className={`${style.scrollDown} ${
                !showScrollAllDown && style.hiddenScroller
              }`}
            >
              <h3 style={{ color: lightMode && "#000" }}>Scroll Down</h3>
              <i className={`fas fa-chevron-down ${style.scrollBtn}`}></i>
            </div>

            <Upcoming
              title={"Upcoming Anime"}
              length={8}
              containerWidth={"100%"}
              api={`/myapi/anime`}
            />
            <Recommended
              title={"Recommended Anime"}
              containerWidth={"100%"}
              length={10}
              seeAllTypes={"See All Anime"}
              api={`/myapi/anime`}
            />
            <Trending
              containerWidth={"100%"}
              api={`/myapi/anime`}
              title={"Popular Anime"}
              length={17}
            />
            <TopRated
              title={"Toprated Anime"}
              length={50}
              containerWidth={"100%"}
              api={`/myapi/anime`}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
