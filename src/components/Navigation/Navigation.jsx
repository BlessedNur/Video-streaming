"use client";
import React, { useEffect } from "react";

function Navigation() {
  useEffect(() => {
    const list = document.querySelectorAll(".list");
    function activeLink() {
      list.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
    }
    list.forEach((item) => item.addEventListener("click", activeLink));
  });
  return (
    <div class="navigation">
      <ul>
        <li class="list active">
          <a href="#">
            <span class="icon">
              <i class="fa fa-home" aria-hidden="true"></i>{" "}
            </span>
            <span class="text">Home</span>
          </a>
        </li>
        <li class="list">
          <a href="#">
            <span class="icon">
              <i class="fa fa-user" aria-hidden="true"></i>{" "}
            </span>
            <span class="text">Profile</span>
          </a>
        </li>
        <li class="list">
          <a href="#">
            <span class="icon">
              <i class="fa fa-search" aria-hidden="true"></i>{" "}
            </span>
            <span class="text">Search</span>
          </a>
        </li>
        <li class="list">
          <a href="#">
            <span class="icon">
              <i class="fa fa-bookmark" aria-hidden="true"></i>{" "}
            </span>
            <span class="text">Watchlist</span>
          </a>
        </li>
        <li class="list">
          <a href="#">
            <span class="icon">
              <i class="fa fa-book" aria-hidden="true"></i>{" "}
            </span>
            <span class="text">Settings</span>
          </a>
        </li>
        <div class="indicator"></div>
      </ul>
    </div>
  );
}

export default Navigation;
