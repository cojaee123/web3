// Contract.js
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { sha256 } from 'crypto-hash';
import crypto from "crypto-js";
import './Contract.css'; // Import the CSS file

const Contract = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [greeting, setGreeting] = useState(null);


    const [blackNo, setBlackNo] = useState("");
    const [hashData, setHashData] = useState("");

    const [blackNo1, setBlackNo1] = useState("");
    const [hashData1, setHashData1] = useState("");

    let [output, setOutput] = useState('');
    let [file_input, setFileInput] = useState('');

    const [transactionHash, setTransactionHash] = useState('');
    const [showHashInput1, setShowHashInput1] = useState(false);

    useEffect(() => {
        // Connect to Web3
        const initWeb3 = async () => {
            if (window.ethereum) {
                const w3 = new Web3(window.ethereum);
                setWeb3(w3);

                try {
                    // Request account access if needed
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    // Acccounts now exposed
                } catch (error) {
                    console.error('Error connecting to Ethereum:', error);
                }
            }
        };

        initWeb3();
    }, []);

    useEffect(() => {
        // Load Contract
        const loadContract = async () => {
            if (web3) {
                const contractAddress = '0x6Bcb5091c887E0C1009733E1B5AcC106be3bf01E';
                const contractAbi = [
                    {
                        "inputs": [
                            {
                                "internalType": "string",
                                "name": "warrantNo",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "fileHash",
                                "type": "string"
                            }
                        ],
                        "name": "hashAndStoreFile",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "string",
                                "name": "warrantNo",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "fileHash",
                                "type": "string"
                            }
                        ],
                        "name": "checkHashFile",
                        "outputs": [
                            {
                                "internalType": "bool",
                                "name": "",
                                "type": "bool"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "string",
                                "name": "",
                                "type": "string"
                            }
                        ],
                        "name": "fileHashes",
                        "outputs": [
                            {
                                "internalType": "bytes32",
                                "name": "",
                                "type": "bytes32"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    }
                ]

                const contractInstance = new web3.eth.Contract(contractAbi, contractAddress);
                setContract(contractInstance);

                // // Get the current account
                // const accounts = await web3.eth.getAccounts();
                // setAccount(accounts[0]);

            }
        };

        loadContract();
    }, [web3]);



    const sendTransaction = async () => {

        // Get the user's account address
        const accounts = await web3.eth.getAccounts();
        const senderAddress = accounts[0];

        setAccount(accounts[0]);

        // Create a transaction object
        const transactionObject = contract.methods.hashAndStoreFile(blackNo, hashData);

        try {
            // Send the transaction
            const receipt = await transactionObject.send({
                from: senderAddress,
            });

            // Update the transaction hash and handle other logic as needed
           // const rsText = JSON.stringify(receipt,null,2)
            setTransactionHash(receipt.transactionHash);
            console.log('Transaction Successful:');
            //console.log(rsText)
            console.log(receipt)
        } catch (error) {
            console.error('Transaction Error:', error);
        }
    };

    const callGetGreeting = async () => {
        console.log(blackNo1)
        console.log(hashData1)
        try {
            const result = await contract.methods.checkHashFile(blackNo1, hashData1).call();
            console.log(result);
            setGreeting(result ? "ไฟล์ที่ได้รับถูกต้อง" : "ไฟล์ไม่ถูกต้องนะจ๊ะ");
        } catch (error) {
            console.error('Error calling getGreeting function:', error);
        }
    };

    const createHash = (e) => {
        if (!e.target.value ){
            return
        }
        // Initializing the file reader
        const fr = new FileReader();

        // Listening to when the file has been read.
        fr.onload = async () => {

            //let result = '';
            ////result = await sha256(fr.result);
            //result = crypto.SHA256(fr.result).toString()  --old
            const result = crypto.SHA256(crypto.lib.WordArray.create(fr.result)).toString();

            // Setting the hashed text as the output
            setHashData(result);

            // Setting the content of the file as file input
            // setFileInput(fr.result);
        }

        // Reading the file.
        //fr.readAsText(e.target.files[0]);  --old
        fr.readAsArrayBuffer(e.target.files[0]);
    }

    const createHash1 = (e) => {
        if (!e.target.value ){
            return
        }
        // Initializing the file reader
        const fr1 = new FileReader();

        // Listening to when the file has been read.
        fr1.onload = async () => {

            //let result = '';
            ////result = await sha256(fr.result);
            //result = crypto.SHA256(fr.result).toString()  --old
            const result1 = crypto.SHA256(crypto.lib.WordArray.create(fr1.result)).toString();

            // Setting the hashed text as the output
            setHashData1(result1);

            // Setting the content of the file as file input
            // setFileInput(fr.result);
        }

        // Reading the file.
        //fr.readAsText(e.target.files[0]);  --old
        fr1.readAsArrayBuffer(e.target.files[0]);
    }

    return (
        // <div>
        //     <h2>Hash File Contract </h2>
        //     <p>Account: {account}</p>
        //     {/* <p>ตัวอย่างข้อมูลในการทดสอบ</p> */}
        //     <p>{hashData}</p>

        //     black no : <input onChange={(e) => { setBlackNo(e.target.value) }}></input>

        //     <input type='file' accept='.pdf' onChange={createHash} />

        //     <br/>
        //     hash : <input onChange={(e) => { setHashData(e.target.value) }} value={hashData}></input>
        //     <button onClick={sendTransaction}>push</button>
        //     <p>
        //         <button onClick={callGetGreeting}>แสดงผล</button>
        //     </p>
        //     {greeting && <p>ผลลัพธ์: {greeting}</p>}

        //     {/* <p>
        //         <button onClick={sendTransaction}>push</button>
        //     </p> */}
        //     {transactionHash && <p>เลขtransact: {transactionHash}</p>}

        // </div>

        <div className="hash-file-contract">
            <h2>Hash File Contract</h2>
            <p>Account: {account}</p>

            <div className="form-group">
                <label htmlFor="blackNo">เลขหมายจับ:</label>
                <input id="blackNo" onChange={(e) => setBlackNo(e.target.value)} />
            </div>

            <div className="form-group">
                <label htmlFor="fileInput">Choose a PDF file:</label>
                <input type="file" accept=".pdf" id="fileInput" onChange={createHash} />
            </div>

            <div className="form-group">
                <label htmlFor="hashInput">ค่าHashที่ได้:</label>
                <input id="hashInput" onChange={(e) => setHashData(e.target.value)} value={hashData} />
            </div>

            <button onClick={sendTransaction}>ส่งขึ้น Blockchain</button>


            {transactionHash && <pre>Transaction ID: {transactionHash}</pre>}


            <hr />
            <h2>ตรวจสอบไฟล์หมายจับ</h2>


            <div className="form-group">
                <label htmlFor="blackNo1">เลขหมายจับ:</label>
                <input id="blackNo1" onChange={(e) => setBlackNo1(e.target.value)} />
            </div>

            <div className="form-group">
                <label htmlFor="fileInput1">Choose a PDF file:</label>
                <input type="file" accept=".pdf" id="fileInput1" onChange={createHash1} />
            </div>

            {showHashInput1 && (
                <div className="form-group">
                    <label htmlFor="hashInput1">ค่าHashที่ได้:</label>
                    <input id="hashInput1" onChange={(e) => setHashData1(e.target.value)} value={hashData1} />
                </div>
            )}
            <p>
                <button onClick={callGetGreeting}>ดูผลการตรวจสอบ</button>
            </p>

            {greeting && <p>Result: {greeting}</p>}
        </div>

    );
};

export default Contract; 
