// "use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./Navbar.module.css";
import { movieContext } from "@/context/Context";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function Navbar() {
  const pathname = usePathname();
  const navigate = useRouter();
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
          <p>{selectedMovie.title}</p>
        </div>
        <div className={style.right}>
          <Link
            href={"/search"}
            className={style.search}
            title="search"
            style={{ color: "inherit" }}
          >
            <i className="fa fa-search" aria-hidden="true"></i>
          </Link>
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
