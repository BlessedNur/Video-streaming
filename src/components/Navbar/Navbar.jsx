// "use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./Navbar.module.css";
import { movieContext } from "@/context/Context";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useMediaQuery from "../UseMediaQuery";
import Image from "next/image";
import { useSession } from "next-auth/react";

function Navbar() {
  const pathname = usePathname();
  const navigate = useRouter();
  const mobile = useMediaQuery("(max-width:500px)");
  ("(max-width: 499px)");

  const { data: session } = useSession();
  console.log(session);
  const [countires, setCountries] = useState({
    UK: "UK",
    JAPANESE: "JAPANESE",
    FRANCE: "FRANCE",
  });
  // console.log(pathname);
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

  // setCurrentUser(session.user);
  console.log(currentUser);
  useEffect(() => {
    setActiveNavLink(storedNavLink);
  }, [storedNavLink]);

  console.log(showProfile);
  return (
    <>
      <nav
        className={style.nav}
        style={{ color: lightMode ? "black" : "#fff" }}
      >
        {mobile && (
          <>
            <div
              className={`menu  ${lightMode && "lightMenu"} `}
              style={{
                display:
                  pathname === "/signup" || pathname === "/signin"
                    ? "none"
                    : "",
              }}
            >
              <label class={`hamburger ${showProfile && "hamburgerS"}`}>
                <input
                  type="checkbox"
                  onClick={() =>
                    !showProfile ? setShowProfile(true) : setShowProfile(false)
                  }
                />
                <svg viewBox="0 0 32 32">
                  <path
                    class="line line-top-bottom"
                    d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                  ></path>
                  <path class="line" d="M7 16 27 16"></path>
                </svg>
              </label>
            </div>
            <div className={`drawer ${showProfile && "showDraw"}`}>
              <div className="topAcc">
                {currentUser && (
                  <>
                    <div className="leftTop">
                      <Image
                        onClick={() =>
                          lightMode ? setLightMode(false) : setLightMode(true)
                        }
                        src={
                          "/images/blank-profile-picture-973460_960_720.webp"
                        }
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className="rightTop">
                      <h3>{currentUser}</h3>
                    </div>
                  </>
                )}
              </div>
              <div className="feautures">
                <h1>Features</h1>
                <ul>
                  <li>
                    <Link href={""}>Movies</Link>
                  </li>
                  <li>
                    <Link href={""}>Tv shows</Link>
                  </li>
                  <li>
                    <Link href={""}>Cartoons</Link>
                  </li>
                  <li>
                    <Link href={""}>Anime</Link>
                  </li>
                </ul>
              </div>
              <div className="genresM">
                <h1>Features</h1>
                <ul>
                  <li>
                    <Link href={""}>Action</Link>
                  </li>
                  <li>
                    <Link href={""}>Tv shows</Link>
                  </li>
                  <li>
                    <Link href={""}>Cartoons</Link>
                  </li>
                  <li>
                    <Link href={""}>Anime</Link>
                  </li>
                  <li>
                    <Link href={""}>Anime</Link>
                  </li>
                  <li>
                    <Link href={""}>Anime</Link>
                  </li>
                  <li>
                    <Link href={""}>Anime</Link>
                  </li>
                </ul>
              </div>
              <div className="logs"></div>
            </div>
          </>
        )}
        <div className={style.left}>
          {mobile ? (
            <>
              <div className={style.logo}>
                <Image
                  src={"/images/New_Project__2_-removebg-preview.png"}
                  width={200}
                  height={200}
                  className={style.logoThree}
                />
              </div>
            </>
          ) : (
            <>
              <ul className={style.ul}>
                <li>
                  <Link
                    className={`${style.link} ${
                      pathname === "/" || activeNavLink === "all"
                        ? style.activeNavLink
                        : ""
                    } ${lightMode ? style.linkLight : ""}`}
                    href="/"
                    onClick={() => {
                      handleNavClick("all");
                      handleSideClick("home");
                    }}
                  >
                    All
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${style.link} ${
                      pathname === "/tvshows" || activeNavLink === "series"
                        ? style.activeNavLink
                        : ""
                    } ${lightMode ? style.linkLight : ""}`}
                    href="/tvshows"
                    onClick={() => {
                      handleNavClick("series");
                      // handleSideClick("home")
                    }}
                  >
                    Series
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${style.link} ${
                      pathname === "/movies" || activeNavLink === "movies"
                        ? style.activeNavLink
                        : ""
                    } ${lightMode ? style.linkLight : ""}`}
                    href="/movies"
                    onClick={() => {
                      handleNavClick("movies");
                    }}
                  >
                    Movies
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${style.link} ${
                      pathname === "/anime" || activeNavLink === "Anime"
                        ? style.activeNavLink
                        : ""
                    } ${lightMode ? style.linkLight : ""}`}
                    href="/anime"
                    onClick={() => {
                      handleSideClick("anime");
                      handleNavClick("Anime");
                    }}
                  >
                    Anime
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${style.link} ${
                      pathname === "/kids" || activeNavLink === "kids"
                        ? style.activeNavLink
                        : ""
                    } ${lightMode ? style.linkLight : ""}`}
                    href="/kids"
                    onClick={() => {
                      handleNavClick("kids");
                      handleSideClick("cartoons");
                    }}
                  >
                    Kids
                  </Link>
                </li>
              </ul>

              <div className={style.language}>
                <div className={style.countryIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 60 30"
                    width="35"
                    className={style.languageImage}
                    height="1000"
                  >
                    <clipPath id="s">
                      <path d="M0,0 v30 h60 v-30 z" />
                    </clipPath>
                    <clipPath id="t">
                      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
                    </clipPath>
                    <g clipPath="url(#s)">
                      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
                      <path
                        d="M0,0 L60,30 M60,0 L0,30"
                        stroke="#fff"
                        strokeWidth="6"
                      />
                      <path
                        d="M0,0 L60,30 M60,0 L0,30"
                        clipPath="url(#t)"
                        stroke="#C8102E"
                        strokeWidth="4"
                      />
                      <path
                        d="M30,0 v30 M0,15 h60"
                        stroke="#fff"
                        strokeWidth="10"
                      />
                      <path
                        d="M30,0 v30 M0,15 h60"
                        stroke="#C8102E"
                        strokeWidth="6"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </>
          )}
        </div>
        <div className={style.right}>
          {!mobile && (
            <>
              <Link
                href={"/search"}
                className={style.search}
                title="search"
                style={{ color: "inherit" }}
              >
                <i className="fa fa-search" aria-hidden="true"></i>
              </Link>
              <div className={style.bell} title="notifications">
                {mobile ? (
                  <i class="fa fa-bookmark" aria-hidden="true"></i>
                ) : (
                  <i className="fa-regular fa-bell" aria-hidden="true"></i>
                )}
              </div>
            </>
          )}
          {currentUser ? (
            <div
              className={style.account}
              onClick={() => {
                setShowProfile(true);
              }}
              title="account"
            >
              <div className={style.profile}>
                <img
                  src={
                    !session
                      ? "/images/blank-profile-picture-973460_960_720.webp"
                      : ""
                  }
                />
              </div>
            </div>
          ) : (
            <div className={style.buttons}>
              {pathname === "/signup" || pathname === "/signin" ? (
                <button
                  className={style.button1}
                  style={{
                    background: "none",
                  }}
                >
                  <i
                    style={{
                      fontSize: "20px",
                    }}
                    class="fa fa-headphones"
                    aria-hidden="true"
                  ></i>
                </button>
              ) : (
                <>
                  <button className={style.button1}>Sign Up</button>
                  <button className={style.button2}>Login</button>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
