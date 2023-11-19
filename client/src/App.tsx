import React, { useState, useEffect } from "react";
import "./App.css";
import { ZkBobClient, TxType } from "zkbob-client-js";
import { ZkClientProvider } from "./Context/ZkClient";
import { Auth } from "./Components/Auth";
import { ShieldedAddressGenerator } from "./Components/ShieldedAddressGenerator";
import { PasswordInput } from "./utils/keyManagement";
import { InfoList } from "./Components/InfoList";
import DirectDeposit from "./Components/DirectDeposit";
import Swap from "./swap/Swap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ethers } from "ethers";

import styled from "styled-components";

const Page = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
`;

const Button = styled.button`
  position: absolute;
  top: 82%;
  left: 46%;
  transform: translate(-50%, -50%);
  background-color: #9370db;
  color: black;
  font-size: 10px;
  margin: 1em;

  border: none;
  border-radius: 10px;
  height: 6vh;
  width: 30vw;
  text-align: center;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: 750;
  div {
    margin-left: 0.2rem;
  }
`;
const Encadre = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 45vh;
  width: 40vw;
  border: none;
  border-radius: 10px;
  box-shadow: 5px 10px 180px #9370db, 5px 10px 180px #dda0dd;
`;
const Transfer = styled.div`
  position: absolute;
  left: 9%;
  top: 6%;
  font-size: 15px;
  font-weight: bold;
`;
const Es = styled.div`
  position: absolute;
  left: 9%;
  top: 15%;
  font-size: 9px;
`;
const Cadrehaut = styled.div`
  position: absolute;
  top: 0%;
  left: 0%;
  height: 8vh;
  width: 100vw;
  border: none;
  border-radius: 10px;
  box-shadow: 5px 10px 180px #9370db, 5px 10px 180px #dda0dd;
  position: relative;
  & .transfert {
    position: absolute;
    top: 30%;
    left: 25%;
    font-size: 13px;
  }
  & .Withdraw {
    position: absolute;
    top: 30%;
    left: 43%;
    font-size: 13px;
  }
  & .Litepaper {
    position: absolute;
    top: 30%;
    left: 65%;
    font-size: 13px;
  }
`;
const From = styled.input`
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 7vh;
  width: 33vw;
  border: none;
  border-radius: 10px;
  background-color: #e7e7e7;
  font-size: 15px;
  padding-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
`;
const To = styled.input`
  position: absolute;
  top: 62%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 7vh;
  width: 33vw;
  border: none;
  border-radius: 10px;
  background-color: #e7e7e7;
  font-size: 15px;
  padding-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TxHash = styled.div`
  position: absolute;
  top: 72%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: gray;
`;
const Tx = styled.div`
  position: absolute;
  top: 76%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10px;
  color: gray;
`;
const Quote = styled.div`
  position: absolute;
  top: 62%;
  left: 20%;
  transform: translate(-50%, -50%);
  font-size: 15px;
  font-weight: 500;
`;
const Matic = styled.div`
  position: absolute;
  top: 35%;
  left: 80%;
  transform: translate(-50%, -50%);
  font-size: 15px;
`;
const Eth = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 15px;
`;
const ZkAdd = styled.div`
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 8px;
  color: gray;
`;
const Arrow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 15px;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  position: absolute;
  top: 35%;
  left: 77%;
  transform: translate(-50%, -50%);
`;

const DropdownButton = styled.button`
  background-color: #9370db;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  color: black;
  font-size: 10px;
  border: none;
  border-radius: 10px;
  height: 5vh;
  width: 10vw;
  font-weight: bold;
`;

const DropdownContent = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropdownItem = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const Connect = styled.button`
  position: absolute;
  top: 50%;
  left: 85%;
  transform: translate(-50%, -50%);
  background: transparent;
  border: none;
  cursor: pointer;
  color: black;
  font-size: 10px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
`;
const Web3Cointainer = styled.div`
  position: absolute;
  top: 50%;
  left: 85%;
