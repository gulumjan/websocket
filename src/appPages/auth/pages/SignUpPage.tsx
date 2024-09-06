"use client";
import { signIn } from "next-auth/react";
import React from "react";
import scss from "./Auth.module.scss";

const SignUpPage = () => {
  return (
    <div className={scss.auth}>
      <div className="container">
        <div className="content">
          <h1>Welcome !!!</h1>
          <button onClick={() => signIn()}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
