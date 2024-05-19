"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./page.module.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Image from "next/image";
import { movieContext } from "@/context/Context";
import Sidebar from "@/components/Sidebar/Sidebar";
import Banner from "@/components/DetailsBanner/Banner";
import Navbar from "@/components/DetailsNavbar/Navbar";
import useMediaQuery from "@/components/UseMediaQuery";

function Page() {
  const [movieArray, setMovieArray] = useState([]);
  const [hoverB, setHoverB] = useState(false);
  const mobile = useMediaQuery("(max-width:768px)");
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
  ] = useContext(movieContext);
  useEffect(() => {
    const getAllCats = async () => {
      try {
        const responses = await Promise.all([
          fetch("/myapi/movie"),
          fetch("/myapi/cartoon"),
          fetch("/myapi/anime"),
          fetch("/myapi/series"),
        ]);

        const data = await Promise.all(
          responses.map((response) => response.json())
        );

        const concatenatedData = data.flat();

        setMovieArray(concatenatedData);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCats();
  }, []);
  const filteredArray = movieArray.filter((item) => {
    // Check if both genreNames arrays are defined and have at least one element
    if (
      item.genreNames &&
      item.genreNames.length > 0 &&
      selectedMovie.genreNames &&
      selectedMovie.genreNames.length > 0
    ) {
      // Compare the first genre in each array
      return item.genreNames[0] === selectedMovie.genreNames[0];
    } else {
      // If any array is undefined or empty, return false (no match)
      return false;
    }
  });

  // console.log(movieArray);
  // console.log(filteredArray);

  const movieListRef = useRef(null);
  const [showScrollDown, setShowScrollDown] = useState(true);
  const [showScrollAllDown, setShowScrollAllDown] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = movieListRef.current.scrollTop;
      setShowScrollDown(scrollPosition < 1);
      setShowScrollAllDown(scrollPosition > 10);
    };

    if (movieListRef.current) {
      movieListRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (movieListRef.current) {
        movieListRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  function convertRuntime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }

  useEffect(() => {
    setLoading(true); // Set loading state to true when selectedMovie changes
  }, [selectedMovie]);

  const handleImageLoad = () => {
    setLoading(false);
  };
  const formatCurrency = (number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(number);
  };

  const addToWatchlist = (movie) => {
    const alreadyInWatchlist = watchlist.some((item) => item.id === movie.id);

    if (alreadyInWatchlist) {
      alert("Already added to watchlist");
    } else {
      setWatchlist((prevWatchlist) => [...prevWatchlist, movie]);
    }
  };
  return (
    <>
      {selectedMovie.length === 0 ? (
        <div className={`loading ${!lightMode && "loaderLight"}`}>
          <div className={`spinner center`}>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
          </div>
        </div>
      ) : (
        <section className={`${style.main} `}>
          <Sidebar />
          <Navbar />
          <div
            className={`${style.contentsDisplay} ${
              lightMode ? "mainLightTwo" : ""
            }`}
          >
            {mobile ? (
              <h1>SOON</h1>
            ) : (
              <>
                <Banner bannerWidth={"100%"} />
                <div className={style.layer}>
                  <div
                    className={`${style.lists} ${
                      lightMode ? style.lineDark : ""
                    } ${style.lineThree} ${style.lineTwo}`}
                  >
                    <div className={`${style.movieList} scroller `}>
                      <div className={style.intro}>
                        <div className={style.leftIntro}>
                          {/* <div className={style.image}>
                      </div> */}
                          <Image
                            src={selectedMovie.poster_path}
                            width={200}
                            height={200}
                            className={style.movieImage}
                          />
                        </div>
                        <div className={style.RightIntro}>
                          {selectedMovie.Logo[0] ? (
                            <div className={style.image}>
                              <Image
                                src={selectedMovie.Logo[0]}
                                width={200}
                                height={30}
                                className={style.ImageMovie}
                              />
                            </div>
                          ) : (
                            <h1>{selectedMovie.title || selectedMovie.name}</h1>
                          )}
                          <div className={style.genres}>
                            {selectedMovie.genreNames.map((name, index) => (
                              <p key={index}>{name} </p>
                            ))}
                          </div>
                          <div className={style.actions}>
                            <button>Watch</button>{" "}
                            <button
                              onMouseOver={() => setHoverB(true)}
                              onMouseLeave={() => setHoverB(false)}
                              onClick={() => {
                                addToWatchlist(selectedMovie);
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
                        <div className={style.budget}>
                          <h2>Budget:</h2>
                          <p>
                            {selectedMovie.budget
                              ? selectedMovie.budget != 0
                                ? formatCurrency(selectedMovie.budget)
                                : "Unconfirmed"
                              : "Unconfirmed"}
                          </p>
                        </div>
                      </div>
                      <div className={style.overview}>
                        <div className="info">
                          <h3 style={{ whiteSpace: "nowrap" }}>
                            {selectedMovie.runtime
                              ? convertRuntime(selectedMovie.runtime) ||
                                selectedMovie.year
                              : selectedMovie.episode_run_time !== 0
                              ? `${selectedMovie.episode_run_time}mins/episode`
                              : ""}{" "}
                          </h3>
                          <h3>
                            {selectedMovie.release_date
                              ? selectedMovie.release_date.split("-")[0]
                              : selectedMovie.first_air_date.split("-")[0]}
                          </h3>
                          <h3>
                            {selectedMovie.genreNames.find(
                              (name) => name === "Horror"
                            ) ? (
                              <h3>PG 16</h3>
                            ) : (
                              <h3>PG 13</h3>
                            )}
                          </h3>
                        </div>
                        <div
                          className={`${style.storyLine} ${
                            showScrollAllDown
                              ? style.lineThreeShow
                              : style.lineThreeHide
                          }`}
                          ref={movieListRef}
                        >
                          <h1 style={{ fontSize: "20px" }}>Overview</h1>
                          <p>{selectedMovie.overview}</p>
                        </div>
                        <div
                          className={style.cast}
                          style={{
                            borderRight: lightMode && "2px solid #e7e6e6fd",
                          }}
                        >
                          {selectedMovie.director ? (
                            <>
                              <h1>Director</h1>
                              <div className={style.castProfile}>
                                <div className={style.leftCast}>
                                  <Image
                                    src={
                                      selectedMovie.director.profile_path
                                        ? `https://image.tmdb.org/t/p/original${selectedMovie.director.profile_path}`
                                        : "/images/blank-profile-picture-973460_960_720.webp"
                                    }
                                    width={100}
                                    className={style.castimage}
                                    height={100}
                                  />
                                </div>
                                <div className={style.rightCast}>
                                  <h3 style={{ color: lightMode && "#000" }}>
                                    {selectedMovie.director.name}
                                  </h3>
                                </div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          <h1>Casts</h1>

                          {selectedMovie.cast.map((items, index) => (
                            <div className={style.castProfile} key={index}>
                              <div className={style.leftCast}>
                                <Image
                                  src={
                                    items.profile_path
                                      ? items.profile_path
                                      : "/images/blank-profile-picture-973460_960_720.webp"
                                  }
                                  width={100}
                                  className={style.castimage}
                                  height={100}
                                />
                              </div>
                              <div className={style.rightCast}>
                                <h3 style={{ color: lightMode && "#000" }}>
                                  {items.name}
                                </h3>
                                <h3>As {items.character}</h3>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className={style.castTwo}>
                          <h1>More like this</h1>
                          <div>
                            {filteredArray.map((items, index) => (
                              <div
                                className={`${style.boxes} ${
                                  lightMode && style.boxesDark
                                }`}
                                key={index}
                                onClick={() => setSelectedMovie(items)}
                              >
                                <div className={style.leftS}>
                                  <Image
                                    src={
                                      items.poster_path ||
                                      items.images.jpg.image_url
                                    }
                                    alt={items.title || items.name}
                                    width={300}
                                    height={190}
                                    className={style.Imager}
                                  />
                                </div>
                                <div className="right">
                                  <div className={style.topS}>
                                    <h3
                                      style={{
                                        fontSize: "14px",
                                        color: lightMode && "#000",
                                      }}
                                    >
                                      {items.name || items.title.slice(0, 25)}
                                    </h3>
                                    <div className="detail">
                                      <p>
                                        {" "}
                                        {selectedMovie.release_date
                                          ? selectedMovie.release_date.split(
                                              "-"
                                            )[0]
                                          : selectedMovie.first_air_date.split(
                                              "-"
                                            )[0]}
                                      </p>
                                      <p>
                                        {items.runtime
                                          ? convertRuntime(items.runtime) ||
                                            items.year
                                          : items.episode_run_time !== 0
                                          ? `${items.episode_run_time}mins/episode`
                                          : ""}
                                      </p>
                                    </div>
                                    <div className={style.rates}>
                                      <i
                                        class="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                      <h4
                                        style={{
                                          fontWeight: "600",
                                          color: lightMode && "#000",
                                        }}
                                      >
                                        {items.vote_average != 0
                                          ? (
                                              (items.vote_average / 100) *
                                              5
                                            ).toFixed(1)
                                          : "Not rated"}
                                      </h4>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`${style.scrollDown}  ${
                          selectedMovie.overview.length > 200 &&
                          !showScrollAllDown
                            ? style.hiddenScroller
                            : ""
                        }`}
                      >
                        <h3 style={{ color: lightMode && "#000" }}>
                          Scroll Down
                        </h3>
                        <i
                          className={`fas fa-chevron-down ${style.scrollBtn}`}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default Page;
