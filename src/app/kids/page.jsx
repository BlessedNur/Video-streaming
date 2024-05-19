"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./page.module.css";
import { movieContext } from "@/context/Context";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar/Navbar";
import Banner from "@/components/Banner/Banner";
import Upcoming from "@/components/Upcoming/Upcoming";
import Recommended from "@/components/Recommended/Recommended";
import Trending from "@/components/Trending/Trending";
import TopRated from "@/components/TopRated/Toprated";
import Sidebar from "@/components/Sidebar/Sidebar";
import useMediaQuery from "@/components/UseMediaQuery";

function HomePage() {
  const [lightMode, setLightMode] = useContext(movieContext);
  const movieListRef = useRef(null);
  const [showScrollDown, setShowScrollDown] = useState(true);
  const [showScrollAllDown, setShowScrollAllDown] = useState(true);
  const mobile = useMediaQuery("(max-width: 768px)");


  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = movieListRef.current.scrollTop;
      setShowScrollDown(scrollPosition < 1);
      setShowScrollAllDown(scrollPosition < 300);
      console.log(scrollPosition);
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
            <Banner BannerApi={`/myapi/cartoon`} bannerWidth={"100%"} />
            <div
              className={`${style.scrollDown} ${
                !showScrollAllDown && style.hiddenScroller
              }`}
            >
              <h3 style={{ color: lightMode && "#000" }}>Scroll Down</h3>
              <i className={`fas fa-chevron-down ${style.scrollBtn}`}></i>
            </div>

            <Upcoming
              title={"Latest Cartoons"}
              length={15}
              containerWidth={"100%"}
              api={`/myapi/cartoon`}
            />
            <Recommended
              title={"Recommended Cartoons"}
              containerWidth={"100%"}
              length={10}
              seeAllTypes={"See All Cartoons"}
              api={`/myapi/cartoon`}
            />
            <Trending
              containerWidth={"100%"}
              api={`/myapi/cartoon`}
              title={"Popular Cartoons"}
              length={19}
            />
            <TopRated
              title={"Toprated Cartoons"}
              length={8}
              containerWidth={"100%"}
              api={`/myapi/cartoon`}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
