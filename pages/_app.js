import WalletProvider from "../context/walletContext";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <WalletProvider>
      <Component {...pageProps} />
    </WalletProvider>
  );
}

export default MyApp;
