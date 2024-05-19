"use client";
import React, { useContext } from "react";
import style from "./page.module.css";
import Image from "next/image";
import { movieContext } from "@/context/Context";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import { useRouter } from "next/navigation";
import useMediaQuery from "@/components/UseMediaQuery";
import Navigation from "@/components/Navigation/Navigation";

function Page() {
  const navigate = useRouter();
  const mobile = useMediaQuery("(max-width:500px)");

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

  function removeFromWatchlist(movieId) {
    // Find the index of the movie in the watchlist
    const index = watchlist.findIndex((movie) => movie.id === movieId);

    if (index !== -1) {
      const updatedWatchlist = [
        ...watchlist.slice(0, index),
        ...watchlist.slice(index + 1),
      ];

      // Update the state with the modified watchlist
      setWatchlist(updatedWatchlist);

      // Update the localStorage with the modified watchlist
      if (typeof window !== "undefined") {
        localStorage.setItem("watch", JSON.stringify(updatedWatchlist));
      }
    }
  }

  return (
    <>
      <Sidebar />
      {watchlist.length > 0 ? (
        <section
          className={style.watch}
          style={{ background: lightMode ? "#fff" : "#000" }}
        >
          <h1 style={{ color: !lightMode && "#fff" }}>Watchlist</h1>
          <section className={`${style.Lists} ${style}}`}>
            {watchlist.map((item) => (
              <div className={style.movieBox} key={item.id}>
                <div className={style.thumbnail}>
                  <Image
                    src={item.poster_path || item.images.jpg.image_url}
                    title={item.title || item.name}
                    alt={`Poster for ${item.title}`}
                    width={110}
                    height={165}
                    className={style.movieImage}
                    onClick={() => {
                      navigate.push("/details");
                      setSelectedMovie(item);
                    }}
                  />
                </div>
                <div className="tit">
                  <p>
                    {item.title.length > 20
                      ? `${
                          item.title.slice(0, 20) || item.name.slice(0, 20)
                        }...`
                      : item.title || item.name}
                  </p>

                  <div
                    className={`${style.del} ${
                      lightMode ? style.Light : style.Dark
                    }`}
                    onClick={() => removeFromWatchlist(item.id)}
                  >
                    <i className={`fa fa-trash `} aria-hidden="true"></i>
                  </div>
                  <h3
                    className={`${style.remove} ${
                      !lightMode && style.removeDark
                    }`}
                  >
                    Remove
                  </h3>
                </div>
              </div>
            ))}
          </section>
        </section>
      ) : (
        <>
          <div
            style={{
              textAlign: "center",
              color: !lightMode ? "#fff" : "#000",
              height: "100vh",
              display: "grid",
              placeContent: "center",
              fontSize: "20px",
              background: lightMode ? "#fff" : "#000",
            }}
          >
            <h1 className={style.watcher}>Watchlist</h1>
            <dotlottie-player
              src="https://lottie.host/a1d6e94d-b2bd-4a7d-9529-55d0e08b014b/e6QbYU4gAC.json"
              background="transparent"
              speed="1"
              style={{ height: "300px" }}
              loop
              autoplay
            ></dotlottie-player>
            <h2>Nothing in WatchList</h2>
          </div>
        </>
      )}
      {mobile && <Navigation/>}
    </>
  );
}

export default Page;
