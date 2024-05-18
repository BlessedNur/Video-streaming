"use client";

import { usePathname } from "next/navigation";
import React, { createContext, useState, useEffect } from "react";

export const movieContext = createContext();

function Context({ children }) {
  const pathname = usePathname();
  // console.log(pathname);
  const [storedNavLink, setStoredNavLink] = useState("");
  const [storedModes, setStoredModes] = useState("");
  const [storedSideLink, setStoredSideLink] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [lightMode, setLightMode] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [filteredType, setFilteredType] = useState("Default");
  const [cat, setCat] = useState(0);
  const [genre, setGenre] = useState("");

  // const [watchlist, setWatchlist] = useState([]);

  const [watchlist, setWatchlist] = useState(() => {
    if (typeof window !== "undefined") {
      const StoredWatch = localStorage.getItem("watch");
      const watchlistArray = StoredWatch
        ? Object.values(JSON.parse(StoredWatch))
        : [];
      return Array.isArray(watchlistArray) ? watchlistArray : [];
    } else {
      return [];
    }
  });

  const [selectedMovie, setSelectedMovie] = useState(() => {
    if (typeof window !== "undefined") {
      const storedMovie = localStorage.getItem("movie");
      return storedMovie ? JSON.parse(storedMovie) : [];
    } else {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("movie", JSON.stringify(selectedMovie));
    }
  }, [selectedMovie]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("watch", JSON.stringify(watchlist));
    }
  }, [watchlist]);

  // console.log(selectedMovie);
  useEffect(() => {
    const storedMode = localStorage.getItem("mode");
    if (storedMode) {
      setLightMode(storedMode === "true");
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedMode = localStorage.getItem("mode");
      const storedNavLink = localStorage.getItem("navLink");
      const storedSideLink = localStorage.getItem("SideLink");

      setStoredModes(storedMode);
      setStoredNavLink(storedNavLink);
      setStoredSideLink(storedSideLink);
    }
  }, []);

  const handleNavClick = (index) => {
    setActiveNavLink(index);
    console.log(index);
    setStoredNavLink(index);
  };
  // localStorage.setItem("navLink", pathname);
  // localStorage.setItem("SideLink", index);

  const handleSideClick = (index) => {
    setActiveSideLink(index);
    // console.log(index);
    setStoredSideLink(index);
  };

  const toggleLightMode = () => {
    setLightMode((prevMode) => {
      const newMode = !prevMode;
      console.log("New Mode:", newMode);
      localStorage.setItem("mode", newMode);
      return newMode;
    });
  };

  const [activeNavLink, setActiveNavLink] = useState(() => {
    if (typeof window !== "undefined") {
      return storedNavLink || "all";
    }
  });

  const [activeSideLink, setActiveSideLink] = useState(() => {
    if (typeof window !== "undefined") {
      return storedSideLink || "home";
    }
  });

  return (
    <movieContext.Provider
      value={[
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
      ]}
    >
      {children}
    </movieContext.Provider>
  );
}

export default Context;
