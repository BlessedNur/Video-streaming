"use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./page.module.css";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Navbar from "@/components/Navbar/Navbar";
import { useRouter } from "next/navigation";
import { movieContext } from "@/context/Context";
import useMediaQuery from "@/components/UseMediaQuery";
function Page() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    errorUsername: "",
    errorEmail: "",
    errorPassword: "",
  });
  const router = useRouter();
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

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!username) {
      setErrorMessage((prev) => ({
        ...prev,
        errorUsername: "Username is required",
      }));
      valid = false;
    } else {
      setErrorMessage((prev) => ({ ...prev, errorUsername: "" }));
    }

    if (!email || !validateEmail(email)) {
      setErrorMessage((prev) => ({
        ...prev,
        errorEmail: "Valid email is required",
      }));
      valid = false;
    } else {
      setErrorMessage((prev) => ({ ...prev, errorEmail: "" }));
    }

    if (password !== cPassword) {
      setErrorMessage((prev) => ({
        ...prev,
        errorPassword: "Passwords do not match",
      }));
      valid = false;
    } else {
      setErrorMessage((prev) => ({ ...prev, errorPassword: "" }));
    }

    if (!valid) return;

    // try {
    //   const res = await fetch("/myapi/auth/register", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       username,
    //       email,
    //       password,
    //     }),
    //   });
    //   if (res.status === 400) {
    //     alert("User already exists");
    //   } else if (res.status === 201) {
    //     alert("Account created");
    //     router.push("/signin?success=Account has been created");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const desktop = useMediaQuery("(min-width:500px)");

  return (
    // <section className={style.signup}>
    <>
      {!desktop && <Navbar />}
      {!desktop ? (
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.intro}>
            <h1
              style={{
                fontSize: "20px",
              }}
            >
              Get started with quanMovies
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
            </svg>
            <p>Sign up with Google</p>
          </button>
          <div className={style.Or}>
            <h2>Or</h2>
            <hr />
          </div>
          <div className={style.holders}>
            <label
              htmlFor=""
              style={{
                color: errorMessage.errorUsername && "#c00",
              }}
            >
              Username
            </label>
            <input
              style={{
                outline: errorMessage.errorUsername && " 2px solid #c00",
              }}
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
            <p className={style.error}>{errorMessage.errorUsername}</p>
          </div>
          <div className={style.holders}>
            <label
              htmlFor=""
              style={{
                color: errorMessage.errorEmail && "#c00",
              }}
            >
              Email Address
            </label>
            <input
              style={{
                outline: errorMessage.errorEmail && " 2px solid #c00",
              }}
              type="email"
              name="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className={style.error}>{errorMessage.errorEmail}</p>
          </div>

          <div className={style.holders}>
            <label
              htmlFor=""
              style={{
                color: errorMessage.errorPassword && "#c00",
              }}
            >
              Password
            </label>
            <input
              style={{
                outline: errorMessage.errorPassword && " 2px solid #c00",
              }}
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i
              class={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              aria-hidden="true"
              onClick={() =>
                showPassword ? setShowPassword(false) : setShowPassword(true)
              }
            ></i>
          </div>
          <div className={style.holders}>
            <label
              htmlFor=""
              style={{
                color: errorMessage.errorPassword && "#c00",
              }}
            >
              Confirm password
            </label>
            <input
              style={{
                outline: errorMessage.errorPassword && " 2px solid #c00",
              }}
              type={showCPassword ? "text" : "password"}
              name="confirm password"
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
            <i
              class={`fa ${showCPassword ? "fa-eye-slash" : "fa-eye"}`}
              aria-hidden="true"
              onClick={() =>
                showCPassword ? setShowCPassword(false) : setShowCPassword(true)
              }
            ></i>
            <p className={style.error}>{errorMessage.errorPassword}</p>
          </div>

          <button className={style.registerBtn}>Sign up</button>
          <p style={{ margin: "0 auto",display:"flex",alignItems:"center",gap:".3em" }}>
            <p>Already have an account?</p>
            <Link href={"/signin"}>Login</Link>
          </p>
        </form>
      ) : (
        <section className={style.mainForm}>
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
              </svg>
              <p>Sign up with Google</p>
            </button>
            <h2>Or</h2>
            <div className={style.holders}>
              <label htmlFor="">Username</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
              />
            </div>
            <div className={style.holders}>
              <label htmlFor="">Email Address</label>
              <input
                type="email"
                name="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={style.holders}>
              <label htmlFor="">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                class={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                aria-hidden="true"
                onClick={() =>
                  showPassword ? setShowPassword(false) : setShowPassword(true)
                }
              ></i>
            </div>
            <div className={style.holders}>
              <label htmlFor="">Confirm password</label>
              <input
                type={showCPassword ? "text" : "password"}
                name="confirm password"
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
              <i
                class={`fa ${showCPassword ? "fa-eye-slash" : "fa-eye"}`}
                aria-hidden="true"
                onClick={() =>
                  showCPassword
                    ? setShowCPassword(false)
                    : setShowCPassword(true)
                }
              ></i>
            </div>
            <button className={style.registerBtn}>Sign up</button>
            <p style={{ margin: "0 auto",display:"flex",alignItems:"center",gap:".3em" }}>
              <p>Already have an account?</p>
              <Link href={"/signin"}>Login</Link>
            </p>
          </form>
        </section>
      )}
    </>
    // </section>
  );
}

export default Page;
