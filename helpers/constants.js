import abi from "./abi.json";

export const contractABI = abi.abi;
export const contractAddress = "0x998978086d539464a533C4dF91F462E0E29e36D1";

export function formatAddress(address) {
  return address.slice(0, 6) + "...." + address.slice(-4);
}

export const eventColor = {
  Mint: "#07931D",
  Transfer: "#0980C2",
  Burn: "#C71111",
};

export const getEventMessage = (method, amount, to) => {
  const eventMsg = {
    Mint: `${amount} ECO Tokens from Smart Contract`,
    Transfer: `${amount} ECO Token to ${formatAddress(to)}`,
    Burn: "1 ECO Token from wallet",
  };

  return eventMsg[method];
};

export const getSecretMessage = () => {
  const secrets = [
    "Together, we can make a difference for our planet.",
    "Small actions today can create a sustainable future.",
    "Every eco-friendly choice counts in preserving our environment.",
    "Let's unite for a greener and cleaner world.",
    "Sustainability is the key to a brighter tomorrow.",
    "Join us in building a sustainable future for generations to come.",
    "Be the change you wish to see in the world—choose eco-consciousness.",
    "Together, we can create a positive impact on our planet.",
    "Embrace sustainable practices and inspire others to do the same.",
    "By working together, we can protect and preserve our natural resources.",
  ];

  return secrets[Math.floor(Math.random() * secrets.length)];
};
