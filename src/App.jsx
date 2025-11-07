import {
  useAppKit,
  useAppKitAccount,
  useDisconnect,
} from "@reown/appkit/react";
import "./App.css";

export default function App() {
  const { open, close } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  console.log("user connected address", { address, isConnected });
  const { disconnect } = useDisconnect();

  return (
    <div className="container">
      {!isConnected ? (
        <>
          {" "}
          <button className="button" onClick={() => open({ view: "Connect" })}>
            <h1>Connect Wallet</h1>
          </button>
          <h1>Please connect your wallet to continue</h1>
        </>
      ) : (
        <div>
          <h1 className="connected-text">Connected Wallet Address</h1>
          <p className="address-text">{address}</p>
          <button
            className="button"
            // onClick={() => open({ view: "Disconnect" })}
            onClick={() => disconnect()}
          >
            <h1>Disconnect Wallet</h1>
          </button>
        </div>
      )}
    </div>
  );
}
