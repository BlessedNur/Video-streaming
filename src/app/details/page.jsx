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
import Navigation from "@/components/Navigation/Navigation";

function Page() {
  const [movieArray, setMovieArray] = useState([]);
  const [hoverB, setHoverB] = useState(false);
  const mobile = useMediaQuery("(max-width:650px)");
  const [viewMore, setViewMore] = useState(false);

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

  const matchFound = filteredArray.find((movie) => selectedMovie === movie);

  // console.log(movieArray);
  console.log(filteredArray);

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

  const releaseYear = selectedMovie.release_date
    ? selectedMovie.release_date.split("-")[0]
    : selectedMovie.first_air_date
    ? selectedMovie.first_air_date.split("-")[0]
    : "Unknown";

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
      {selectedMovie.length === 1 ? (
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
          {!mobile && <Sidebar />}
          <Navbar />
          <div
            className={`${style.contentsDisplay} ${
              lightMode ? "mainLightTwo" : ""
            }`}
          >
            {mobile ? (
              <>
                <section className={style.mobiles}>
                  <div
                    className={`${style.lists} ${
                      lightMode ? style.lineDark : ""
                    } ${style.lineThree} ${style.lineTwo}`}
                  >
                    <div className={`${style.movieList} scroller `} id="top">
                      {/* <Banner bannerWidth={"100%"} /> */}

                      <div
                        style={{
                          background:
                            mobile &&
                            `url("${
                              selectedMovie.backdrop_path ||
                              "https://c4.wallpaperflare.com/wallpaper/568/232/7/texture-simple-dark-simple-background-wallpaper-preview.jpg"
                            }") no-repeat center center / cover`,
                        }}
                        className={`${style.intro} ${lightMode && style.Light}`}
                      >
                        <div className={style.top}>
                          <div className={style.lefttop}>
                            {/* <div className={style.image}>
                      </div> */}
                            <img
                              src={selectedMovie.poster_path}
                              // width={200}
                              // height={200}
                              className={style.movieImage}
                            />
                          </div>
                          <div className={style.RightIntro}>
                            {selectedMovie.Logo[0] ? (
                              <div className={style.image}>
                                <img
                                  src={selectedMovie.Logo[0]}
                                  width={200}
                                  height={30}
                                  className={style.ImageMovie}
                                />
                              </div>
                            ) : (
                              <h1>
                                {selectedMovie.title || selectedMovie.name}
                              </h1>
                            )}

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
                        </div>
                        <div className={style.overview}>
                          {/* <div className="info"> */}
                          <h3 style={{ whiteSpace: "nowrap" }}>
                            {selectedMovie.runtime
                              ? convertRuntime(selectedMovie.runtime) ||
                                selectedMovie.year
                              : selectedMovie.episode_run_time !== 0
                              ? `${selectedMovie.episode_run_time}mins/episode`
                              : ""}{" "}
                          </h3>
                          <h3>{releaseYear}</h3>
                          <h3>
                            {selectedMovie.genreNames.find(
                              (name) => name === "Horror"
                            ) ? (
                              <h3>PG 16</h3>
                            ) : (
                              <h3>PG 13</h3>
                            )}
                          </h3>
                          {/* </div> */}
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
                          <p>
                            {!viewMore
                              ? `${selectedMovie.overview.slice(0, 100)}...`
                              : selectedMovie.overview}
                            <span
                              style={{
                                color: "#c00",
                                fontWeight: "800",
                                margin: "0 1em",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                !viewMore
                                  ? setViewMore(true)
                                  : setViewMore(false)
                              }
                            >
                              {viewMore ? "view less" : "view more"}
                            </span>
                          </p>
                        </div>
                        <div className={style.budgetM}>
                          <div className={style.budget}>
                            <h2>Genre:</h2>
                            <div className={style.genres}>
                              {selectedMovie.genreNames.map((name, index) => (
                                <p key={index}>{name} </p>
                              ))}
                            </div>
                          </div>

                          <div className={style.budget}>
                            <h2>Director:</h2>
                            <p>
                              {selectedMovie.director
                                ? selectedMovie.director.name
                                : ""}
                            </p>
                          </div>

                          <div className={style.budget}>
                            <h2>Revenue:</h2>
                            <p>
                              {selectedMovie.revenue
                                ? selectedMovie.revenue != 0
                                  ? formatCurrency(selectedMovie.revenue)
                                  : "Unconfirmed"
                                : "Unconfirmed"}
                            </p>
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
                      </div>
                      <div className={style.castThree} style={{}}>
                        {/* {selectedMovie.director ? (
                          <>
                            <div className={style.castProfile}>
                              <h1 className={style.dr}>Director</h1>
                              <div className={style.leftCast}>
                                <img
                                  src={
                                    selectedMovie.director.profile_path
                                      ? `https://image.tmdb.org/t/p/original${selectedMovie.director.profile_path}`
                                      : "/images/blank-profile-picture-973460_960_720.webp"
                                  }
                                  // width={100}
                                  className={style.castimage}
                                  // height={100}
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
                        )} */}
                        <div className={style.caster}>
                          <h1>Casts</h1>
                          <div
                            className={style.mobileCast}
                            style={{
                              padding: "1em",
                            }}
                          >
                            {selectedMovie.cast.map((items, index) => (
                              <div
                                className={`${style.castProfileTwos} `}
                                key={index}
                              >
                                <div className={style.leftCast}>
                                  <img
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
                                {/* <div className={style.rightCast}>
                                  <h3
                                    style={{
                                      color: lightMode && "#000",
                                      fontSize: "11px",
                                    }}
                                  >
                                    {items.name}
                                  </h3>
                                  <h3>As {items.character}</h3>
                                </div> */}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className={style.castTwoss}>
                        <h1>More like this</h1>
                        <div className={style.vids}>
                          <div className={style.likeThis}>
                            {filteredArray.map((items, index) => (
                              <div
                                className={`${style.boxes} ${
                                  lightMode && style.boxesDark
                                }`}
                                key={index}
                                onClick={() => setSelectedMovie(items)}
                              >
                                <div className={style.leftS}>
                                  <img
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
                                        fontSize: "12px",
                                        fontWeight: "normal",
                                        color: lightMode && "#000",
                                      }}
                                    >
                                      {items.name || items.title.slice(0, 15)}
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
                                        className="fa fa-star"
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
                      <>
                        <h1>Trailer</h1>
                        {mobile && (
                          <div className={style.trailer}>
                            <iframe
                              width="100"
                              height="100"
                              src={`https://www.youtube.com/embed/${selectedMovie.trailers[1].key}`}
                              frameBorder="0"
                              className={style.trailer}
                              allowFullScreen
                              title=""
                            ></iframe>
                          </div>
                        )}
                      </>
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
                </section>
              </>
            ) : (
              <>
                <div className={style.layers}>
                  <div
                    className={`${style.backImage} ${
                      lightMode && style.Lighter
                    }`}
                  >
                    <div
                      className={`${style.introL} ${lightMode && style.Light}`}
                    >
                      <div className={style.RightIntro}>
                        {selectedMovie.Logo ? (
                          <div className={style.Dlogo}>
                            <img
                              src={selectedMovie.Logo[0]}
                              width={200}
                              height={30}
                              className={style.ImageMovie}
                            />
                          </div>
                        ) : (
                          <h1>{selectedMovie.title || selectedMovie.name}</h1>
                        )}
                        <div
                          className={`${style.storyLineTwo} ${
                            showScrollAllDown
                              ? style.lineThreeShow
                              : style.lineThreeHide
                          }`}
                          ref={movieListRef}
                        >
                          <p style={{ color: lightMode && "#000" }}>
                            {selectedMovie.overview}
                          </p>
                        </div>
                        <div className={style.overview}>
                          {/* <div className="info"> */}
                          <h3 style={{ whiteSpace: "nowrap" }}>
                            {selectedMovie.runtime
                              ? convertRuntime(selectedMovie.runtime) ||
                                selectedMovie.year
                              : selectedMovie.episode_run_time !== 0
                              ? `${selectedMovie.episode_run_time}mins/episode`
                              : ""}{" "}
                          </h3>
                          <h3>{releaseYear}</h3>
                          <h3>
                            {selectedMovie.genreNames &&
                            selectedMovie.genreNames.find(
                              (name) => name === "Horror"
                            ) ? (
                              <h3>PG 16</h3>
                            ) : (
                              <h3>PG 13</h3>
                            )}
                          </h3>
                          {/* </div> */}
                        </div>
                        <div className={style.genres}>
                          {selectedMovie.genreNames
                            ? selectedMovie.genreNames.map((name, index) => (
                                <p
                                  style={{ color: !lightMode && "#fff" }}
                                  key={index}
                                >
                                  {name}{" "}
                                </p>
                              ))
                            : ""}
                        </div>
                        <h1 style={{ color: !lightMode && "#fff" }}>Casts :</h1>
                        <div className={style.caster}>
                          <div
                            className={style.Dcast}
                            style={{
                              padding: "1em",
                            }}
                          >
                            {selectedMovie.cast
                              ? selectedMovie.cast.map((items, index) => (
                                  <div
                                    className={`${style.castProfileTwos} `}
                                    key={index}
                                  >
                                    <div className={style.leftCast}>
                                      <img
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
                                  </div>
                                ))
                              : "Unknown"}
                          </div>
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
                            <p>Add to watchlist</p>
                            <i
                              className={`${
                                !hoverB ? "fa-regular" : "fa"
                              } fa-bookmark`}
                              aria-hidden="true"
                            ></i>
                          </button>
                        </div>
                        <div className={style.castTwossD}>
                          <h1>More like this</h1>
                          <div className={style.vidsD}>
                            <div className={style.likeThis}>
                              {filteredArray.length === 0 ? (
                                <SkeletonTheme
                                  baseColor={lightMode ? "#eee" : "#202020"}
                                  highlightColor={
                                    lightMode ? "#b2b5bd" : "#444"
                                  }
                                >
                                  <div className={style.movies}>
                                    <Skeleton
                                      width={204}
                                      height={100}
                                      borderRadius={7}
                                    />
                                    <Skeleton
                                      width={204}
                                      height={100}
                                      borderRadius={7}
                                    />
                                    <Skeleton
                                      width={204}
                                      height={100}
                                      borderRadius={7}
                                    />
                                    <Skeleton
                                      width={204}
                                      height={100}
                                      borderRadius={7}
                                    />
                                    <Skeleton
                                      width={204}
                                      height={100}
                                      borderRadius={7}
                                    />
                                    <Skeleton
                                      width={204}
                                      height={100}
                                      borderRadius={7}
                                    />
                                  </div>
                                </SkeletonTheme>
                              ) : (
                                filteredArray.map((items, index) => (
                                  <div
                                    className={`${style.boxes} ${
                                      lightMode && style.boxesDark
                                    } ${style.hovered}`}
                                    key={index}
                                    onClick={() => setSelectedMovie(items)}
                                  >
                                    <div className={style.leftS}>
                                      <img
                                        src={
                                          items.backdrop_path ||
                                          items.images.jpg.large_url
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
                                            fontSize: "12px",
                                            fontWeight: "normal",
                                            color: lightMode && "#000",
                                          }}
                                        >
                                          {items.name ||
                                            items.title.slice(0, 15)}
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
                                            className="fa fa-star"
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
                                ))
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                        <Image
                       width={200}   
                       height={200}
                      className={style.bk}
                      src={selectedMovie.backdrop_path}
                      alt=""
                    />
                  </div>

                  <div className={style.budgetM}>
                    <div className={style.budget}>
                      <h2>Genre:</h2>
                    </div>

                    <div className={style.budget}>
                      <h2>Director:</h2>
                      <p>
                        {selectedMovie.director
                          ? selectedMovie.director.name
                          : ""}
                      </p>
                    </div>

                    <div className={style.budget}>
                      <h2>Revenue:</h2>
                      <p>
                        {selectedMovie.revenue
                          ? selectedMovie.revenue != 0
                            ? formatCurrency(selectedMovie.revenue)
                            : "Unconfirmed"
                          : "Unconfirmed"}
                      </p>
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
                </div>
              </>
            )}
          </div>
        </section>
      )}
      {mobile && <Navigation />}
    </>
  );
}

export default Page;
