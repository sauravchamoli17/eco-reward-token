import React from "react";
import { MdContentCopy } from "react-icons/md";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

export default function Copy({ address }) {
  const handleCopy = () => {
    copy(address);
    toast.info("Address Copied!");
  };

  return address ? (
    <MdContentCopy onClick={handleCopy} className="copyIcon" />
  ) : (
    <></>
  );
}
