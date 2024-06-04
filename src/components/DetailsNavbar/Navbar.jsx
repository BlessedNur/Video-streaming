// "use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./Navbar.module.css";
import { movieContext } from "@/context/Context";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useMediaQuery from "../UseMediaQuery";
import { useSession } from "next-auth/react";

function Navbar() {
  const pathname = usePathname();
  const navigate = useRouter();
  const mobile = useMediaQuery("(max-width:500px)");
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
    watchlist,
    setWatchlist,
    currentUser,
    setCurrentUser,
  ] = useContext(movieContext);
  const { data: session } = useSession();
  const [minipro, setMiniPro] = useState(false);
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
            <>
              <div
                className={`menu  ${lightMode && "lightMenu"} `}
                style={{
                  display:
                    pathname === "/signup" || pathname === "/signin"
                      ? "none"
                      : "",
                }}
              >
                <label class={`hamburger ${showProfile && "hamburgerS"}`}>
                  <input
                    type="checkbox"
                    onClick={() =>
                      !showProfile
                        ? setShowProfile(true)
                        : setShowProfile(false)
                    }
                  />
                  <svg viewBox="0 0 32 32">
                    <path
                      class="line line-top-bottom"
                      d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                    ></path>
                    <path class="line" d="M7 16 27 16"></path>
                  </svg>
                </label>
              </div>
              <div
                className={`drawer ${showProfile && "showDraw"}`}
                style={{
                  background: !lightMode && "#000",
                  color: !lightMode && "#fff",
                }}
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
                      <img
                        src={
                          !session
                            ? "/images/blank-profile-picture-973460_960_720.webp"
                            : `${session.user.image}`
                        }
                      />
                    </div>
                    <div className={style.info}>
                      {!currentUser.name ? (
                        <h2>Unknown</h2>
                      ) : (
                        <h2>{currentUser.name}</h2>
                      )}
                      <p style={{ color: !lightMode && "#626364" }}>
                        {/* Member since */}
                      </p>
                    </div>
                  </div>
                </div>
                {/* <hr /> */}
                <p>Personal info</p>
                <div
                  className={style.mainInfo}
                  style={{
                    border: !lightMode && "1px solid #62636450",
                    justifyContent: "space-between",
                  }}
                >
                  {/* <div className={style.personalInfo}> */}
                  <div className={style.rowOne}>
                    <div className={style.box}>
                      <h4>FirstName</h4>
                      {!currentUser.name ? (
                        <h5>Unknown</h5>
                      ) : (
                        <h5>{currentUser.name}</h5>
                      )}
                    </div>
                    <div className={style.box}>
                      <h4>Email Address</h4>
                      {!currentUser.email ? (
                        <h5>Unknown</h5>
                      ) : (
                        <h5>{currentUser.email}</h5>
                      )}
                    </div>
                    <div className={style.box}>
                      <h4>Bio</h4>
                      <h5>Uknown</h5>
                    </div>
                  </div>
                  <div className={style.rowTwo}>
                    <div className={style.box}>
                      <h4>LastName</h4>
                      <h5>Uknown</h5>
                    </div>
                    <div className={style.box}>
                      <h4>Phone</h4>
                      <h5>Uknown</h5>
                    </div>
                  </div>
                  {/* </div> */}
                </div>
                <div
                  className={style.picSection}
                  style={{
                    border: !lightMode && "1px solid #62636450",
                    // height: "11em",
                    display: "flex",
                    justifyContent: "space-between",
                    // flexDirection: "column",
                    gap: "3.5em",
                  }}
                  onClick={() =>
                    !lightMode ? setLightMode(true) : setLightMode(false)
                  }
                >
                  {lightMode ? <p>Dark Mode</p> : <p>Light Mode</p>}
                  {lightMode ? (
                    <i class="fas fa-moon    "></i>
                  ) : (
                    <i class="fas fa-sun    "></i>
                  )}
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
                    onClick={() => {
                      signOut("google");
                      setCurrentUser((prev) => ({
                        ...prev,
                        name: "",
                      }));
                      navigate.push("/signup");
                    }}
                  >
                    <div class="sign">
                      <svg
                        viewBox="0 0 512 512"
                        className={lightMode && "btnSvg"}
                      >
                        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                      </svg>
                    </div>

                    <div class={`text ${lightMode && "textx"}`}>Logout</div>
                  </button>
                </div>
              </div>
            </>
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
            onMouseOver={() => setMiniPro(true)}
            onMouseLeave={() => setMiniPro(false)}
          >
            <div className={style.profile}>
              <img
                src={
                  !session
                    ? "/images/blank-profile-picture-973460_960_720.webp"
                    : `${session.user.image}`
                }
              />
            </div>
            <div
              className={`${style.profilepop} ${minipro && style.profilePShow}`}
              style={{
                backgroundColor: lightMode && "rgba(239, 239, 239, 0.992)",
              }}
            >
              <div
                className={style.picSection}
                style={{
                  border: !lightMode && "1px solid #62636450",
                }}
              >
                <div className={style.flex}>
                  <div className={style.profilePic}>
                    <img
                      src={
                        !session
                          ? "/images/blank-profile-picture-973460_960_720.webp"
                          : `${session.user.image}`
                      }
                    />
                  </div>
                  <div className={style.info}>
                    {!currentUser.name ? (
                      <h2>Unknown</h2>
                    ) : (
                      <h2>{currentUser.name}</h2>
                    )}
                    <p style={{ color: !lightMode && "#626364" }}>
                      {/* Member since */}
                    </p>
                  </div>
                </div>
              </div>
              <p
                style={{
                  margin: "1em 0",
                }}
              >
                {session && session.user.email.slice(0, 10)}****
              </p>
              <button
                className={`Btn ${lightMode && "btn"}`}
                onClick={() => {
                  signOut("google");
                  setCurrentUser((prev) => ({
                    ...prev,
                    name: "",
                  }));
                  navigate.push("/signup");
                }}
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
      ></div>
    </>
  );
}

export default Navbar;
