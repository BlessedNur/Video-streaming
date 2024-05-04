import React, { useEffect, useState } from "react";
import style from "./Recommended.module.css";
import Image from "next/image";

function Recommended({ title, seeAllTypes, api }) {
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      try {
        const response = await fetch(`${api}`);
        const data = await response.json();

        setRecommendedMovies([...data.results.slice(0, 7)]);
      } catch (error) {
        console.error("Error fetching Recommended movies:", error);
      }
    };

    fetchRecommendedMovies();
  }, []);

  return (
    <div className={style.line}>
      <div className={style.header}>
        <h2>{title}</h2>
        <div className={style.seeAll}>
          <p>{seeAllTypes}</p>
          <i
            className="fa fa-chevron-right"
            style={{ fontSize: "10px" }}
            aria-hidden="true"
          ></i>
        </div>
      </div>
      <div className={style.movieList}>
        <div className={style.movies}>
          {recommendedMovies.map((movie) => (
            <div
              className={style.movieBox}
              key={movie.id}
              onClick={() => alert(`This is ${movie.title}`)}
            >
              <div className={style.thumbnail}>
                <Image
                  src={`https://Image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={`Poster for ${movie.title}`}
                  width={110}
                  height={150}
                  className={style.movieImage}
                />
                <div className={style.playing}>
                  <div className={style.video}>
                    <i
                      className={`fa fa-play ${style.player}`}
                      aria-hidden="true"
                    ></i>
                    <div className={style.round}></div>
                  </div>
                  <div className={`${style.waves} ${style.waveOne}`}></div>
                  <div className={`${style.waves} ${style.waveTwo}`}></div>
                  <div className={`${style.waves} ${style.waveThree}`}></div>
                </div>
              </div>
              <div className={style.rates}>
                <i className="fa fa-star" aria-hidden="true"></i>
                <p style={{ fontWeight: "600" }}>
                  {movie.vote_average !== 0
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

export default Recommended;
