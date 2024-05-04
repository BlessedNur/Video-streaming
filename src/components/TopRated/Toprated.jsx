import React, { useEffect, useState } from "react";
import style from "./TopRated.module.css";
import Image from "next/image";
function TopRated({ title, api }) {
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await fetch(`${api}`);
        const data = await response.json();

        setTopRatedMovies([...data.results.slice(0, 5)]);
      } catch (error) {
        console.error("Error fetching TopRated movies:", error);
      }
    };

    fetchTopRatedMovies();
  }, []);

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
          {topRatedMovies.map((movie) => (
            <div
              className={style.movieBox}
              key={movie.id}
              onClick={() => alert(`this is ${movie.title}`)}
            >
              <div className={style.thumbnail}>
                <Image
                  src={`https://Image.tmdb.org/t/p/original${movie.backdrop_path}`}
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
              <h1>{movie.title}</h1>
              <div className={style.rates}>
                <i class="fa fa-star" aria-hidden="true"></i>
                <p style={{ fontWeight: "600" }}>
                  {movie.vote_average != 0
                    ? (movie.vote_average / 2).toFixed(1)
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

export default TopRated;

("https://api.themoviedb.org/3/movie/top_rated?api_key=0febce395055c78ab86a029443008afc");
