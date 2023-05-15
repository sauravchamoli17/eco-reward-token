import React from "react";
import styles from "@/styles/Navbar.module.css";
import { FaGithub } from "react-icons/fa";

export default function Navbar() {
  const handleClick = (e) => {
    const link = e.target.getAttribute("name");
    if (link === "github")
      window.open("https://github.com/sauravchamoli17/eco-reward-token", "_blank");
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <h1>ECO-ERC20</h1>
      </div>
      <ul className={styles.links}>
        <li onClick={handleClick} name="github">
          <FaGithub className={styles.icons} />
        </li>
      </ul>
    </div>
  );
}
