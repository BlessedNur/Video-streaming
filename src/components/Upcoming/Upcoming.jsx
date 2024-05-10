"use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./Upcoming.module.css";
import Image from "next/image";
import { movieContext } from "@/context/Context";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Upcoming({ title, api, length }) {
  // const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
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

        const filterMovies = data.slice(0,70).filter((movie) => {
          const releaseYear = movie.release_date.split("-")[0]
          console.log(releaseYear);
          return releaseYear == 2022 ||releaseYear == 2023 || releaseYear == 2024;
        });
        setFilteredMovies(filterMovies);

        // setUpcomingMovies(data);
      } catch (error) {
        console.error("Error fetching Upcoming movies:", error);
      }
    };

    fetchUpcomingMovies();
  }, []);
  // console.log(upcomingMovies.map(movie=>movie.release_date.split("-")[0]));
  console.log(filteredMovies);

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
          {filteredMovies.map((movie) => (
            <div
              className={style.movieBox}
              key={movie.id}
              onClick={() => alert(`this is ${movie.title}`)}
            >
              <div className={style.thumbnail}>
                <Image
                  src={movie.backdrop_path}
                  alt={`Poster for ${movie.title}`}
                  width={200}
                  height={100}
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
              <h1>
                {movie.title.length > 20
                  ? `${movie.title.slice(0, 20)}...`
                  : movie.title}
              </h1>
              <div className={style.rates}>
                <i class="fa fa-star" aria-hidden="true"></i>
                <p style={{ fontWeight: "600", color: lightMode && "#fff" }}>
                  {movie.vote_average != 0
                    ? ((movie.vote_average / 100) * 5).toFixed(1)
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
