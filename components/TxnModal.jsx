import styles from "@/styles/TxnModal.module.css";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { GoLinkExternal } from "react-icons/go";

export default function TxnModal({ modal, setModal }) {
  const [isBrowser, setIsBrowser] = useState(false);
  let text = "";

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = () => {
    if (modal.loading) return;

    setModal({ ...modal, show: false });
  };

  if (modal.method === "Burn") text = "1 ECO Burned";
  if (modal.method === "Mint") text = "Mint Sucessful";
  if (modal.method === "Transfer") text = "Transfer Sucessful";

  const modalContent = modal.show ? (
    <>
      <div onClick={handleClose} className={styles.overlay} />
      <div className={styles.container}>
        {modal?.loading ? (
          <p>Transaction Initiated</p>
        ) : (
          <p>Transaction Mined</p>
        )}
        {modal?.loading ? (
          <Loader />
        ) : (
          <>
            <BsFillCheckCircleFill className={styles.icon} />
            <p>{text}</p>
          </>
        )}
        <a
          href={`https://mumbai.polygonscan.com/tx/${modal.txn}`}
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          View on Block Explorer <GoLinkExternal />
        </a>
        {!modal?.loading && (
          <button onClick={handleClose} className={styles.close}>
            Close
          </button>
        )}
      </div>
    </>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}

function Loader() {
  return (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
