import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Web3Counter from "./components/Web3Counter";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Web3 DApp - Vite + React + Solidity</h1>

      {/* Web3 Smart Contract Counter */}
      <Web3Counter />

      {/* Local React Counter for comparison */}
      <div className="card">
        <h2>Local React Counter (for comparison)</h2>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        The top counter interacts with a Solidity smart contract on your local
        blockchain!
        <br />
        The bottom counter is just local React state.
      </p>
    </>
  );
}

export default App;
