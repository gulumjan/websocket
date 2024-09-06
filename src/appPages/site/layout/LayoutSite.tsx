"use client";
import { FC, ReactNode } from "react";
import scss from "./LayoutSite.module.scss";

interface LayoutSiteProps {
  children: ReactNode;
}

const LayoutSite: FC<LayoutSiteProps> = ({ children }) => {
  return (
    <div className={scss.LayoutSite}>
      <main>{children}</main>
    </div>
  );
};

export default LayoutSite;
