"use client";
import React, { useContext, useState } from "react";
import style from "./page.module.css";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Navbar from "@/components/Navbar/Navbar";
import { useRouter } from "next/navigation";
import { movieContext } from "@/context/Context";
function Page() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    errorUsername: "",
    errorEmail: "",
  });
  const navigate = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const { data: session } = useSession();

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

  console.log(session);
  console.log(currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, email, password);
    try {
      const res = await fetch("/myapi/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      console.log(res.status);
      if (res.status === 400) {
        alert("user already exits");
      } else if (res.status === 201) {
        // navigation.push("/signin?success=Account has been created");
        alert("acoount created");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    // <section className={style.signup}>
    <>
      <Navbar />
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.intro}>
          <h1
            style={{
              fontSize: "20px",
            }}
          >
            Sign Up
          </h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Praesentium, pariatur?
          </p>
        </div>
        <button
          className={style.google}
          onClick={() => {
            signIn();
            if (session) {
              navigate.push("/");
              setCurrentUser(session.user);
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={"24"}
            height={"20"}
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 256 262"
            id="google"
          >
            <path
              fill="#4285F4"
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            ></path>
            <path
              fill="#34A853"
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            ></path>
            <path
              fill="#FBBC05"
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
            ></path>
            <path
              fill="#EB4335"
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            ></path>
          </svg>{" "}
          <p>Sign in with Google</p>
        </button>
        <h2>Or</h2>
        <p className={style.holders}>
          <input
            type="email"
            name="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="">Email Address</label>
        </p>
        <p className={style.holders}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="">Password</label>
          <i
            class={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
            aria-hidden="true"
            onClick={() =>
              showPassword ? setShowPassword(false) : setShowPassword(true)
            }
          ></i>
        </p>

        <button className={style.registerBtn}>Login</button>
        <p
          style={{
            margin: "0 auto",
          }}
        >
          Don't have an account?<Link href={"/signup"}>Sign up</Link>
        </p>
      </form>
    </>
    // </section>
  );
}

export default Page;
