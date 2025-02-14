"use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./SideContent.module.css";
import { movieContext } from "@/context/Context";
import Image from "next/image";
import Link from "next/link";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useRouter } from "next/navigation";
import useMediaQuery from "../UseMediaQuery";

function SideContent() {
  const [movies, setMovies] = useState([]);
  const [moviesTrailers, setMoviesTrailers] = useState([]);
  const navigate = useRouter();
  const mobile = useMediaQuery("(max-width:500px)");
  ("(max-width: 768px)");
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
        const response = await fetch(`myapi/series`);
        const data = await response.json();

        const filterMovies = data.filter((movie) => {
          const releaseYear = movie.first_air_date.split("-")[0];
          console.log(releaseYear);
          return (
            releaseYear == 2024 ||
            releaseYear == 2019 ||
            releaseYear == 2018 ||
            releaseYear == 2017 ||
            releaseYear == 2016
          );
        });
        mobile
          ? setMovies(filterMovies.slice(1, 3))
          : setMovies(filterMovies.slice(1, 3));

        // setUpcomingMovies(data);
      } catch (error) {
        console.error("Error fetching Upcoming movies:", error);
      }
    };

    fetchUpcomingMovies();
  }, []);
  console.log(movies);
  useEffect(() => {
    const fetchTrailersMovies = async () => {
      try {
        const response = await fetch(`myapi/movie`);
        const data = await response.json();
        console.log(data);
        const filterMovies = data.filter((movie) => {
          const releaseYear = movie.release_date.split("-")[0];
          console.log(releaseYear);
          return (
            releaseYear == 2023 ||
            releaseYear == 2022 ||
            releaseYear == 2021 ||
            releaseYear == 2020 ||
            releaseYear == 2019 ||
            releaseYear == 2018
          );
        });
        setMoviesTrailers(filterMovies);
        console.log(filterMovies);
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
              <h6
                onClick={() => {
                  navigate.push("/search");
                  setSearchValue("");
                  setGenre("Action");
                }}
              >
                Action
              </h6>
              <h6
                onClick={() => {
                  navigate.push("/search");
                  setSearchValue("");
                  setGenre("Horror");
                }}
              >
                Horror
              </h6>
              <h6
                onClick={() => {
                  navigate.push("/search");
                  setSearchValue("");
                  setGenre("Drama");
                }}
              >
                Drama
              </h6>
              <h6
                onClick={() => {
                  navigate.push("/search");
                  setSearchValue("");
                  setGenre("Comedy");
                }}
              >
                Comedy
              </h6>
              <h6
                onClick={() => {
                  navigate.push("/search");
                  setSearchValue("");
                  setGenre("Romance");
                }}
              >
                Romance
              </h6>
              <h6
                onClick={() => {
                  navigate.push("/search");
                  setSearchValue("");
                  setGenre("Mystery");
                }}
              >
                Mystery
              </h6>
              <h6
                onClick={() => {
                  navigate.push("/search");
                  setSearchValue("");
                  setGenre("Fantasy");
                }}
              >
                Fantasy
              </h6>
              <h6
                onClick={() => {
                  navigate.push("/search");
                  setSearchValue("");
                  setGenre("Adventure");
                }}
              >
                Adventure
              </h6>
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
        {!mobile && (
          <div className="latests">
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
                  className="boxesS"
                  style={{
                    backgroundColor: lightMode ? "#efefeffd" : "#0d0c0c",
                  }}
                >
                  <>
                    <div className="left">
                      <img
                        src={mobile ? movie.backdrop_path : movie.backdrop_path}
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
                      <p
                        className="bot"
                        style={{ color: "#c00", fontWeight: "600" }}
                      >
                        {movie.episode_run_time.length > 0
                          ? `${movie.episode_run_time} mins | episode`
                          : "unconfirmed"}
                      </p>
                    </div>
                    <div className={style.rates}>
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <p
                        style={{
                          fontWeight: "600",
                          color: lightMode && "#000",
                        }}
                      >
                        {movie.vote_average !== 0
                          ? ((movie.vote_average / 100) * 5).toFixed(1)
                          : "Not rated"}
                      </p>
                    </div>
                    <h2 className={style.movieBan}>New</h2>
                  </>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <div className="videos">
        {moviesTrailers.length === 0 ? (
          <SkeletonTheme
            baseColor={lightMode ? "#eee" : "#202020"}
            highlightColor={lightMode ? "#b2b5bd" : "#444"}
          >
            <h2 style={{ margin: ".5em 0" }}>
              <Skeleton height={20} width={150} />
            </h2>
          </SkeletonTheme>
        ) : (
          <h2
            style={{
              margin: ".5em auto",
              width: "fit-content",
              fontSize: "25px",
            }}
          >
            Trailers
          </h2>
        )}
        {/* <div className="trailers"> */}
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
                <div className="vid">
                  {moviesTrailers.map((movie) => (
                    <>
                      <iframe
                        style={{
                          height:"300px"
                        }}
                        key={movie.id}
                        width="100"
                        height="300"
                        src={`https://www.youtube.com/embed/${
                          movie.trailers && movie.trailers[1]
                            ? movie.trailers[1].key
                            : movie.trailer
                            ? movie.trailer.youtube_id
                            : ""
                        }`}
                        frameBorder="0"
                        className={style.trailer}
                        // allowFullScreen
                        // title=""
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
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default SideContent;
