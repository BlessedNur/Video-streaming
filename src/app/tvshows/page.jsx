"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./page.module.css";
import { movieContext } from "@/context/Context";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Banner from "@/tvshowscomps/Banner/Banner";
import Upcoming from "@/tvshowscomps/Upcoming/Upcoming";
import Recommended from "@/tvshowscomps/Recommended/Recommended";
import Trending from "@/tvshowscomps/Trending/Trending";
import TopRated from "@/tvshowscomps/TopRated/Toprated";

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
        <Banner
          BannerApi={`http://localhost:3000/myapi/series`}
          bannerWidth={"100%"}
        />
        <div
          className={`${style.lists} ${lightMode ? style.lineDark : ""} ${
            style.lineThree
          } ${style.lineTwo} ${
            !showScrollDown ? style.lineTwoShow : style.lineTwoHide
          } ${lightMode && style.lineTwoLight} ${
            showScrollAllDown ? style.lineThreeShow : style.lineThreeHide
            }`}
          
        >
          <div className={`${style.movieList} scroller`} ref={movieListRef}>
            <div
              className={`${style.scrollDown} ${
                !showScrollAllDown && style.hiddenScroller
              }`}
            >
              <h3 style={{ color: lightMode && "#000" }}>Scroll Down</h3>
              <i className={`fas fa-chevron-down ${style.scrollBtn}`}></i>
            </div>

            <Upcoming
              title={"Latest TvShows"}
              length={15}
              containerWidth={"100%"}
              api={`http://localhost:3000/myapi/series`}
              
            />
            <Recommended
              title={"Recommended TvShows"}
              containerWidth={"100%"}
              length={10}
              seeAllTypes={"See All TvShows"}
              api={`http://localhost:3000/myapi/series`}
            />
            <Trending
              containerWidth={"100%"}
              api={`http://localhost:3000/myapi/series`}
              title={"Popular TvShows"}
              length={19}
            />
            <TopRated
              title={"Toprated TvShows"}
              length={8}
              containerWidth={"100%"}
              api={`http://localhost:3000/myapi/series`}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
