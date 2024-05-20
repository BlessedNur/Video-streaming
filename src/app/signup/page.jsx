"use client";
import React, { useState } from "react";
import style from "./page.module.css";
import Link from "next/link";
function page() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    errorUsername: "",
    errorEmail: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const handleSumbit = (e) => {
    e.preventDefault();
    console.log({
      username: username,
      email: email,
      password: password,
      cPassword: cPassword,
    });
  };
  return (
    // <section className={style.signup}>
    <form className={style.form} onSubmit={handleSumbit}>
      <div className={style.intro}>
        <h1>Sign up</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium,
          pariatur?
        </p>
      </div>
      <button>
        <i class="fa-brands fa-google" aria-hidden="true"></i>
        <p>Sign in with Google</p>
      </button>
      <h2>Or</h2>
      <p className={style.holders}>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
        />
        <label htmlFor="">Username</label>
      </p>
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
      <p className={style.holders}>
        <input
          type={showCPassword ? "text" : "password"}
          name="confirm password"
          value={cPassword}
          required
          onChange={(e) => setCPassword(e.target.value)}
        />
        <label htmlFor="">Confirm password</label>
        <i
          class={`fa ${showCPassword ? "fa-eye-slash" : "fa-eye"}`}
          aria-hidden="true"
          onClick={() =>
            showCPassword ? setShowCPassword(false) : setShowCPassword(true)
          }
        ></i>
      </p>
      <button className={style.registerBtn}>Sign up</button>
      <p>
        Already have an account?<Link href={""}>Login</Link>
      </p>
    </form>
    // </section>
  );
}

export default page;
