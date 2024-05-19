"use client";
import { movieContext } from "@/context/Context";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

function Navigation() {
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

  const navigate = useRouter();
  const path = usePathname();
  useEffect(() => {
    const list = document.querySelectorAll(".list");
    function activeLink(event) {
      list.forEach((item) => item.classList.remove("active"));
      event.currentTarget.classList.add("active");
    }
    list.forEach((item) => item.addEventListener("click", activeLink));

    // // Clean up event listeners on component unmount
    // return () => {
    //   list.forEach((item) => item.removeEventListener("click", activeLink));
    // };
  }, []);
  return (
    <div className="navigation">
      <ul>
        <li
          className={`list ${
            path === "/" ||
            path === "/kids" ||
            path === "/movies" ||
            path === "/tvshows"
              ? "active"
              : ""
          }`}
          onClick={() => {
            navigate.push("/");
          }}
        >
          <a href="#">
            <span className="icon">
              <i
                style={{
                  color: lightMode && "#000",
                }}
                className="fa fa-home"
                aria-hidden="true"
              ></i>{" "}
            </span>
            <span
              className="text"
              style={{
                color: lightMode && "#000",
              }}
            >
              Home
            </span>
          </a>
        </li>
        <li
          className={`list ${path === "/search" && "active"}`}
          onClick={() => {
            navigate.push("/search");
          }}
        >
          <a href="#">
            <span className="icon">
              <i
                style={{
                  color: lightMode && "#000",
                }}
                className="fa fa-search"
                aria-hidden="true"
              ></i>{" "}
            </span>
            <span
              className="text"
              style={{
                color: lightMode && "#000",
              }}
            >
              Search
            </span>
          </a>
        </li>
        <li className={`list`}>
          <a href="#">
            <span className="icon">
              <i
                style={{
                  color: lightMode && "#000",
                }}
                className="fa fa-user"
                aria-hidden="true"
              ></i>{" "}
            </span>
            <span className="text" 
                style={{
                  color: lightMode && "#000",
                }}>Profile</span>
          </a>
        </li>
        <li
          className={`list ${path === "/watchlist" && "active"}`}
          onClick={() => {
            navigate.push("/watchlist");
          }}
        >
          <a href="#">
            <span className="icon">
              <i
                style={{
                  color: lightMode && "#000",
                }}
                className="fa fa-bookmark"
                aria-hidden="true"
              ></i>{" "}
            </span>
            <span className="text" 
                style={{
                  color: lightMode && "#000",
                }}>Watchlist</span>
          </a>
        </li>
        <li className={`list`}>
          <a href="#">
            <span className="icon">
              <i
                style={{
                  color: lightMode && "#000",
                }}
                className="fa fa-gear"
                aria-hidden="true"
              ></i>{" "}
            </span>
            <span className="text" 
                style={{
                  color: lightMode && "#000",
                }}>Settings</span>
          </a>
        </li>
        <div className="indicator"></div>
      </ul>
    </div>
  );
}

export default Navigation;