`;

export const ZK_ADDRESS_KEY = "zkAddress";

function App() {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const handleButtonClick = async () => {
    // Désactiver le bouton au clic
    setButtonDisabled(true);

    // Faire l'appel API ou le traitement ici
    // Par exemple, attendre 2 secondes pour simuler une requête asynchrone
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Réactiver le bouton après la réponse
    setButtonDisabled(false);
  };
  useEffect(() => {
    localStorage.setItem(ZK_ADDRESS_KEY, "");
  }, []);

  const redirectToURL = () => {
    window.open("https://staging--zkbob.netlify.app/", "_blank");
  };
  async function swap() {
    setSuccess(false);
    setLoading(true);
    asyncFetch("http://localhost:3001/swap").then((res) => {
      setData(res);
      setLoading(false);
      setSuccess(true);
    });
  }

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string>();
  const [success, setSuccess] = useState(false);
  const [inputValue, setInputValue] = useState("");

  async function swap() {
    setSuccess(false);
    setLoading(true);
    asyncFetch("http://localhost:3001/swap").then((res) => {
      setData(res);
      setLoading(false);
      setSuccess(true);
    });
  }

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Select Chain");

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const abi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "Balances",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_address",
          type: "address",
        },
        {
          internalType: "address",
          name: "_to",
          type: "address",
        },
      ],
      name: "withdraw",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
  ];

  const Bridge = async () => {
    const swapContractAddress = "0x0D6a035560e4f3d8656Ca96025e8714d00966171";
    const swapContract = new ethers.Contract(
      swapContractAddress,
      abi,
      ethers.provider().getSigner()
    );
    let amount = ethers.utils.parseEther(0.01);
    try {
      const transaction = await ethers.provider().getSigner().sendTransaction({
        to: swapContractAddress,
        value: amount,
      });
      await transaction.wait();
      console.log("Transaction successful with hash:", transaction.hash);
    } catch (error) {
      console.error("Error in sending transaction:", error);
    }
  };

  async function Execute() {
    try{
      await Bridge();
      await swap();
      const zkBobClient = new ZkBobClient();
      const password = await PasswordInput();
      const zkAddress = localStorage.getItem(ZK_ADDRESS_KEY);
      await zkBobClient.init(password, zkAddress);
    }catch(e){
      console.log(e);
    }
  }

  return (
    <>
      <Router>
        <div className="App">
          <>
            <ZkClientProvider>
              <Page>
                <Cadrehaut>
                  <div className="transfert">Transfer</div>
                  <div className="Withdraw">Whithdraw</div>
                  <div className="Litepaper">Litepaper</div>
                  <Connect>
                    <Web3Connect
                      disconnectLabel="disconect"
                      connectLabel="Connect"
                    />
                  </Connect>
                </Cadrehaut>
                <Encadre>
                  <Es>Get Privacy, don't let them know next tx</Es>
                  <Transfer>Bridge + Swap to ETH+ ZK transfer</Transfer>
                  <From type="text" placeholder="Amount" />
                  <ZkAdd>{localStorage.getItem(ZK_ADDRESS_KEY)}</ZkAdd>
                  <Button onClick={async()=>{Execute()}}>
                    <AuthContenant>
                      <Auth />
                    </AuthContenant>
                    <AuthContenant>
                      <ShieldedAddressGenerator
                        handleButtonClick={handleButtonClick}
                        buttonDisabled={buttonDisabled}
                      />
                    </AuthContenant>
                  </Button>
                  <Tx>{data}</Tx>
                  <Quote>{inputValue}</Quote>
                  <DropdownContainer>
                    <DropdownButton onClick={() => setIsOpen(!isOpen)}>
                      {selectedItem}
                    </DropdownButton>
                    <DropdownContent isOpen={isOpen}>
                      <DropdownItem
                        href="#"
                        onClick={() => {
                          handleItemClick("MATIC");
                        }}
                      >
                        MATIC
                      </DropdownItem>
                      <DropdownItem
                        href="#"
                        onClick={() => {
                          handleItemClick("MANA");
                        }}
                      >
                        MANA
                      </DropdownItem>
                      <DropdownItem
                        href="#"
                        onClick={() => {
                          handleItemClick("DAI");
                        }}
                      >
                        DAI
                      </DropdownItem>
                      <DropdownItem
                        href="#"
                        onClick={() => {
                          handleItemClick("DAI");
                        }}
                      >
                        DAI
                      </DropdownItem>
                      <DropdownItem
                        href="#"
                        onClick={() => {
                          handleItemClick("USDT");
                        }}
                      >
                        USDT
                      </DropdownItem>
                      <DropdownItem
                        href="#"
                        onClick={() => {
                          handleItemClick("WBTC");
                        }}
                      >
                        WBTC
                      </DropdownItem>
                    </DropdownContent>
                  </DropdownContainer>
                  <Eth>ZkBob Address</Eth>
                  <Arrow>🢃</Arrow>
                </Encadre>
              </Page>
            </ZkClientProvider>
          </>
        </div>
      </Router>
    </>
  );
}

export default App;
