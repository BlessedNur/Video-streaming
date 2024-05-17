"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./page.module.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Image from "next/image";
import { movieContext } from "@/context/Context";
import Sidebar from "@/components/Sidebar/Sidebar";
import Banner from "@/components/DetailsBanner/Banner";
import Navbar from "@/components/DetailsNavbar/Navbar";

function Page() {
  const [movieArray, setMovieArray] = useState([]);
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

  return (
    <>
      {selectedMovie.length === 0 ? (
        <h1>Nothing here</h1>
      ) : (
        <section className={`${style.main} `}>
          <Sidebar />
          <Navbar />
          <div
            className={`${style.contentsDisplay} ${
              lightMode ? "mainLight" : ""
            }`}
          >
            <Banner bannerWidth={"100%"} />
            <div className={style.layer}>
              <div
                className={`${style.lists} ${lightMode ? style.lineDark : ""} ${
                  style.lineThree
                } ${style.lineTwo}`}
              >
                <div
                  className={`${style.movieList} scroller ${
                    lightMode ? style.movieListLight : style.movieListDark
                  }`}
                >
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
                          onClick={() =>
                            alert(`Added ${selectedMovie.title} to watchlist`)
                          }
                          className={lightMode ? style.contentLight : ""}
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={style.overview}>
                    <div className="info">
                      <h3 style={{ whiteSpace: "nowrap" }}>
                        {convertRuntime(selectedMovie.runtime)}
                      </h3>
                      <h3>{selectedMovie.release_date.split("-")[0]}</h3>
                      <h3>PG 13</h3>
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
                    <div className={style.cast}>
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
                          <h3>{selectedMovie.director.name}</h3>
                        </div>
                      </div>
                      <h1>Casts</h1>

                      {selectedMovie.cast.map((items) => (
                        <div className={style.castProfile}>
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
                            <h3>{items.name}</h3>
                            <h3>As {items.character}</h3>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className={style.castTwo}>
                      <h1>More like this</h1>
                      <div>
                        {filteredArray.map((items) => (
                          <div
                            className={style.boxes}
                            onClick={() => setSelectedMovie(items)}
                          >
                            <div className={style.leftS}>
                              <Image
                                src={
                                  items.backdrop_path ||
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
                                <h3 style={{ fontSize: "13px" }}>
                                  {items.name || items.title.slice(0, 15)}
                                </h3>
                                {/* <div className="detail"> */}
                                {/* <p>
                                  {items.release_date.split("-")[0] ||
                                    items.first_air_date.split("-")[0]}
                                </p>
                                <p>
                                  {convertRuntime(items.runtime) || items.year}
                                </p> */}
                                {/* </div> */}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${style.scrollDown}  ${
                      selectedMovie.overview.length > 200 && !showScrollAllDown?
                      style.hiddenScroller:""
                    }`}
                  >
                    <h3 style={{ color: lightMode && "#000" }}>Scroll Down</h3>
                    <i className={`fas fa-chevron-down ${style.scrollBtn}`}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Page;
