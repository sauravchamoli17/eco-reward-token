import React, { useState } from "react";
import styles from "@/styles/TransactionComponent.module.css";
import { GoLinkExternal } from "react-icons/go";
import { useWalletContext } from "context/walletContext";
import { ethers } from "ethers";
import { formatAddress } from "@/helpers/constants";
import { toast } from "react-toastify";
import Copy from "./Copy";

export default function TransactionComponent() {
  const [mode, setMode] = useState("mint");
  const [mintAmount, setMintAmount] = useState(0);
  const [isCalling, setIsCalling] = useState(false);
  const {
    createEthereumContract,
    contractState,
    getEventsAndMinters,
    getContractStates,
    setModal,
  } = useWalletContext();

  const handleChange = (e) => {
    if (e.target.value < 0) return;
    if (e.target.value > 150) return;
    setMintAmount(parseInt(e.target.value));
  };

  const handleDecrement = () => {
    if (mintAmount == 0) return;
    setMintAmount(mintAmount - 1);
  };

  const handleIncrement = () => {
    if (mintAmount + 1 > 150) return;
    setMintAmount(mintAmount + 1);
  };

  const handleMint = async (e) => {
    e.preventDefault();
    if (mintAmount == 0) return;

    const contractMethods = createEthereumContract();

    const options = {
      value: ethers.utils.parseEther(
        (mintAmount * contractState.tokenPrice).toString()
      ),
    };

    try {
      setIsCalling(true);
      const txn = await contractMethods.mint(
        ethers.utils.parseEther(mintAmount.toString()),
        options
      );

      const tempObj = {
        show: true,
        method: "Mint",
        loading: true,
        txn: txn.hash,
      };

      setModal(tempObj);

      await txn.wait();

      setModal({
        ...tempObj,
        loading: false,
      });

      await fetch(`${process.env.NEXT_PUBLIC_HOST}/transaction`, {
        method: "PATCH",
        body: JSON.stringify({
          to: txn.to,
          amount: parseInt(mintAmount),
          hash: txn.hash,
          from: txn.from,
          method: "Mint",
        }),
      });

      getEventsAndMinters();
      getContractStates();
      setIsCalling(false);
    } catch (error) {
      console.log(error);
      setIsCalling(false);
    }
  };

  let ether = (mintAmount * contractState.tokenPrice).toFixed(3);

  if (mode === "transfer") return <TransferForm setMode={setMode} />;

  return (
    <form onSubmit={handleMint} className={styles.container}>
      <div className={styles.header}>
        <span className={styles.selected}>Mint</span>
        <span onClick={() => setMode("transfer")}>Transfer</span>
        <a
          href="https://mumbaifaucet.com/"
          target="_blank"
          rel="noreferrer"
          id={styles.faucet}
        >
          Mumbai Faucet <GoLinkExternal />
        </a>
      </div>
      <div className={styles.mint}>
        <p>1 ECO Token = {contractState.tokenPrice} Mumbai Polygon Matic</p>
        <div className={styles.input}>
          <button onClick={handleDecrement} type="button">
            -
          </button>
          <input
            type="number"
            placeholder="Number of tokens"
            value={mintAmount}
            onChange={handleChange}
          />
          <button onClick={handleIncrement} type="button">
            +
          </button>
        </div>
        <p>{ether} Polygon Mumbai Matic</p>
      </div>

      <button disabled={isCalling} type="submit" className={styles.submitBtn}>
        Mint ECO
      </button>
    </form>
  );
}

function TransferForm({ setMode }) {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState();
  const {
    createEthereumContract,
    getContractStates,
    getEventsAndMinters,
    accountRef,
    setModal,
  } = useWalletContext();

  const [isCalling, setIsCalling] = useState(false);

  const handleChange = (e) => {
    if (e.target.value < 0) return;
    setAmount(e.target.value);
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (amount == 0) {
      toast.info("Amount cannot be 0");
      return;
    }

    const contractMethods = createEthereumContract();

    try {
      setIsCalling(true);

      const txn = await contractMethods.transfer(
        to,
        ethers.utils.parseEther(amount.toString())
      );

      const tempObj = {
        show: true,
        method: "Transfer",
        loading: true,
        txn: txn.hash,
      };

      setModal(tempObj);

      await txn.wait();

      setModal({
        ...tempObj,
        loading: false,
      });

      await fetch(`http://localhost:3000/api/transaction`, {
        method: "PATCH",
        body: JSON.stringify({
          to: to,
          amount: parseInt(amount),
          hash: txn.hash,
          from: txn.from,
          method: "Transfer",
        }),
      });

      getEventsAndMinters();
      getContractStates();
      setIsCalling(false);
    } catch (error) {
      if (error.reason === "invalid address") toast.info("Invalid Address");
      else if (
        error.reason ===
        "execution reverted: ERC20: transfer amount exceeds balance"
      )
        toast.info("Transfer amount exceeds balance");
      else toast.error(error.reason);
      setIsCalling(false);
    }
  };

  return (
    <form onSubmit={handleTransfer} className={styles.container}>
      <div className={styles.header}>
        <span onClick={() => setMode("mint")}>Mint</span>
        <span className={styles.selected}>Transfer</span>
        <a
          href="https://mumbaifaucet.com/"
          target="_blank"
          rel="noreferrer"
          id={styles.faucet}
        >
          Mumbai Faucet
          <GoLinkExternal />
        </a>
      </div>
      <div className={styles.transfer}>
        <p className="address">
          From {formatAddress(accountRef.current)}{" "}
          <Copy address={accountRef.current} />{" "}
        </p>
        <input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          type="text"
          placeholder="To"
        />
        <input
          value={amount}
          onChange={handleChange}
          min="0"
          type="number"
          placeholder="Number of tokens"
        />
      </div>

      <button disabled={isCalling} type="submit" className={styles.submitBtn}>
        Transfer ECO
      </button>
    </form>
  );
}
