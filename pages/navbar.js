import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { useAccount } from "wagmi";
import styles from "../styles/navbar.module.css";

const Navbar = () => {
  const { address } = useAccount();
  return (
    <div className={styles.container}>
      <h2>Uber</h2>
      <div className={styles.nav}>
        <p>Ride</p>
        <p>Help</p>
        <p>More</p>
        <div>
          <ConnectButton style={{ color: "black" }} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
