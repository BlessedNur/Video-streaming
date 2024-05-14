"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./page.module.css";
import { movieContext } from "@/context/Context";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import Banner from "@/components/Banner/Banner";
import Upcoming from "@/components/Upcoming/Upcoming";
import Recommended from "@/components/Recommended/Recommended";
import Trending from "@/components/Trending/Trending";
import TopRated from "@/components/TopRated/Toprated";

function HomePage() {
  const [lightMode, setLightMode] = useContext(movieContext);
  const movieListRef = useRef(null);
  const [showScrollDown, setShowScrollDown] = useState(true);
  const [showScrollAllDown, setShowScrollAllDown] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = movieListRef.current.scrollTop;
      setShowScrollDown(scrollPosition < 1);
      setShowScrollAllDown(scrollPosition < 50);
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
        <Banner bannerWidth={"100%"} BannerApi={`/myapi/movie`} />
        <div
          className={`${style.lists} ${lightMode ? style.lineDark : ""} ${
            style.lineThree
          } ${style.lineTwo} ${
            !showScrollDown ? style.lineTwoShow : style.lineTwoHide
          } ${lightMode && style.lineTwoLight} ${
            showScrollAllDown ? style.lineThreeShow : style.lineThreeHide
          }`}
        >
          <div
            className={`${style.movieList} scroller ${
              lightMode ? style.movieListLight : style.movieListDark
            }`}
            ref={movieListRef}
          >
            <div
              className={`${style.scrollDown} ${
                !showScrollAllDown && style.hiddenScroller
              }`}
            >
              <h3 style={{ color: lightMode && "#000" }}>Scroll Down</h3>
              <i className={`fas fa-chevron-down ${style.scrollBtn}`}></i>
            </div>

            <Upcoming
              title={"Latest Movies & Tv Shows"}
              length={15}
              api={`/myapi/movie`}
            />
            <Recommended
              title={"Recommended Movies & Tv Shows"}
              length={15}
              seeAllTypes={"See All Movies & Tv Shows"}
              api={`/myapi/movie`}
            />
            <Trending
              title={"Trending Movies & Tv Shows"}
              length={15}
              api={`/myapi/movie`}
            />
            <TopRated
              title={"Popular Movies & Tv Shows"}
              length={5}
              api={`/myapi/movie`}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
