"use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./Banner.module.css";
import Image from "next/image";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { movieContext } from "@/context/Context";
import { usePathname, useRouter } from "next/navigation";

function Banner({ bannerWidth }) {
  const [itemActive, setItemActive] = useState(0);
  const [movies, setMovies] = useState([]);
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
  const path = usePathname();
  const navigate = useRouter();

  return (
    <div
      className={style.slider}
      style={{
        maxWidth: bannerWidth,
      }}
    >
      <div
        className={`${style.list} ${lightMode ? style.Light : style.Dark}`}
        key={selectedMovie.id}
      >
        <Image
          src={
            selectedMovie.backdrop_path ||
            selectedMovie.images.jpg.large_image_url
          }
          alt={selectedMovie.title || selectedMovie.name}
          width={1000}
          height={1000}
          className={style.movieImage}
        />
        <div className={style.content}></div>
      </div>
    </div>
  );
}

export default Banner;
