"use client"
import React, { useContext, useEffect, useState } from "react";
import style from "./Banner.module.css";
import Image from "next/image";
import { movieContext } from "@/context/Context";

function Banner({ BannerApi }) {
  const [itemActive, setItemActive] = useState(0);
  const [movies, setMovies] = useState([]);
  const [lightMode, setLightMode] = useContext(movieContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BannerApi}`);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setItemActive((prevItemActive) => (prevItemActive + 1) % movies.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [movies]);

  // event next click
  const handleNext = () => {
    setItemActive((prevItemActive) => (prevItemActive + 1) % movies.length);
  };

  // event prev click
  const handlePrev = () => {
    setItemActive(
      (prevItemActive) => (prevItemActive - 1 + movies.length) % movies.length
    );
  };

  // Render function
  return (
    <div className={style.slider}>
      <div className={style.list}>
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className={`${style.item} ${
              index === itemActive ? style.active : ""
            } ${lightMode ? style.Light : style.Dark}`}
          >
            <img
              src={`https://Image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={`Movie ${index + 1}`}
            />
            <div className={style.content}>
              <h2 className={lightMode ? style.contentLight : ""}>
                {movie.title}
              </h2>
              <p className={lightMode ? style.contentLight : ""}>
                {movie.overview.slice(0, 100)}...
              </p>
              <div className={style.actions}>
                <button>Watch</button>
                <button className={lightMode ? style.contentLight : ""}>
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