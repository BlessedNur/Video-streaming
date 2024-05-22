"use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./Banner.module.css";
import Image from "next/image";
import { movieContext } from "@/context/Context";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useRouter } from "next/navigation";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

function Banner({ BannerApi, bannerWidth }) {
  const [itemActive, setItemActive] = useState(0);
  const [movies, setMovies] = useState([]);
  const [hoverB, setHoverB] = useState(false);

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
    watchlist,
    setWatchlist,
    currentUser,
    setCurrentUser,
  ] = useContext(movieContext);
  const navigate = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BannerApi}`);
        const data = await response.json();
        setMovies(data.slice(0, 30));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const addToWatchlist = (movie) => {
    const notyf = new Notyf({
      position: {
        x: "right",
        y: "top",
      },
    });

    const alreadyInWatchlist = watchlist.some((item) => item.id === movie.id);

    if (alreadyInWatchlist) {
      notyf.error("Already added to watchlist");
    } else {
      setWatchlist((prevWatchlist) => [...prevWatchlist, movie]);
      notyf.success("Added to watchlist");
    }
  };

  console.log(movies.length);
  // console.log(movies.length);
  useEffect(() => {
    const interval = setInterval(() => {
      setItemActive((prevItemActive) => (prevItemActive + 1) % movies.length);
    }, 8000);

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
        {movies.length === 0 ? (
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
              <Skeleton width={1260} height={700} borderRadius={7} />
            </div>
          </SkeletonTheme>
        ) : (
          <>
            {movies.map((movie, index) => (
              <div
                key={movie.id}
                className={`${style.item} ${
                  index === itemActive ? style.active : ""
                } ${lightMode ? style.Light : style.Dark}`}
              >
                <Image
                  src={movie.backdrop_path}
                  width={6000}
                  height={10000}
                  className={style.movieImage}
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
                    <button
                      onClick={() => {
                        navigate.push("/details");
                        setSelectedMovie(movie);
                      }}
                    >
                      Watch
                    </button>{" "}
                    <button
                      onMouseOver={() => setHoverB(true)}
                      onMouseLeave={() => setHoverB(false)}
                      onClick={() => {
                        currentUser.name
                          ? addToWatchlist(movie)
                          : navigate.push("/signup");
                      }}
                      title={"Add to watchlist"}
                      className={lightMode ? style.contentLight : ""}
                      style={{ color: lightMode && "#000" }}
                    >
                      <i
                        className={`${
                          !hoverB ? "fa-regular" : "fa"
                        } fa-bookmark`}
                        aria-hidden="true"
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Banner;
