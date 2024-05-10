"use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./Banner.module.css";
import Image from "next/image";
import { movieContext } from "@/context/Context";

function Banner({ BannerApi, bannerWidth }) {
  const [itemActive, setItemActive] = useState(0);
  const [movies, setMovies] = useState([]);
  const [lightMode, setLightMode] = useContext(movieContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BannerApi}`);
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(movies);
  let interval;
  useEffect(() => {
    interval = setInterval(() => {
      setItemActive((prevItemActive) => (prevItemActive + 1) % movies.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [movies]);

  const handleNext = () => {
    setItemActive((prevItemActive) => (prevItemActive + 1) % movies.length);
  };

  const handlePrev = () => {
    setItemActive(
      (prevItemActive) => (prevItemActive - 1 + movies.length) % movies.length
    );
  };

  return (
    <div
      className={style.slider}
      style={{
        maxWidth: bannerWidth,
      }}
    >
      <div className={style.list}>
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className={`${style.item} ${
              index === itemActive ? style.active : ""
            } ${lightMode ? style.Light : style.Dark}`}
          >
            <img
              src={`${movie.images.jpg.large_image_url}`}
              alt={`Movie ${index + 1}`}
            />
            <div className={style.content}>
              <h2 className={lightMode ? style.contentLight : ""}>
                {movie.title.length > 20
                  ? `${movie.title.slice(0, 20)}...`
                  : movie.title}{" "}
              </h2>
              <p className={lightMode ? style.contentLight : ""}>
                {movie.synopsis.slice(0, 100)}...
              </p>
              <div className={style.actions}>
                <button>Watch</button>
                {/* <button className={style.prev} onClick={handlePrev}> prev</button>
                <button className={style.next} onClick={handleNext}>next</button> */}
                <button
                  onClick={() => alert(`Added ${movie.title} to watchlist`)}
                  className={lightMode ? style.contentLight : ""}
                >
                  <i class="fa fa-plus" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Banner;
