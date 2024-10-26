"use client";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import scss from "./Auth.module.scss";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const { data: session } = useSession();

  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push("/chat");
    }
  }, [session, router]);
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
