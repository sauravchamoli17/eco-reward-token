import React from "react";
import styles from "@/styles/MintInfo.module.css";
import { useWalletContext } from "context/walletContext";

export default function MintInfo() {
  const { contractState } = useWalletContext();
  const { totalSupply, maxSupply } = contractState;

  return (
    <div className={styles.container}>
      <div className={styles.barWrapper}>
        <p className={styles.barInfo} id={styles.infoRight}>
          {totalSupply} Minted
        </p>
        <div
          className={styles.bar}
          style={{ width: (totalSupply / maxSupply) * 100 + "%" }}
        >
          {maxSupply && (
            <>
              <span id={styles.arrowUp} />
              <p id={styles.mintMsg}>{maxSupply - totalSupply} Left</p>
            </>
          )}
        </div>
        <p className={styles.barInfo} id={styles.infoLeft}>
          {maxSupply} Max Supply
        </p>
      </div>
    </div>
  );
}
