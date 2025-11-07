import {
  useAppKit,
  useAppKitAccount,
  useDisconnect,
} from "@reown/appkit/react";
import { useSignMessage } from "wagmi";
import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { disconnect } = useDisconnect();

  const { signMessage, data: signature, isSuccess } = useSignMessage();

  // ✅ Track if signature was already requested
  const [hasSigned, setHasSigned] = useState(false);

  useEffect(() => {
    if (isConnected && !hasSigned && isSuccess === false) {
      signMessage({ message: `Welcome! Signing in with wallet: ${address}` });
      setHasSigned(true); // ✅ Prevent re-trigger
    }
  }, [isConnected, address, hasSigned, isSuccess, signMessage]);

  const handleDisconnect = () => {
    setHasSigned(false); // reset for next session
    disconnect();
  };

  return (
    <div className="container">
      {!isConnected ? (
        <div className="connect-wallet">
          <button className="button" onClick={() => open({ view: "Connect" })}>
            <h1>Connect Wallet</h1>
          </button>
          <h1>Please connect your wallet to continue</h1>
        </div>
      ) : (
        <div>
          <h1 className="connected-text">Connected Wallet Address</h1>
          <p className="address-text">{address}</p>

          {hasSigned && isSuccess && (
            <p className="signature-text">✅ Signature Received: {signature}</p>
          )}

          <button className="button" onClick={handleDisconnect}>
            <h1>Disconnect Wallet</h1>
          </button>
        </div>
      )}
    </div>
  );
}
