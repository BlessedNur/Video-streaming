// "use client";
import React, { useContext, useEffect } from "react";
import style from "./Navbar.module.css";
import { movieContext } from "@/context/Context";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {

  const pathname = usePathname()
  console.log(pathname);
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

  useEffect(() => {
    setActiveNavLink(storedNavLink);
  }, [storedNavLink]);

  return (
    <nav className={style.nav} style={{ color: lightMode ? "black" : "#fff" }}>
      <div className={style.left}>
        <ul className={style.ul}>
          <li>
            <Link
              className={`${style.link} ${
               pathname === "/" || activeNavLink === "all" ? style.activeNavLink : ""
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
                pathname === "/series" || activeNavLink === "series" ? style.activeNavLink : ""
              } ${lightMode ? style.linkLight : ""}`}
              href="/"
              onClick={() => {
                handleNavClick("series");
              }}
            >
              Series
            </Link>
          </li>
          <li>
            <Link
              className={`${style.link} ${
                pathname === "/movies" || activeNavLink === "movies" ? style.activeNavLink : ""
              } ${lightMode ? style.linkLight : ""}`}
              href="/"
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
                pathname === "/anime" || activeNavLink === "Anime" ? style.activeNavLink : ""
              } ${lightMode ? style.linkLight : ""}`}
              href="/anime"
              onClick={() => {
                handleSideClick("anime")
                handleNavClick("Anime");
              }}
            >
              Anime
            </Link>
          </li>
          <li>
            <Link
              className={`${style.link} ${
                pathname === "/kids" || activeNavLink === "kids" ? style.activeNavLink : ""
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
                <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
                <path
                  d="M30,0 v30 M0,15 h60"
                  stroke="#C8102E"
                  strokeWidth="6"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className={style.right}>
        <div className={style.search}>
          <i className="fa fa-search" aria-hidden="true"></i>
        </div>
        <div className={style.bell}>
          <i className="fa-regular fa-bell" aria-hidden="true"></i>
        </div>
        <div className={style.account}>
          <div className={style.profile}></div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
