/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "@/styles/Hero.module.css";
import TransactionComponent from "./TransactionComponent";
import { useWalletContext } from "context/walletContext";
import { formatAddress } from "@/helpers/constants";
import Copy from "./Copy";

function Hero() {
  const { accountRef, connectWallet, contractState } = useWalletContext();

  return (
    <div className={styles.container}>
      <div className={styles.blueBlob} />
      <div className={styles.redBlob} />
      <div className={styles.heading}>
        <span>
          <h1>Ethereum Request for</h1>
          <span id={styles.gradient}>
            <h1>Comments20</h1>
            <h1>ECO Token</h1>
          </span>
        </span>
        <p>
          Eco Reward Token is an ERC-20 token deployed on the Polygon Mumbai Testnet. It aims to incentivize and reward environmentally friendly activities. Each Eco token costs 0.001 MATIC, and there are a total of 1000 tokens available.
        </p>
        {!accountRef.current && (
          <button onClick={connectWallet} className="btn-hero">
            <img id="walletIcon" src="metamask-icon.svg" alt="hey" />
            Connect Wallet
          </button>
        )}
      </div>
      <div className={styles.content}>
        {accountRef.current && (
          <div className={styles.form}>
            <TransactionComponent />
          </div>
        )}
        <div className={styles.cardContainer}>
          <div id={styles.gry5} />
          <div id={styles.gry4} />
          <div id={styles.gry2} />
          <div id={styles.gry3} />
          <div id={styles.gry1} />
          <div className={styles.card}>
            <div className={styles.cardLeft}>
              <h3>Polygon</h3>
              <h2>{accountRef.current ? contractState.myBalance : 0} ECO</h2>
              <p className="address">
                {accountRef.current
                  ? formatAddress(accountRef.current)
                  : "Connect you wallet"}
                <Copy address={accountRef.current} />
              </p>
            </div>
            <div className={styles.cardRight}>
              <img src="https://mumbai.polygonscan.com/images/svg/brands/polygon.svg" width="160px" alt="polygon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
