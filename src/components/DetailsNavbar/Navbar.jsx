// "use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./Navbar.module.css";
import { movieContext } from "@/context/Context";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useMediaQuery from "../UseMediaQuery";

function Navbar() {
  const pathname = usePathname();
  const navigate = useRouter();
  const mobile = useMediaQuery("(max-width:500px)")
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
        <div className={style.left}>
          {mobile && (
            <div className={`menu  ${lightMode && "lightMenu"}`}>
              <label class="hamburger">
                <input type="checkbox" />
                <svg viewBox="0 0 32 32">
                  <path
                    class="line line-top-bottom"
                    d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                  ></path>
                  <path class="line" d="M7 16 27 16"></path>
                </svg>
              </label>
              <div className="mobile-menu"></div>
            </div>
          )}
          <p>{selectedMovie.title}</p>
        </div>
        <div className={style.right}>
          {/* <Link
            href={"/search"}
            className={style.search}
            title="search"
            style={{ color: "inherit" }}
          >
            <i className="fa fa-search" aria-hidden="true"></i>
          </Link> */}
          <div className={style.bell} title="notifications">
            <i className="fa-regular fa-bell" aria-hidden="true"></i>
          </div>
          
          <div
            className={style.account}
            onClick={() => {
              setShowProfile(true);
            }}
            title="account"
          >
            <div className={style.profile}>
              <img src={"/images/blank-profile-picture-973460_960_720.webp"} />
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
      </div>
    </>
  );
}

export default Navbar;
