"use client";
import React from "react";
import clsx from "clsx";
import { Rss, Sun, Moon } from "react-feather";
import Cookie from "js-cookie";

import Logo from "@/components/Logo";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./Header.module.css";
import {
  COOKIE_THEME_KEY,
  DARK_COLORS,
  DARK_TOKENS,
  LIGHT_COLORS,
  LIGHT_TOKENS,
} from "@/constants";

function Header({ theme, className, ...delegated }) {
  const [userTheme, setUserTheme] = React.useState(theme);
  function toggleTheme() {
    const nextTheme = userTheme === "light" ? "dark" : "light";
    setUserTheme(nextTheme);
    Cookie.set(COOKIE_THEME_KEY, nextTheme, {
      expires: 1000,
    });
    const nextTokens = nextTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS;
    const root = document.documentElement;
    Object.entries(nextTokens).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    root.setAttribute("data-color-theme", nextTheme);
  }
  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: "translate(2px, -2px)",
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </button>
        <button className={styles.action} onClick={toggleTheme}>
          {userTheme === "light" ? (
            <Sun size="1.5rem" />
          ) : (
            <Moon size="1.5rem" />
          )}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
