import React, { useEffect } from "react";
import styles from "@/styles/Transactions.module.css";
import { GoLinkExternal } from "react-icons/go";
import { useWalletContext } from "context/walletContext";
import {
  contractAddress,
  eventColor,
  formatAddress,
  getEventMessage,
} from "@/helpers/constants";
import moment from "moment";

export default function Transactions() {
  const { events } = useWalletContext();

  return (
    <div className={styles.container}>
      <h2 id="heading">Transaction Logs</h2>
      <div className={styles.content}>
        {events.map((event) => (
          <Transaction key={event._id} event={event} />
        ))}
      </div>
      <a
        href={`https://mumbai.polygonscan.com/address/${contractAddress}`}
        target="_blank"
        rel="noreferrer"
        className={styles.contract}
      >
        View Smart Contract on Polygonscan
        <GoLinkExternal />
      </a>
    </div>
  );
}

function Transaction({ event }) {
  return (
    <div
      onClick={() =>
        window.open(`https://mumbai.polygonscan.com/tx/${event.hash}`, "_blank")
      }
      className={styles.block}
    >
      <p className={styles.action}>
        {formatAddress(event.from)}{" "}
        <span
          style={{ color: eventColor[event.method] }}
          className={styles.method}
        >
          {event.method}ed
        </span>{" "}
        {getEventMessage(event.method, event.amount, event.to)}{" "}
        <span className={styles.timestamp}>
          {moment(event.createdAt).startOf("minute").fromNow()}
        </span>
      </p>
      <p className={styles.link}>
        View on Block Explorer
        <GoLinkExternal />
      </p>
    </div>
  );
}
