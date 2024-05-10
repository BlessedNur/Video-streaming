"use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./Upcoming.module.css";
import Image from "next/image";
import { movieContext } from "@/context/Context";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Upcoming({ title, api, length }) {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [
    lightMode,
    setLightMode,
    activeNavLink,
    setActiveNavLink,
    activeSideLink,
    setActiveSideLink,
    storedNavLink,
    setStoredNavLink,
    storedSideLink,
    setStoredSideLink,
    handleNavClick,
    handleSideClick,
  ] = useContext(movieContext);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const response = await fetch(`${api}`);
        const data = await response.json();
        setUpcomingMovies(data.slice(0, length) );
      } catch (error) {
        console.error("Error fetching Upcoming movies:", error);
      }
    };

    fetchUpcomingMovies();
  }, []);
  console.log(upcomingMovies);


  return (
    <div className={style.line}>
      <div className={style.header}>
        <h2>{title}</h2>
        <div className={style.seeAll}>
          <p>See All</p>
          <i
            class="fa fa-chevron-right"
            style={{ fontSize: "10px" }}
            aria-hidden="true"
          ></i>
        </div>
      </div>
      <div className={style.movieList}>
        <div className={style.movies}>
          {upcomingMovies.map((movie) => (
            <div
              className={style.movieBox}
              key={movie.id}
              onClick={() => alert(`this is ${movie.title}`)}
            >
              <div className={style.thumbnail}>
                <img
                  src={movie.images.jpg.large_image_url}
                  alt={`Poster for ${movie.title}`}
                  className={style.movieImage}
                />
                <div class={style.playing}>
                  <div className={style.video}>
                    <i
                      className={`fa fa-play ${style.player}`}
                      aria-hidden="true"
                    ></i>
                    <div className={style.round}></div>
                  </div>
                  <div class={`${style.waves} ${style.waveOne}`}></div>
                  <div class={`${style.waves} ${style.waveTwo}`}></div>
                  <div class={`${style.waves} ${style.waveThree}`}></div>
                </div>
              </div>
              <h1>{movie.title.length>20?`${movie.title.slice(0,20)}...`:movie.title}</h1>
              <div className={style.rates}>
                <i class="fa fa-star" aria-hidden="true"></i>
                <p style={{ fontWeight: "600", color: lightMode && "#fff" }}>
                  {movie.score != 0
                    ? (movie.score/2).toFixed(1)
                    : "Not rated"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Upcoming;
