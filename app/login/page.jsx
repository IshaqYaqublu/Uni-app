"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Login.module.css";
import { useRouter } from "next/navigation";
import { ENDPOINTS } from "@/src/api/routing";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username) {
      setUserError("Username is required.");
    }
    if (!password) {
      setPasswordError("Password is required.");
      return;
    }
    try {
      const response = await fetch(ENDPOINTS.LOGIN());
      const users = await response.json();
      const user = users.find(
        (u) =>
          u.username?.toLowerCase() === username?.toLowerCase() &&
          u.password?.toLowerCase() === password?.toLowerCase()
      );

      if (user) {
        document.cookie = `user=${JSON.stringify(user)}; path=/; max-age=86400`;
        router.push("/dashboard");
      } else {
        setError("No such user.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.container}>
      {Array.from({ length: 4 }, (_, idx) => idx + 1).map((item) => {
        return (
          <Image
            key={item}
            src={`/images/${item}.png`}
            alt="photo"
            width={245}
            height={245}
            className={styles.image}
          />
        );
      })}

      <div className={styles.loginBox}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUserError("");
              }}
            />
            {userError && <div className={styles.error}>{userError}</div>}
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
            />
            {passwordError && (
              <div className={styles.error}>{passwordError}</div>
            )}
          </div>
          <button type="submit" className={styles.loginButton}>
            Log in
          </button>
        </form>
        {error && <div className={styles.error}>{error}</div>}
        <p>
          <span> Don’t have an account? </span>
          <Link href="/register" className={styles.link}>
            Register
          </Link>
          <br />
          <span> or continue as a </span>
          <Link href="/guest" className={styles.link}>
            Guest
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
