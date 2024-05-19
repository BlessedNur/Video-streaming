"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Navigation() {
  const navigate = useRouter();
  const path = usePathname();
  useEffect(() => {
    const list = document.querySelectorAll(".list");
    function activeLink(event) {
      list.forEach((item) => item.classList.remove("active"));
      event.currentTarget.classList.add("active");
    }
    list.forEach((item) => item.addEventListener("click", activeLink));

    // Clean up event listeners on component unmount
    return () => {
      list.forEach((item) => item.removeEventListener("click", activeLink));
    };
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
        >
          <a href="#">
            <span className="icon">
              <i className="fa fa-home" aria-hidden="true"></i>{" "}
            </span>
            <span className="text">Home</span>
          </a>
        </li>
        <li className={`list ${path === "/search" && "active"}`}>
          <a href="#">
            <span className="icon">
              <i className="fa fa-search" aria-hidden="true"></i>{" "}
            </span>
            <span className="text">Search</span>
          </a>
        </li>
        <li className={`list`}>
          <a href="#">
            <span className="icon">
              <i className="fa fa-user" aria-hidden="true"></i>{" "}
            </span>
            <span className="text">Profile</span>
          </a>
        </li>
        <li className={`list ${path === "watchlist" && "active"}`}>
          <a href="#">
            <span className="icon">
              <i className="fa fa-bookmark" aria-hidden="true"></i>{" "}
            </span>
            <span className="text">Watchlist</span>
          </a>
        </li>
        <li className={`list`}>
          <a href="#">
            <span className="icon">
              <i className="fa fa-gear" aria-hidden="true"></i>{" "}
            </span>
            <span className="text">Settings</span>
          </a>
        </li>
        <div className="indicator"></div>
      </ul>
    </div>
  );
}

export default Navigation;
