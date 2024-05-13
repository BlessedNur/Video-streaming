"use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./SideContent.module.css";
import { movieContext } from "@/context/Context";
import Image from "next/image";
import Link from "next/link";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function SideContent() {
  const [movies, setMovies] = useState([]);
  const [moviesTrailers, setMoviesTrailers] = useState([]);
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
  ] = useContext(movieContext);
  useEffect(() => {
    const categories = document.querySelector(".cats");
    categories.addEventListener("scroll", () => {
      // console.log(categories.scrollLeft);
      if (categories.scrollLeft > 10) {
        categories.classList.add("leftC");
      } else {
        categories.classList.remove("leftC");
      }
      if (categories.scrollLeft > 286) {
        categories.classList.remove("rightC");
      } else {
        categories.classList.add("rightC");
      }
    });
  }, []);
  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const response = await fetch(`http://localhost:3000/myapi/series`);
        const data = await response.json();

        const filterMovies = data.filter((movie) => {
          const releaseYear = movie.first_air_date.split("-")[0];
          console.log(releaseYear);
          return releaseYear == 2024;
        });
        setMovies(filterMovies.slice(1, 3));

        // setUpcomingMovies(data);
      } catch (error) {
        console.error("Error fetching Upcoming movies:", error);
      }
    };

    fetchUpcomingMovies();
  }, []);
  useEffect(() => {
    const fetchTrailersMovies = async () => {
      try {
        const response = await fetch(`http://localhost:3000/myapi/movie`);
        const data = await response.json();

        const filterMovies = data.slice(1, 10).filter((movie) => {
          const releaseYear = movie.release_date.split("-")[0];
          console.log(releaseYear);
          return releaseYear == 2024;
        });
        setMoviesTrailers(filterMovies);

        // setUpcomingMovies(data);
      } catch (error) {
        console.error("Error fetching Upcoming movies:", error);
      }
    };

    fetchTrailersMovies();
  }, []);
  console.log(moviesTrailers);
  // console.log(moviesTrailers[0].trailers);
  return (
    <div className={style.sider}>
      <div className={style.categories}>
        <div
          className={`${style.category} ${
            lightMode && style.categoryL
          } cats rightC`}
        >
          {movies.length === 0 ? (
            <SkeletonTheme
              baseColor={lightMode ? "#eee" : "#202020"}
              highlightColor={lightMode ? "#b2b5bd" : "#444"}
            >
              <Skeleton height={20} width={70} />
              <Skeleton height={20} width={70} />
              <Skeleton height={20} width={70} />
              <Skeleton height={20} width={70} />
              <Skeleton height={20} width={70} />
            </SkeletonTheme>
          ) : (
            <>
              <h6>Action</h6>
              <h6>Horror</h6>
              <h6>Drama</h6>
              <h6>Comedy</h6>
              <h6>Romance</h6>
              <h6>Mystery</h6>
              <h6>Fantasy</h6>
              <h6>Adventure</h6>
              <h6>Musical</h6>
              <h6>Thriller</h6>
            </>
          )}
        </div>
      </div>
      <div className={style.suggestions}>
        <div className="intro">
          {movies.length === 0 ? (
            <SkeletonTheme
              baseColor={lightMode ? "#eee" : "#202020"}
              highlightColor={lightMode ? "#b2b5bd" : "#444"}
            >
              <Skeleton height={20} width={100} />
              <Skeleton height={20} width={70} />
            </SkeletonTheme>
          ) : (
            <>
              <h2>latest Now</h2>

              <Link
                href={"/tvshows"}
                style={{
                  color: "#626364",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                onClick={() => handleNavClick("series")}
              >
                See All
              </Link>
            </>
          )}
        </div>
        {movies.length === 0 ? (
          <SkeletonTheme
            baseColor={lightMode ? "#eee" : "#202020"}
            highlightColor={lightMode ? "#b2b5bd" : "#444"}
          >
            <Skeleton height={90} width={330} borderRadius={10} />
            <Skeleton height={90} width={330} borderRadius={10} />
          </SkeletonTheme>
        ) : (
          movies.map((movie) => (
            <div
              key={movie.id}
              className="boxes"
              style={{ backgroundColor: lightMode ? "#efefeffd" : "#0d0c0c" }}
            >
              <div className="left">
                <Image
                  src={movie.backdrop_path}
                  alt={movie.title}
                  width={300}
                  height={190}
                />
              </div>
              <div className="right">
                <div className="top">
                  <h3>{movie.name}</h3>
                  <div className="detail">
                    <p>{movie.number_of_seasons} season - </p>
                    <p>{movie.number_of_episodes} episodes</p>
                  </div>
                </div>
                <p className="bot" style={{ color: "#c00", fontWeight: "600" }}>
                  {movie.episode_run_time.length > 0
                    ? `${movie.episode_run_time} mingls | episode`
                    : "unconfirmed"}
                </p>
              </div>
              <div className={style.rates}>
                <i className="fa fa-star" aria-hidden="true"></i>
                <p style={{ fontWeight: "600", color: lightMode && "#000" }}>
                  {movie.vote_average !== 0
                    ? (movie.vote_average / 2).toFixed(1)
                    : "Not rated"}
                </p>
              </div>
              <h2 className={style.movieBan}>New</h2>
            </div>
          ))
        )}
      </div>
      <div className="videos">
        {moviesTrailers.length === 0 ? (
          <SkeletonTheme
            baseColor={lightMode ? "#eee" : "#202020"}
            highlightColor={lightMode ? "#b2b5bd" : "#444"}
          >
            <h2 style={{margin:".5em 0"}}>
              <Skeleton height={20} width={150} />
            </h2>
          </SkeletonTheme>
        ) : (
          <h2 style={{margin:".5em 0"}}>Trailers</h2>
        )}
        <div className="trailer-box">
          <div className="vid">
            {moviesTrailers.length === 0 ? (
              <SkeletonTheme
                baseColor={lightMode ? "#eee" : "#202020"}
                highlightColor={lightMode ? "#b2b5bd" : "#444"}
              >
                <Skeleton height={130} width={330} borderRadius={10} />
                <div
                  className="view"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Skeleton height={20} width={120} />
                  <Skeleton height={20} width={70} />
                </div>
                <Skeleton height={130} width={330} borderRadius={10} />
                <div
                  className="view"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Skeleton height={20} width={120} />
                  <Skeleton height={20} width={70} />
                </div>
                <Skeleton height={130} width={330} borderRadius={10} />
                <div
                  className="view"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Skeleton height={20} width={120} />
                  <Skeleton height={20} width={70} />
                </div>
                <Skeleton height={130} width={330} borderRadius={10} />
                <div
                  className="view"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Skeleton height={20} width={120} />
                  <Skeleton height={20} width={70} />
                </div>
                <Skeleton height={130} width={330} borderRadius={10} />
                <div
                  className="view"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Skeleton height={20} width={120} />
                  <Skeleton height={20} width={70} />
                </div>
              </SkeletonTheme>
            ) : (
              <>
                {moviesTrailers.map((movie) => (
                  <>
                    <iframe
                      width="200"
                      height="300"
                      src={`https://www.youtube.com/embed/${movie.trailers[0].key}`}
                      frameBorder="0"
                      className={style.trailer}
                      allowFullScreen
                      title=""
                    ></iframe>
                    <div
                      className="view"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <h5>{movie.title}</h5>
                      <Link
                        href={""}
                        style={{
                          color: "#626364",
                          textDecoration: "none",
                          cursor: "pointer",
                        }}
                      >
                        view more
                      </Link>
                    </div>
                  </>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideContent;
