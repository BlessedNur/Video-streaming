"use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./Trending.module.css";
import Image from "next/image";
import { movieContext } from "@/context/Context";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";
import useMediaQuery from "@/components/UseMediaQuery";

function Trending({ title, api, length }) {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const navigate = useRouter();
  const mobile = useMediaQuery("(max-width:500px)");
  ("(max-width:600px)");
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
    toggleLightMode,
    showProfile,
    setShowProfile,
    filteredType,
    setFilteredType,
    cat,
    setCat,
    genre,
    setGenre,
    searchValue,
    setSearchValue,
    selectedMovie,
    setSelectedMovie,
  ] = useContext(movieContext);
  useEffect(() => {
    const fetchtrendingMovies = async () => {
      try {
        const response = await fetch(`${api}`);
        const data = await response.json();
        setTrendingMovies(data.slice(10, length));
      } catch (error) {
        console.error("Error fetching Trending movies:", error);
      }
    };

    fetchtrendingMovies();
  }, []);

  return (
    <div className={style.line}>
      {trendingMovies.length === 0 ? (
        <SkeletonTheme
          baseColor={lightMode ? "#eee" : "#202020"}
          highlightColor={lightMode ? "#b2b5bd" : "#444"}
        >
          <div className={style.header}>
            <h2>
              <Skeleton width={200} height={20} borderRadius={5} />
            </h2>
            <div style={{ zIndex: "3" }} className={style.seeAll}>
              <p>
                <Skeleton width={100} height={20} borderRadius={5} />
              </p>
            </div>
          </div>
          <div className={style.movies}>
            {mobile ? (
              <>
                <Skeleton width={185} height={100} borderRadius={10} />
                <Skeleton width={185} height={100} borderRadius={10} />
              </>
            ) : (
              <>
                <Skeleton width={199} height={100} borderRadius={7} />
                <Skeleton width={199} height={100} borderRadius={7} />
                <Skeleton width={199} height={100} borderRadius={7} />
                <Skeleton width={199} height={100} borderRadius={7} />
                <Skeleton width={199} height={100} borderRadius={7} />
                <Skeleton width={199} height={100} borderRadius={7} />
              </>
            )}
          </div>
        </SkeletonTheme>
      ) : (
        <>
          <div className={style.header}>
            <h2>{title}</h2>
            <div
              className={style.seeAll}
              onClick={() => {
                setFilteredType("Trending");
                setCat(1);
                navigate.push("/search");
              }}
            >
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
              {trendingMovies.map((movie) => (
                <div
                  className={style.movieBox}
                  key={movie.id}
                  onClick={() => {
                    navigate.push("/details");
                    setSelectedMovie(movie);
                  }}
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
                    <h2 className={style.movieBan}>
                      {movie.number_of_seasons > 1
                        ? `${movie.number_of_seasons} seasons`
                        : `${movie.number_of_seasons} season`}
                    </h2>
                  </div>
                  <h1>{movie.title}</h1>
                  <div className={style.rates}>
                    <i class="fa fa-star" aria-hidden="true"></i>
                    <p
                      style={{ fontWeight: "600", color: lightMode && "#fff" }}
                    >
                      {movie.vote_average != 0
                        ? ((movie.vote_average / 100) * 5).toFixed(1)
                        : "Not rated"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Trending;
