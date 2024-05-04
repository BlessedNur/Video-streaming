"use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./Sidebar.module.css";
import { movieContext } from "@/context/Context";
import Image from "next/image";
import Link from "next/link";

function Sidebar() {
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
              width={300}
              height={300}
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
          href={"/"}
          className={`${style.asideLi} ${
            activeSideLink === "home" ? style.activeSideLi : ""
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
          href={""}
          className={`${style.asideLi} ${
            activeSideLink === "trending" ? style.activeSideLi : ""
          }`}
          onClick={() => handleSideClick("trending")}
        >
          <i className={`fa fa-fire ${style.sideLink}`}></i>
          <div
            className={style.asideLink}
            style={{
              visibility: toggleAside ? "hidden" : "visible",
              opacity: toggleAside ? 0 : 1,
            }}
          >
            Trending
          </div>
        </Link>
        <Link
          href={""}
          className={`${style.asideLi} ${
            activeSideLink === "categories" ? style.activeSideLi : ""
          } ${style.gen}`}
          onClick={() => {
            handleSideClick("categories");
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
          <p>Action</p>
          <p>Horror</p>
          <p>Comedy</p>
          <p>Thriller</p>
          <p>Romance</p>
          <p>Science Fiction</p>
          <p>Fantasy</p>
          <p>Adventure</p>
          <p>Musical</p>
          <p>Drama</p>
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
          href={"/kids"}
          className={`${style.asideLi} ${
            activeSideLink === "cartoons" ? style.activeSideLi : ""
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
            activeSideLink === "Watchlist" ? style.activeSideLi : ""
          }`}
          onClick={() => handleSideClick("Watchlist")}
        >
          <i class={`fa-regular fa-heart ${style.sideLink}`}></i>
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
        <Link
          href={""}
          className={`${style.asideLi} ${
            activeSideLink === "favorites" ? style.activeSideLi : ""
          }`}
          onClick={() => handleSideClick("favorites")}
        >
          <i className={`fas fa-bookmark ${style.sideLink}`}></i>
          <div
            className={style.asideLink}
            style={{
              visibility: toggleAside ? "hidden" : "visible",
              opacity: toggleAside ? 0 : 1,
            }}
          >
            Favorites
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
        )}<li
        className={`${style.mode}`}
        onClick={() => {
          setLightMode((prevMode) => {
            const newMode = !prevMode; // toggle the mode
            localStorage.setItem("mode", newMode); // save to localStorage
            return newMode; // return the new mode value
          });
        }}
      >
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
      
        <div className={style.signOut}>
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
