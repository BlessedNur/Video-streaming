"use client";

import React, { createContext, useState, useEffect } from "react";

export const movieContext = createContext();

function Context({ children }) {
  const [storedNavLink, setStoredNavLink] = useState("");
  const [storedModes, setStoredModes] = useState("");
  const [storedSideLink, setStoredSideLink] = useState("");

  const [lightMode, setLightMode] = useState(false);

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
    localStorage.setItem("navLink", index);
    console.log(index);
    setStoredNavLink(index);
  };

  const handleSideClick = (index) => {
    setActiveSideLink(index);
    localStorage.setItem("SideLink", index);
    console.log(index);
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
      ]}
    >
      {children}
    </movieContext.Provider>
  );
}

export default Context;
