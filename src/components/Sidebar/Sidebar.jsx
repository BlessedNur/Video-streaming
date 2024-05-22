"use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./Sidebar.module.css";
import { movieContext } from "@/context/Context";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useMediaQuery from "../UseMediaQuery";
import { signOut } from "next-auth/react";

function Sidebar() {
  const tablet = useMediaQuery("(max-width: 900px)");
  const pathname = usePathname();
  const navigate = useRouter();
  // console.log(pathname);
  const [toggleAside, setToggleAside] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [showMoreGen, setShowMoreGen] = useState(false);
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
  const [navLabels, searchNavLabels] = useState(false);

  useEffect(() => {
    setActiveSideLink(storedSideLink);
  }, [storedSideLink]);

  return (
    <aside
      className={`${style.aside} ${lightMode ? "asideLight" : "asideDark"}`}
      style={{
        width: toggleAside ? "5.5em" : "16em",
      }}
    >
      <div className={style.asideTop}>
        <div className={style.logo}>
          {!toggleAside ? (
            <Image
              src={"/images/New_Project__2_-removebg-preview.png"}
              width={200}
              height={200}
              className={style.logoTwo}
            />
          ) : (
            // <h1>QUANMOVIES</h1>
            <Image
              src={"/images/New_Project__3_-removebg-preview.png"}
              width={200}
              height={200}
              className={style.logoThree}
            />
            // <h1>Logo</h1>
          )}
        </div>
        <i
          onClick={() =>
            !toggleAside ? setToggleAside(true) : setToggleAside(false)
          }
          style={{
            cursor: "pointer",
            position: "absolute",
            right: "5px",
            top: "15px",
            height: "30px",
            width: "30px",
            display: "grid",
            placeContent: "center",
            background: "transparent",
            transition: ".3s",
            transform: toggleAside ? "rotate(180deg)" : "rotate(0)",
            display: tablet && "none",
          }}
          className={`fa fa-chevron-left show-aside ${
            toggleAside ? style.toggled : ""
          } ${lightMode && toggleAside ? style.Light : ""}`}
        ></i>
      </div>

      <ul className={style.asideUl}>
        {toggleAside ? (
          ""
        ) : (
          <h1
            style={{
              margin: ".5em 1em",
              fontWeight: "normal",
              fontSize: "14px",
              color: "#626364",
            }}
          >
            Menu
          </h1>
        )}
        {/* <li
        className={`${style.asideLi} ${
          activeSideLink === "search" ? style.activeSideLi : ""
        } ${lightMode ? "asideLiLight" : "asideLiDark"}`}
        onClick={() => handleSideClick("search")}
      >
        <i className="fa fa-search"></i>
        <Link
          href={"/"}
          className={style.asideLink}
          style={{
            visibility: toggleAside ? "hidden" : "visible",
            opacity: toggleAside ? 0 : 1,
          }}
        >
          Search
        </Link>
      </li> */}
        <Link
          href={"/search"}
          className={`${style.asideLi} ${
            pathname === "/search" || activeSideLink === "search"
              ? style.activeSideLi
              : ""
          }`}
          onClick={() => handleSideClick("search")}
        >
          <i className={`fas fa-search ${style.sideLink}`}></i>
          <div
            className={style.asideLink}
            style={{
              visibility: toggleAside ? "hidden" : "visible",
              opacity: toggleAside ? 0 : 1,
            }}
          >
            Search
          </div>
        </Link>
        <Link
          href={"/"}
          className={`${style.asideLi} ${
            pathname === "/" || activeSideLink === "home"
              ? style.activeSideLi
              : ""
          }`}
          onClick={() => {
            handleSideClick("home");
            handleNavClick("all");
          }}
        >
          <i className={`fa-solid fa-house ${style.sideLink}`}></i>{" "}
          <div
            className={style.asideLink}
            style={{
              visibility: toggleAside ? "hidden" : "visible",
              opacity: toggleAside ? 0 : 1,
            }}
          >
            Home
          </div>
        </Link>
        <Link
          href={"/anime"}
          className={`${style.asideLi} ${
            pathname === "/anime" || activeSideLink === "anime"
              ? style.activeSideLi
              : ""
          }`}
          onClick={() => {
            handleNavClick("anime");
            handleSideClick("anime");
          }}
        >
          <i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="8.5"
              style={{
                transition: ".4s",
                opacity: ".8",
              }}
              height="8.5"
              fill={!lightMode && "#626364"}
              className={`${style.svg} ${
                pathname === "/anime" || activeSideLink === "anime"
                  ? style.redIcon
                  : ""
              }`}
              viewBox="0 0 50 50"
            >
              <path d="M 26 3 C 13.85 3 4 12.85 4 25 C 4 40.188 14.370094 44.536656 21.371094 45.972656 C 21.410094 45.980656 21.448375 45.984375 21.484375 45.984375 C 21.989375 45.984375 22.188734 45.253297 21.677734 45.029297 C 14.267734 41.788297 9.0301563 34.326141 10.160156 25.494141 C 11.256156 16.920141 18.244938 10.069141 26.835938 9.1191406 C 27.564937 9.0381406 28.287 9 29 9 C 36.541 9 43.044422 13.395672 46.107422 19.763672 C 46.206422 19.968672 46.382594 20.058594 46.558594 20.058594 C 46.853594 20.058594 47.144828 19.8075 47.048828 19.4375 C 45.302828 12.7105 40 3 26 3 z M 26 5 C 32.168 5 36.419609 7.0278125 39.349609 9.7578125 C 36.241609 7.9888125 32.683 7 29 7 C 28.21 7 27.408234 7.0448125 26.615234 7.1328125 C 17.139234 8.1808125 9.3847344 15.795234 8.1777344 25.240234 C 7.5247344 30.349234 8.8466406 35.328625 11.681641 39.390625 C 7.9046406 36.080625 6 31.271 6 25 C 6 13.972 14.972 5 26 5 z M 30 14 C 21.481 14 14.619625 21.101031 15.015625 29.707031 C 15.366625 37.346031 21.653016 43.631422 29.291016 43.982422 C 29.528016 43.994422 29.766 44 30 44 C 38.285 44 45 37.285 45 29 C 45 27.819 44.860563 26.670359 44.601562 25.568359 C 44.542563 25.319359 44.332234 25.183594 44.115234 25.183594 C 43.961234 25.183594 43.806266 25.251484 43.697266 25.396484 C 42.512266 26.976484 40.627 28 38.5 28 C 38.397 28 38.293453 27.997188 38.189453 27.992188 C 35.031453 27.845188 32.348203 25.317875 32.033203 22.171875 C 31.763203 19.477875 33.142297 17.082328 35.279297 15.861328 C 35.656297 15.646328 35.62475 15.100266 35.21875 14.947266 C 33.59375 14.340266 31.838 14 30 14 z M 30 16 C 30.641 16 31.279156 16.047578 31.910156 16.142578 C 30.517156 17.858578 29.815922 20.090094 30.044922 22.371094 C 30.460922 26.521094 33.922656 29.796234 38.097656 29.990234 C 38.232656 29.996234 38.366 30 38.5 30 C 40.125 30 41.669094 29.55075 42.996094 28.71875 C 42.998094 28.81275 43 28.906 43 29 C 43 36.168 37.168 42 30 42 C 29.796 42 29.589812 41.995328 29.382812 41.986328 C 22.751812 41.681328 17.318672 36.248188 17.013672 29.617188 C 16.848672 26.023187 18.121656 22.616438 20.597656 20.023438 C 23.075656 17.429438 26.414 16 30 16 z M 45.296875 26.595703 L 45.300781 26.595703 L 45.296875 26.595703 z"></path>
            </svg>
          </i>
          <div
            className={style.asideLink}
            style={{
              visibility: toggleAside ? "hidden" : "visible",
              opacity: toggleAside ? 0 : 1,
            }}
          >
            Anime
          </div>
        </Link>

        <Link
          href={"/kids"}
          className={`${style.asideLi} ${
            pathname === "/kids" || activeSideLink === "cartoons"
              ? style.activeSideLi
              : ""
          }`}
          onClick={() => {
            handleSideClick("cartoons");
            handleNavClick("kids");
          }}
        >
          <i className={`fa fa-tv ${style.sideLink}`}></i>

          <div
            className={style.asideLink}
            style={{
              visibility: toggleAside ? "hidden" : "visible",
              opacity: toggleAside ? 0 : 1,
            }}
          >
            Cartoons
          </div>
        </Link>
        <Link
          href={""}
          className={`${style.asideLi} ${
            activeSideLink === "categories" ? style.activeSideLi : ""
          } ${style.gen}`}
          onClick={() => {
            // handleSideClick("categories");
            if (!showMore) {
              setShowMore(true);
            } else {
              setShowMore(false);
            }
            setShowMoreGen(false);
          }}
        >
          <div className={style.hold}>
            <i
              className={`fa-solid fa-list ${style.sideLink}`}
              style={{
                width: ".6em",
              }}
            ></i>{" "}
            <div
              className={style.asideLink}
              style={{
                visibility: toggleAside ? "hidden" : "visible",
                opacity: toggleAside ? 0 : 1,
              }}
            >
              Genres
            </div>
          </div>
          {showMore ? (
            <i
              className={`fa fa-chevron-up ${style.sideLink} `}
              style={{
                // transition: ".4s",
                visibility: toggleAside ? "hidden" : "visible",
                opacity: toggleAside ? 0 : 1,
              }}
            ></i>
          ) : (
            <i
              className={`fa fa-chevron-down ${style.sideLink}`}
              style={{
                visibility: toggleAside ? "hidden" : "visible",
                opacity: toggleAside ? 0 : 1,
                // transition: ".4s",
              }}
            ></i>
          )}
        </Link>
        <div
          className={`${style.categories} ${showMore ? style.catShow : ""} ${
            toggleAside ? style.catdis : ""
          }`}
          style={{
            borderLeft: lightMode ? "1px solid black" : "1px solid white",
          }}
        >
          <p
            onClick={() => {
              pathname !== "/search" && navigate.push("/search");
              //  setSearchValue("")

              setGenre("Action");
            }}
          >
            Action
          </p>
          <p
            onClick={() => {
              pathname !== "/search" && navigate.push("/search");
              setGenre("Horror");
            }}
          >
            Horror
          </p>
          <p
            onClick={() => {
              pathname !== "/search" && navigate.push("/search");
              //  setSearchValue("")

              setGenre("Drama");
            }}
          >
            Drama
          </p>
          <p
            onClick={() => {
              pathname !== "/search" && navigate.push("/search");
              //  setSearchValue("")

              setGenre("Comedy");
            }}
          >
            Comedy
          </p>
          <p
            onClick={() => {
              pathname !== "/search" && navigate.push("/search");
              //  setSearchValue("")

              setGenre("Romance");
            }}
          >
            Romance
          </p>
          <p
            onClick={() => {
              pathname !== "/search" && navigate.push("/search");
              //  setSearchValue("")

              setGenre("Mystery");
            }}
          >
            Mystery
          </p>
          <p
            onClick={() => {
              pathname !== "/search" && navigate.push("/search");
              //  setSearchValue("")

              setGenre("Fantasy");
            }}
          >
            Fantasy
          </p>
          <p
            onClick={() => {
              pathname !== "/search" && navigate.push("/search");
              //  setSearchValue("")

              setGenre("Adventure");
            }}
          >
            Adventure
          </p>
        </div>
        {/* <li
      className={`${style.asideLi} ${
        activeSideLink === "genres" ? style.activeSideLi : ""
      } ${style.gen}`}
      onClick={() => {
        handleSideClick("genres");
        if (!showMoreGen) {
          setShowMoreGen(true);
        } else {
          setShowMoreGen(false);
        }
        setShowMore(false)
      }}
    >
      <div className={style.hold}>
        <i className="fa-solid fa-book-open"></i>{" "}
        <Link
          href={"/"}
          className={style.asideLink}
          style={{
            visibility: toggleAside ? "hidden" : "visible",
            opacity: toggleAside ? 0 : 1,
          }}
        >
          Genres
        </Link>
      </div>
      {showMoreGen ? (
        <i
          className={`fa fa-chevron-up `}
         
          style={{
            visibility: toggleAside ? "hidden" : "visible",
            opacity: toggleAside ? 0 : 1, // transition: ".4s",
          }}
        ></i>
      ) : (
        <i
          className={`fa fa-chevron-down `}
         
          style={{
            // transition: ".4s",
            visibility: toggleAside ? "hidden" : "visible",
            opacity: toggleAside ? 0 : 1,
          }}
        ></i>
      )}
    </li> */}
        <Link
          href={"/watchlist"}
          className={`${style.asideLi} ${
            pathname === "/watchlist" || activeSideLink === "Watchlist"
              ? style.activeSideLi
              : ""
          }`}
          onClick={() => handleSideClick("Watchlist")}
        >
          <i class={`fa fa-bookmark ${style.sideLink}`}></i>
          <div
            href={""}
            className={style.asideLink}
            style={{
              visibility: toggleAside ? "hidden" : "visible",
              opacity: toggleAside ? 0 : 1,
            }}
          >
            Watchlist
          </div>
        </Link>
      </ul>
      <div className={style.asideBot}>
        {toggleAside ? (
          ""
        ) : (
          <h1
            style={{
              margin: ".5em 1em",
              fontWeight: "normal",
              fontSize: "14px",
              color: "#626364",
            }}
          >
            General
          </h1>
        )}
        <li className={`${style.mode}`} onClick={toggleLightMode}>
          <div className={style.lightMode}>
            {lightMode ? (
              <i
                className={`fa-regular fa-moon ${
                  lightMode ? style.rotMoon : ""
                }`}
                style={{}}
              ></i>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${style.svg} ${!lightMode ? style.svgRot : ""}`}
                width="100"
                height="10"
                viewBox="0 0 50 50"
              >
                <path
                  d="M24.984375 3.9863281 A 1.0001 1.0001 0 0 0 24 5 L 24 11 A 1.0001 1.0001 0 1 0 26 11 L 26 5 A 1.0001 1.0001 0 0 0 24.984375 3.9863281 z M 10.888672 9.890625 A 1.0001 1.0001 0 0 0 10.193359 11.607422 L 14.392578 15.806641 A 1.0001 1.0001 0 1 0 15.806641 14.392578 L 11.607422 10.193359 A 1.0001 1.0001 0 0 0 10.888672 9.890625 z M 39.080078 9.890625 A 1.0001 1.0001 0 0 0 38.392578 10.193359 L 34.193359 14.392578 A 1.0001 1.0001 0 1 0 35.607422 15.806641 L 39.806641 11.607422 A 1.0001 1.0001 0 0 0 39.080078 9.890625 z M 25 15 A 1.0001 1.0001 0 0 0 24.591797 15.082031 C 19.260044 15.307579 15 19.611572 15 25 C 15 30.533333 19.466667 35 25 35 C 30.533333 35 35 30.533333 35 25 C 35 19.612238 30.740979 15.308576 25.410156 15.082031 A 1.0001 1.0001 0 0 0 25 15 z M 25 17 C 29.466667 17 33 20.533333 33 25 C 33 29.466667 29.466667 33 25 33 C 20.533333 33 17 29.466667 17 25 C 17 20.533333 20.533333 17 25 17 z M 5 24 A 1.0001 1.0001 0 1 0 5 26 L 11 26 A 1.0001 1.0001 0 1 0 11 24 L 5 24 z M 39 24 A 1.0001 1.0001 0 1 0 39 26 L 45 26 A 1.0001 1.0001 0 1 0 45 24 L 39 24 z M 15.080078 33.890625 A 1.0001 1.0001 0 0 0 14.392578 34.193359 L 10.193359 38.392578 A 1.0001 1.0001 0 1 0 11.607422 39.806641 L 15.806641 35.607422 A 1.0001 1.0001 0 0 0 15.080078 33.890625 z M 34.888672 33.890625 A 1.0001 1.0001 0 0 0 34.193359 35.607422 L 38.392578 39.806641 A 1.0001 1.0001 0 1 0 39.806641 38.392578 L 35.607422 34.193359 A 1.0001 1.0001 0 0 0 34.888672 33.890625 z M 24.984375 37.986328 A 1.0001 1.0001 0 0 0 24 39 L 24 45 A 1.0001 1.0001 0 1 0 26 45 L 26 39 A 1.0001 1.0001 0 0 0 24.984375 37.986328 z"
                  fill={!lightMode ? "white" : ""}
                ></path>
              </svg>
            )}
          </div>
          <p
            style={{
              whiteSpace: "nowrap",
              width: "100%",
              visibility: toggleAside ? "hidden" : "visible",
              opacity: toggleAside ? 0 : 1,
              transition: ".1s",
            }}
          >
            {lightMode ? "Dark Mode" : "Light Mode"}
          </p>
        </li>
        <div
          onClick={() => {
            setCurrentUser((prev) => ({
              ...prev,
              name: "",
            }));
          navigate.push("/signup");
          }}
          className={style.signOut}
        >
          <i className="fa fa-sign-out" style={{ color: "red" }}></i>
          <p
            style={{
              whiteSpace: "nowrap",
              visibility: toggleAside ? "hidden" : "visible",
              opacity: toggleAside ? 0 : 1,
              color: "#c00",
              transition: ".1s",
            }}
          >
            Log out
          </p>
        </div>
      </div>
      
    </aside>
  );
}

export default Sidebar;
