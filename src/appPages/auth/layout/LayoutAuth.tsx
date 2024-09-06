"use client";
import { FC, ReactNode } from "react";
import scss from "./LayoutAuth.module.scss";

interface LayoutAuthProps {
  children: ReactNode;
}

const LayoutAuth: FC<LayoutAuthProps> = ({ children }) => {
  return (
    <>
      <div className={scss.LayoutAuth}>
        <main>{children}</main>
      </div>
    </>
  );
};

export default LayoutAuth;
