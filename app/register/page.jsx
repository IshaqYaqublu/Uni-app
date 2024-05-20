"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Register.module.css";
import { ENDPOINTS } from "@/src/api/routing";

const Register = () => {
  const [username, setUsername] = useState("");
  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const images = [
    "/images/1.png",
    "/images/2.png",
    "/images/3.png",
    "/images/4.png",
  ];

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username) {
      setUserError("Username is required.");
      return;
    }
    if (!password) {
      setPasswordError("Password is required.");
      return;
    }

    try {
      const response = await fetch(ENDPOINTS.REGISTER(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setSuccess("User successfully created");
      } else {
        setError("Failed to register. Please try again later.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.container}>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt="photo"
          width={245}
          height={245}
          className={styles.image}
        />
      ))}
      <div className={styles.registerBox}>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
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
          <button type="submit" className={styles.registerButton}>
            Log in
          </button>
        </form>
        {!success && error && <div className={styles.error}>{error}</div>}
        {!error && success && <div className={styles.success}>{success}</div>}
        <p>
          <span> Have an account?</span>
          <Link href="/login" className={styles.link}>
            Login
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

export default Register;
