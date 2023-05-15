import React, { useState } from "react";
import styles from "@/styles/BurnToken.module.css";
import { useWalletContext } from "context/walletContext";
import { toast } from "react-toastify";
import { ethers } from "ethers";

export default function BurnToken() {
  const [message, setMessage] = useState("");
  const [isCalling, setIsCalling] = useState(false);
  const {
    createEthereumContract,
    getContractStates,
    contractState,
    getEventsAndMinters,
    accountRef,
    setModal,
  } = useWalletContext();

  const handleBurn = async () => {
    setMessage("");

    if (!accountRef.current) {
      toast.info("You need to install Metamask.");
      return;
    }

    if (!contractState.myBalance) {
      toast.info("You dont have any token to burn.");
      return;
    }

    const contractMethods = createEthereumContract();

    try {
      setIsCalling(true);
      const txn = await contractMethods.burn(ethers.utils.parseEther("1"));

      const tempObj = {
        show: true,
        method: "Burn",
        loading: true,
        txn: txn.hash,
      };

      setModal(tempObj);

      await txn.wait();

      setModal({
        ...tempObj,
        loading: false,
      });

      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/transaction`, {
        method: "PATCH",
        body: JSON.stringify({
          to: txn.to,
          amount: parseInt(1),
          hash: txn.hash,
          from: txn.from,
          method: "Burn",
        }),
      });

      const msg = await res.json();

      console.log(msg);

      getEventsAndMinters();
      getContractStates();
      setIsCalling(false);
      setMessage(msg.message);
    } catch (error) {
      console.log(error);
      setIsCalling(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 id="heading">Secret Message</h2>

      {message ? (
        <div className={styles.message}>
          <p>“{message}”</p>
          <button disabled={isCalling} onClick={handleBurn} id={styles.burn}>
            Burn more
          </button>
        </div>
      ) : (
        <div
          style={{ pointerEvents: isCalling ? "none" : "" }}
          onClick={handleBurn}
          className={styles.content}
        >
          <p>
            Click on the area to{" "}
            <span id={styles.action}>Burn 1 ECO Token</span> to see the message
          </p>
        </div>
      )}
    </div>
  );
}
