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
import useMediaQuery from "@/components/UseMediaQuery";
import Navigation from "@/components/Navigation/Navigation";

function HomePage() {
  const [lightMode, setLightMode] = useContext(movieContext);
  const movieListRef = useRef(null);
  const [showScrollDown, setShowScrollDown] = useState(true);
  const [showScrollAllDown, setShowScrollAllDown] = useState(true);
  const mobile = useMediaQuery("(max-width:500px)");

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
            <Banner BannerApi={`/myapi/series`} bannerWidth={"100%"} />
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
              api={`/myapi/series`}
            />
            <Recommended
              title={"Recommended TvShows"}
              containerWidth={"100%"}
              length={10}
              seeAllTypes={"See All TvShows"}
              api={`/myapi/series`}
            />
            <Trending
              containerWidth={"100%"}
              api={`/myapi/series`}
              title={"Popular TvShows"}
              length={19}
            />
            <TopRated
              title={"Toprated TvShows"}
              length={8}
              containerWidth={"100%"}
              api={`/myapi/series`}
            />
          </div>
        </div>
      </div>
      {mobile && <Navigation />}
    </main>
  );
}

export default HomePage;
