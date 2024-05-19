// "use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./Navbar.module.css";
import { movieContext } from "@/context/Context";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useMediaQuery from "../UseMediaQuery";
import Image from "next/image";

function Navbar() {
  const pathname = usePathname();
  const navigate = useRouter();
  const mobile = useMediaQuery("(max-width:500px)");
  ("(max-width: 499px)");

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
  ] = useContext(movieContext);

  useEffect(() => {
    setActiveNavLink(storedNavLink);
  }, [storedNavLink]);

  return (
    <>
      <nav
        className={style.nav}
        style={{ color: lightMode ? "black" : "#fff" }}
      >
        {mobile && (
          <div className="menu">
            <label class="hamburger">
              <input type="checkbox" />
              <svg viewBox="0 0 32 32">
                <path
                  class="line line-top-bottom"
                  fill={lightMode && "#000"}
                  d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                ></path>
                <path class="line" d="M7 16 27 16"></path>
              </svg>
            </label>
            <div className="mobile-menu"></div>
          </div>
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
          {
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
          }
          <div
            className={style.account}
            onClick={() => {
              setShowProfile(true);
            }}
            title="account"
          >
            <div className={style.profile}>
              <img src={"/images/wallpaperflare.com_wallpaper (16).jpg"} />
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`${style.profileData} ${showProfile && style.showProfile}`}
        style={{
          backgroundColor: lightMode ? "#efefeffd" : "#0d0c0c",
          color: lightMode ? "#000" : "#d3d5db",
          display: "none",
        }}
        // onClick={() => setShowProfile(false)}
      >
        <div className={style.header}>
          <h1>My Profile</h1>

          <div
            className={style.edit}
            style={{
              border: !lightMode && "1px solid #62636450",
              // color: !lightMode && "#626364",
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
              <img src={"/images/wallpaperflare.com_wallpaper (16).jpg"} />
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
        {/* <hr /> */}
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
            // height: "11em",
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
      </div>
    </>
  );
}

export default Navbar;
