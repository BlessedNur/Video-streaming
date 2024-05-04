"use client";
import React, { createContext, useState, useEffect } from "react";

export const movieContext = createContext();

function Context({ children }) {
  const [lightMode, setLightMode] = useState(false);
  const [storedNavLink, setStoredNavLink] = useState("");
  const [storedSideLink, setStoredSideLink] = useState("");

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

  useEffect(() => {
    setStoredNavLink(localStorage.getItem("navLink"));
  }, []);
  useEffect(() => {
    setStoredSideLink(localStorage.getItem("SideLink"));
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
        handleSideClick
      ]}
    >
      {children}{" "}
    </movieContext.Provider>
  );
}

export default Context;
