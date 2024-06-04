"use client";
// components/AnimationComponent.js
import { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import style from "./page.module.css";
import { movieContext } from "@/context/Context";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import useMediaQuery from "@/components/UseMediaQuery";
import Navigation from "@/components/Navigation/Navigation";
import { useSession } from "next-auth/react";
const Page = () => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [anime, setAnime] = useState([]);
  const [cartoon, setCartoon] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const path = usePathname();
  const [note, setNote] = useState(false);
  const navigate = useRouter();
  const mobile = useMediaQuery("(max-width:500px)");

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

  const { data: session } = useSession();
  const [minipro, setMiniPro] = useState(false);

  genre && setFilteredType("Default");
  path === "/search" && handleSideClick("");
  const previousCat = useRef(cat);

  const handleNote = () => {
    if (searchValue && notFound) {
      setNote(true);
      setTimeout(() => {
        setNote(false);
      }, 5000);
    }
  };

  useEffect(() => {
    if (previousCat.current !== cat) {
      handleNote();
    }
    previousCat.current = cat;
  }, [cat, searchValue, notFound]);

  const animationContainer = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  // console.log(isLoading);
  // console.log(movies);

  useEffect(() => {
    if (typeof window !== "undefined" && animationContainer.current) {
      import("lottie-web")
        .then((Lottie) => {
          const anim = Lottie.loadAnimation({
            container: animationContainer.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/35984/play_fill_loader.json",
          });

          anim.addEventListener("DOMLoaded", onDOMLoaded);
          anim.setSpeed(1);

          function onDOMLoaded() {
            anim.addEventListener("complete", () => {});
          }

          return () => {
            anim.destroy();
          };
        })
        .catch((error) => {
          console.error("Failed to load lottie-web", error);
        });
    }
  }, [searchValue || (!notFound && isLoading)]);
  // console.log(cat);

  useEffect(() => {
    const fetchData = async (url, setData) => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    switch (cat) {
      case 0:
        fetchData("/myapi/movie", setMovies);
        break;
      case 1:
        fetchData("/myapi/series", setSeries);
        break;
      case 2:
        fetchData("/myapi/anime", setAnime);
        break;
      case 3:
        fetchData("/myapi/cartoon", setCartoon);
        break;
      default:
        break;
    }
  }, [cat]);
  const renderList = (items) => {
    let filteredItems = [...items];

    if (genre) {
      filteredItems = filteredItems.filter((item) =>
        item.genreNames.includes(genre)
      );
    }

    let sortedItems = [...filteredItems];
    switch (filteredType) {
      case "Top Rated":
        sortedItems = sortedItems.filter(
          (item) => item.vote_average > 10 || item.popularity > 400
        );
        sortedItems.sort((a, b) => {
          if (
            (b.vote_average || b.popularity) ===
            (a.vote_average || a.popularity)
          ) {
            return b.popularity - a.popularity;
          }
          return (
            (b.vote_average || b.popularity) - (a.vote_average || a.popularity)
          );
        });
        break;
      case "Trending":
        sortedItems = sortedItems.filter(
          (item) => item.vote_average > 70 || item.popularity > 2400
        );
        sortedItems.sort((a, b) => {
          if (
            (b.vote_average || b.popularity) ===
            (a.vote_average || a.popularity)
          ) {
            return b.popularity - a.popularity;
          }
          return (
            (b.vote_average || b.popularity) + (a.vote_average || a.popularity)
          );
        });
        break;
      case "Latest":
        sortedItems = sortedItems.filter((item) => {
          let latestDate = null;
          if (item.release_date) {
            latestDate = item.release_date;
          } else if (item.first_air_date) {
            latestDate = item.first_air_date;
          } else if (item.year) {
            latestDate = new Date(item.year, 0); // Assuming 'year' represents the release year
          }
          return latestDate && new Date(latestDate) <= new Date();
        });
        sortedItems.sort((a, b) => {
          let aDate = null;
          let bDate = null;
          if (a.release_date) {
            aDate = new Date(a.release_date);
          } else if (a.first_air_date) {
            aDate = new Date(a.first_air_date);
          } else if (a.year) {
            aDate = new Date(a.year, 0); // Assuming 'year' represents the release year
          }
          if (b.release_date) {
            bDate = new Date(b.release_date);
          } else if (b.first_air_date) {
            bDate = new Date(b.first_air_date);
          } else if (b.year) {
            bDate = new Date(b.year, 0); // Assuming 'year' represents the release year
          }
          return bDate - aDate;
        });
        break;
      case "Default":
        sortedItems;
        break;
      default:
        break;
    }

    // console.log(sortedItems.map((item) => item.popularity));
    return (
      <section
        className={`${style.Lists} ${
          filteredItems.length === 0 && style.ListGenre
        }`}
      >
        {filteredItems.length > 0 ? (
          sortedItems.map((item) => (
            <div
              className={style.movieBox}
              key={item.id}
              onClick={() => {
                navigate.push("/details");
                setSelectedMovie(item);
              }}
              title={item.title || item.name}
            >
              <div className={style.thumbnail}>
                <img
                  src={item.poster_path || item.images.jpg.image_url}
                  alt={`Poster for ${item.title}`}
                  className={style.movieImage}
                />
              </div>
              <div className={style.rates}></div>
            </div>
          ))
        ) : (
          <div
            style={{
              textAlign: "center",
              color: !lightMode ? "#fff" : "#000",
              height: !mobile ? "80%" : "60%",
              width: "90vw",
              display: "grid",
              placeContent: "center",
              fontSize: "20px",
            }}
          >
            <dotlottie-player
              src="https://lottie.host/a1d6e94d-b2bd-4a7d-9529-55d0e08b014b/e6QbYU4gAC.json"
              background="transparent"
              speed="1"
              style={{ height: "300px" }}
              loop
              autoplay
            ></dotlottie-player>
            <h2>Nothing found</h2>
          </div>
        )}
      </section>
    );
  };

  const [filteredItems, setFilteredItems] = useState([]);

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();

    setSearchValue(searchQuery);
    if (searchQuery === "") {
      setFilteredItems([]);
    } else {
      let filteredItems = [];
      switch (cat) {
        case 0:
          filteredItems = movies.filter((item) =>
            item.title.toLowerCase().includes(searchQuery)
          );
          break;
        case 1:
          filteredItems = series.filter((item) =>
            item.title.toLowerCase().includes(searchQuery)
          );
          break;
        case 2:
          filteredItems = anime.filter((item) =>
            item.title.toLowerCase().includes(searchQuery)
          );
          break;
        case 3:
          filteredItems = cartoon.filter((item) =>
            item.title.toLowerCase().includes(searchQuery)
          );
          break;
        default:
          break;
      }
      setFilteredItems(filteredItems);
    }
  };

  useEffect(() => {
    setFilteredItems([]);
  }, [cat]);

  useEffect(() => {
    if (searchValue && filteredItems.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  }, [searchValue, filteredItems]);

  return (
    <section
      style={{
        backgroundColor: !lightMode && "black",
        height: "100vh",
        transition: ".3s",
      }}
    >
      {mobile ? <Navbar /> : <Sidebar />}
      <div className={style.nav}>
        <div className={style.left}>
          <div className={`${style.search} ${!lightMode && style.searchDark}`}>
            <i
              className="fa fa-search"
              aria-hidden="true"
              style={{ color: "#626364" }}
            ></i>
            <input
              type="text"
              className={style.input}
              value={searchValue}
              onChange={
                !isLoading
                  ? (e) => {
                      handleSearch(e);
                      setGenre("");
                    }
                  : undefined
              }
              placeholder="Find movies , Tv shows ...."
              style={{ color: !lightMode ? "#fff" : "#000" }}
            />
            {!mobile && (
              <button
                className={`${style.filters} ${
                  !lightMode && style.filtersDark
                }`}
                onClick={() =>
                  !showFilter ? setShowFilter(true) : setShowFilter(false)
                }
                disabled={searchValue ? true : false}
              >
                <p
                  className={`${!lightMode && style.DarkSvg} ${
                    genre && !lightMode && style.SvgGenre
                  }`}
                >
                  Filter
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  style={{}}
                  className={`${!lightMode && style.DarkSvg} ${
                    searchValue || (genre && !lightMode && style.SvgGenre)
                  }`}
                  id="filter"
                >
                  <path
                    fill={searchValue || genre ? "#b1b5bf" : "#000"}
                    fillRule="evenodd"
                    d="M20 5h-1.17a3.001 3.001 0 0 0-5.66 0H4a1 1 0 0 0 0 2h9.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2zm-4 2a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM3 12a1 1 0 0 1 1-1h1.17a3.001 3.001 0 0 1 5.66 0H20a1 1 0 1 1 0 2h-9.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 0 1-1-1zm5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-4 4a1 1 0 1 0 0 2h9.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-1.17a3.001 3.001 0 0 0-5.66 0H4zm13 1a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            )}
            {!mobile && (
              <div
                className={`${style.filterList} ${
                  showFilter && style.filterListShow
                } ${!lightMode && style.filterListDark}`}
              >
                <ul className={style.filterUl}>
                  <li
                    className={style.filter}
                    onClick={() => {
                      setFilteredType("Top Rated");
                      setShowFilter(false);
                    }}
                  >
                    Top Rated
                  </li>
                  <li
                    className={style.filter}
                    onClick={() => {
                      setFilteredType("Trending");
                      setShowFilter(false);
                    }}
                  >
                    Trending
                  </li>
                  <li
                    className={style.filter}
                    onClick={() => {
                      setFilteredType("Latest");
                      setShowFilter(false);
                    }}
                  >
                    Latest
                  </li>
                  <li
                    className={style.filter}
                    onClick={() => {
                      setFilteredType("Default");
                      setShowFilter(false);
                    }}
                  >
                    Default
                  </li>
                </ul>
              </div>
            )}
            <div
              className={`${style.Note} ${note && style.ShowNote}`}
              style={{
                position: "absolute",
              }}
            >
              NOTE : Please renew your search after selecting a new
              category.Have issues? <Link href={""}>Contact us</Link>
            </div>
          </div>
        </div>
        {!mobile && (
          <div className={style.right}>
            <div className={style.bell} title="notifications">
              <i
                className="fa-regular fa-bell"
                aria-hidden="true"
                style={{ color: !lightMode ? "#fff" : "#000" }}
              ></i>
            </div>
            <div
              className={style.account}
              onMouseOver={() => setMiniPro(true)}
              onMouseLeave={() => setMiniPro(false)}
            >
              <div className={style.profile}>
                <img
                  src={
                    !session
                      ? "/images/blank-profile-picture-973460_960_720.webp"
                      : `${session.user.image}`
                  }
                />
              </div>
              <div
                className={`${style.profilepop} ${
                  minipro && style.profilePShow
                }`}
                style={{
                  backgroundColor: lightMode && "rgba(239, 239, 239, 0.992)",
                }}
              >
                <div
                  className={style.picSection}
                  style={{
                    border: !lightMode && "1px solid #62636450",
                  }}
                >
                  <div className={style.flex}>
                    <div className={style.profilePic}>
                      <img
                        src={
                          !session
                            ? "/images/blank-profile-picture-973460_960_720.webp"
                            : `${session.user.image}`
                        }
                      />
                    </div>
                    <div className={style.info}>
                      {!currentUser.name ? (
                        <h2>Unknown</h2>
                      ) : (
                        <h2>{currentUser.name}</h2>
                      )}
                      <p style={{ color: !lightMode && "#626364" }}>
                        {/* Member since */}
                      </p>
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    margin: "1em 0",
                  }}
                >
                  {session && session.user.email.slice(0, 10)}****
                </p>
                <button
                  className={`Btn ${lightMode && "btn"}`}
                  onClick={() => {
                    signOut("google");
                    setCurrentUser((prev) => ({
                      ...prev,
                      name: "",
                    }));
                    navigate.push("/signup");
                  }}
                >
                  <div class="sign">
                    <svg
                      viewBox="0 0 512 512"
                      className={lightMode && "btnSvg"}
                    >
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                    </svg>
                  </div>

                  <div class={`text ${lightMode && "textx"}`}>Logout</div>
                </button>
              </div>
            </div>
          </div>
        )}
        {/* <div
          className={`${style.profileData} ${showProfile && style.showProfile}`}
          style={{
            backgroundColor: lightMode ? "#efefeffd" : "#0d0c0c",
            color: lightMode ? "#000" : "#d3d5db",
          }}
        >
          <div className={style.header}>
            <h1>My Profile</h1>

            <div
              className={style.edit}
              style={{
                border: !lightMode && "1px solid #62636450",
              }}
            >
              <p>Edit profile Details</p>
              <i class="fas fa-edit    "></i>
            </div>
          </div>
          <div
            className={style.picSection}
            style={{
              border: !lightMode && "1px solid #62636450",
            }}
          >
            <div className={style.flex}>
              <div className={style.profilePic}>
                <Image
                  width={200}
                  height={200}
                  alt="profile"
                  src={"/images/wallpaperflare.com_wallpaper (16).jpg"}
                />
              </div>
              <div className={style.info}>
                <h2>Ilma Fortune N.</h2>
                <p style={{ color: !lightMode && "#626364" }}>Member since</p>
                <p style={{ color: !lightMode && "#626364" }}>
                  Douala , cameroon
                </p>
              </div>
            </div>
          </div>
          <div
            className={style.mainInfo}
            style={{
              border: !lightMode && "1px solid #62636450",
            }}
          >
            <p>Personal info</p>
            <div className={style.personalInfo}>
              <div className={style.rowOne}>
                <div className={style.box}>
                  <h4>FirstName</h4>
                  <h5>Ilma</h5>
                </div>
                <div className={style.box}>
                  <h4>Email Address</h4>
                  <h5>Ilm*********</h5>
                </div>
                <div className={style.box}>
                  <h4>Bio</h4>
                  <h5>Lorem ipsum dolor sit amet consectetur adipi</h5>
                </div>
              </div>
              <div className={style.rowTwo}>
                <div className={style.box}>
                  <h4>LastName</h4>
                  <h5>Fortune</h5>
                </div>
                <div className={style.box}>
                  <h4>Phone</h4>
                  <h5>+7230923423</h5>
                </div>
              </div>
            </div>
          </div>
          <div
            className={style.picSection}
            style={{
              border: !lightMode && "1px solid #62636450",
              display: "flex",
              flexDirection: "column",
              gap: "3.5em",
            }}
          >
            <p>Address</p>
            <div className={style.flex} style={{ gap: "3em" }}>
              <div className={style.box}>
                <h4>Country</h4>
                <h5>Cameroon</h5>
              </div>
              <div className={style.box}>
                <h4>City/State</h4>
                <h5>Bamenda</h5>
              </div>
            </div>
          </div>
          <div className="botP">
            <button class="cta">
              <span class="hover-underline-animation"> Contact us</span>
              <svg
                id="arrow-horizontal"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="10"
                viewBox="0 0 46 16"
              >
                <path
                  id="Path_10"
                  data-name="Path 10"
                  d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                  transform="translate(30)"
                ></path>
              </svg>
            </button>
            <button
              className={`Btn ${lightMode && "btn"}`}
              onClick={() => alert("LOGGED OUT")}
            >
              <div class="sign">
                <svg viewBox="0 0 512 512" className={lightMode && "btnSvg"}>
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                </svg>
              </div>

              <div class={`text ${lightMode && "textx"}`}>Logout</div>
            </button>
          </div>
        </div> */}
      </div>
      <div className={style.lists}>
        <section className={style.header}>
          <div className={style.categories}>
            <h1
              className={style.welcome}
              style={{ color: !lightMode && "#fff", fontSize: "20px" }}
            >
              Entertainment for All
            </h1>
            <div className={style.leftCat}>
              <ul
                className={`
                  ${cat === 0 && style.catOne}
                  ${cat === 1 && style.catTwo}
                  ${cat === 2 && style.catThree}
                  ${cat === 3 && style.catFour}
                `}
              >
                <li
                  className={cat === 0 && style.leftCatActive}
                  onClick={() => setCat(0)}
                  style={{ color: !lightMode && "#fff" }}
                >
                  Movies
                </li>
                <li
                  className={cat === 1 && style.leftCatActive}
                  onClick={() => setCat(1)}
                  style={{ color: !lightMode && "#fff" }}
                >
                  Tv Shows
                </li>
                <li
                  className={cat === 2 && style.leftCatActive}
                  onClick={() => setCat(2)}
                  style={{ color: !lightMode && "#fff" }}
                >
                  Anime
                </li>
                <li
                  className={cat === 3 && style.leftCatActive}
                  onClick={() => setCat(3)}
                  style={{ color: !lightMode && "#fff" }}
                >
                  Cartoon
                </li>
              </ul>
            </div>
            <div className={style.genres}>
              <p>Genres</p>
              <i class="fa fa-chevron-down" aria-hidden="true"></i>
            </div>
            {mobile ? (
              <div
                className={style.filts}
                style={{
                  background: !lightMode && "#ebebeb15",
                }}
              >
                <button
                  className={` ${!lightMode && style.filterListDark} ${
                    style.filtersTwo
                  }`}
                  style={
                    {
                      // background:!lightMode &&  "#ebebeb"
                    }
                  }
                  onClick={() =>
                    !showFilter ? setShowFilter(true) : setShowFilter(false)
                  }
                  disabled={searchValue || genre ? true : false}
                >
                  <p
                    className={`${!lightMode && style.DarkSvg} ${
                      genre && !lightMode && style.SvgGenre
                    }`}
                  >
                    Filter
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    style={{}}
                    className={`${!lightMode && style.DarkSvg} ${
                      searchValue || (genre && !lightMode && style.SvgGenre)
                    }`}
                    id="filter"
                  >
                    <path
                      fill={searchValue || genre ? "#b1b5bf" : "#000"}
                      fillRule="evenodd"
                      d="M20 5h-1.17a3.001 3.001 0 0 0-5.66 0H4a1 1 0 0 0 0 2h9.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2zm-4 2a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM3 12a1 1 0 0 1 1-1h1.17a3.001 3.001 0 0 1 5.66 0H20a1 1 0 1 1 0 2h-9.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 0 1-1-1zm5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-4 4a1 1 0 1 0 0 2h9.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-1.17a3.001 3.001 0 0 0-5.66 0H4zm13 1a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <div
                  className={`${style.filterList} ${style.filterListTwo} ${
                    showFilter && style.filterListShow
                  } ${!lightMode && style.filterListDark}`}
                >
                  <ul className={style.filterUl}>
                    <li
                      className={style.filter}
                      onClick={() => {
                        setFilteredType("Top Rated");
                        setShowFilter(false);
                      }}
                    >
                      Top Rated
                    </li>
                    <li
                      className={style.filter}
                      onClick={() => {
                        setFilteredType("Trending");
                        setShowFilter(false);
                      }}
                    >
                      Trending
                    </li>
                    <li
                      className={style.filter}
                      onClick={() => {
                        setFilteredType("Latest");
                        setShowFilter(false);
                      }}
                    >
                      Latest
                    </li>
                    <li
                      className={style.filter}
                      onClick={() => {
                        setFilteredType("Default");
                        setShowFilter(false);
                      }}
                    >
                      Default
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div
                className={style.RightCat}
                style={{ borderBottom: !lightMode && "1px solid #85888d6f" }}
              >
                <h3 style={{ color: !lightMode && "#fff" }}>Sorted by:</h3>
                <p
                  className={style.sortClass}
                  style={{
                    width: "7em",
                    display: "grid",
                    placeContent: "center",
                    whiteSpace: "nowrap",
                    textAlign: "center",
                    background: !lightMode && "#ebebeb15",
                    color: !lightMode && "#fff",
                  }}
                >
                  {filteredType}
                </p>
              </div>
            )}
          </div>
        </section>
        {searchValue && (
          <div
            className={style.middle}
            style={{
              marginBottom: ".5em",
            }}
          >
            <h2 style={{ color: !lightMode && "#fff" }}>Showing Results for</h2>
            <h2 style={{ color: !lightMode && "#fff" }}>
              &quot;{searchValue}&quot;
            </h2>
          </div>
        )}
        {genre && !searchValue && (
          <div
            className={style.middle}
            style={{
              marginBottom: ".5em",
            }}
          >
            <h2 style={{ color: !lightMode && "#fff" }}>Genre</h2>
            <h2 style={{ color: !lightMode && "#fff" }}>&quot;{genre}&quot;</h2>
          </div>
        )}
        {isLoading ? (
          <div ref={animationContainer} id="animationWindow" />
        ) : notFound ? (
          <div
            style={{
              textAlign: "center",
              color: !lightMode ? "#fff" : "#000",
              height: !mobile ? "70vh" : "50vh",
              display: "grid",
              placeContent: "center",
              fontSize: "20px",
            }}
          >
            {" "}
            <dotlottie-player
              src="https://lottie.host/a1d6e94d-b2bd-4a7d-9529-55d0e08b014b/e6QbYU4gAC.json"
              background="transparent"
              speed="1"
              style={{ height: "300px" }}
              loop
              autoplay
            ></dotlottie-player>
            <h2>Nothing found</h2>
          </div>
        ) : filteredItems.length > 0 ? (
          <section className={style.Lists}>
            {filteredItems.map((item) => (
              <div
                className={style.movieBox}
                key={item.id}
                onClick={() => {
                  navigate.push("/details");
                  setSelectedMovie(item);
                }}
                title={item.title || item.name}
              >
                <div className={style.thumbnail}>
                  <Image
                    src={item.poster_path || item.images.jpg.image_url}
                    alt={`Poster for ${item.title}`}
                    width={110}
                    height={165}
                    className={style.movieImage}
                  />
                </div>
                <div className={style.rates}></div>
              </div>
            ))}
          </section>
        ) : (
          <>
            {cat === 0 && renderList(movies)}
            {cat === 1 && renderList(series)}
            {cat === 2 && renderList(anime)}
            {cat === 3 && renderList(cartoon)}
          </>
        )}
      </div>
      {mobile && <Navigation />}
    </section>
  );
};

export default Page;
