"use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./Recommended.module.css";
import Image from "next/image";
import { movieContext } from "@/context/Context";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { usePathname, useRouter } from "next/navigation";

function Recommended({ title, seeAllTypes, api, length }) {
  const path = usePathname();
  const navigate = useRouter();

  // console.log(path);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
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
  ] = useContext(movieContext);
  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      try {
        const response = await fetch(`${api}`);
        const data = await response.json();

        setRecommendedMovies([...data.slice(0, length)]);
      } catch (error) {
        console.error("Error fetching Recommended movies:", error);
      }
    };

    fetchRecommendedMovies();
  }, []);

  return (
    <div className={style.line}>
      {recommendedMovies.length === 0 ? (
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
                <Skeleton width={150} height={20} borderRadius={5} />
              </p>
            </div>
          </div>
          <div className={style.movies}>
            <Skeleton
              width={path === "/kids" || path === "/movies" ? 134 : 120}
              height={160}
              borderRadius={10}
            />
            <Skeleton
              width={path === "/kids" || path === "/movies" ? 134 : 120}
              height={160}
              borderRadius={10}
            />
            <Skeleton
              width={path === "/kids" || path === "/movies" ? 134 : 120}
              height={160}
              borderRadius={10}
            />
            <Skeleton
              width={path === "/kids" || path === "/movies" ? 134 : 120}
              height={160}
              borderRadius={10}
            />
            <Skeleton
              width={path === "/kids" || path === "/movies" ? 134 : 120}
              height={160}
              borderRadius={10}
            />
            <Skeleton
              width={path === "/kids" || path === "/movies" ? 134 : 120}
              height={160}
              borderRadius={10}
            />
            <Skeleton
              width={path === "/kids" || path === "/movies" ? 134 : 120}
              height={160}
              borderRadius={10}
            />
            <Skeleton
              width={path === "/kids" || path === "/movies" ? 134 : 120}
              height={160}
              borderRadius={10}
            />
            {(path === "/kids" || path === "/movies") && (
              <div>
                <Skeleton
                  width={path === "/kids" || path === "/movies" ? 134 : 120}
                  height={160}
                  borderRadius={10}
                />
              </div>
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
                setFilteredType("Default");
                path === "/" || path === "/movies"? setCat(0) : path === "/kids" && setCat(3);
                navigate.push("/search");
              }}
            >
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
                  onClick={() => {}}
                >
                  <div className={style.thumbnail}>
                    <Image
                      src={movie.poster_path}
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
                      <div
                        className={`${style.waves} ${style.waveThree}`}
                      ></div>
                    </div>
                  </div>
                  <div className={style.rates}>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <p
                      style={{ fontWeight: "600", color: lightMode && "#fff" }}
                    >
                      {movie.vote_average !== 0
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

export default Recommended;
