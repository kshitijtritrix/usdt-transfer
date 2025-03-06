"use client";

import { ethers } from "ethers";
import { useState } from "react";

export default function TransferToken({ signer, USDT }) {
    const [toAddress, setToAddress] = useState("");
    const [amount, setAmount] = useState("");
    const [transactionHash, setTransactionHash] = useState("");
    const [balanceOfAddress, setBalanceOfAddress] = useState("");
    const [balance, setBalance] = useState("");
    const [transacting, setTransacting] = useState(false);

    const handleTransfer = async () => {
        try {
            setTransacting(true);
            if (!toAddress || !amount) {
                alert("Please enter a valid address and amount.");
                return;
            }

            // Convert amount to the correct units (e.g., USDT uses 6 decimals)
            // here i have used 18 decimals
            const amountInWei = ethers.parseUnits(amount, 18); // Adjust decimals as needed

            // Call the transfer function on the USDT contract
            const tx = await USDT.transfer(toAddress, amountInWei);
            await tx.wait(); // Wait for the transaction to be mined

            setTransactionHash(tx.hash);
            alert(`Transfer successful! Transaction hash: ${tx.hash}`);
        } catch (error) {
            console.error("Transfer failed:", error);
            alert("Transfer failed. Check the console for details.");
        } finally {
            setTransacting(false);
        }
    };

    async function handleBalance() {
        if (!balanceOfAddress || !ethers.isAddress(balanceOfAddress)) {
            alert("Enter a valid Ethereum address.");
            return;
        }

        try {
            const balance = await USDT.balanceOf(balanceOfAddress);
            setBalance(ethers.formatUnits(balance, 18)); // Adjust decimals as needed
        } catch (error) {
            console.error("Failed to fetch balance:", error);
            alert("Failed to fetch balance.");
        }
    }

    return (
        <div className="flex flex-col p-2 items-center w-full ">
            <h2 className="font-bold text-gray-700 m-2">Transfer USDT</h2>
            <div>
                <input
                    type="text"
                    placeholder="Recipient Address"
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                    className=" bg-blue-500 p-2 rounded m-2"
                />
                <input
                    type="text"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-red-500 p-2 rounded m-2"
                />
            </div>
            <button
                onClick={handleTransfer}
                className="p-2 bg-blue-500 text-white rounded ml-2"
            >
                {transacting ? "Transferring..." : "Transfer"}
            </button>
            {transactionHash && (
                <p className="mt-2 bg-red-300 rounded items-center flex flex-col p-1">
                    Transaction hash: {transactionHash}
                </p>
            )}

            <div>
                <input
                    type="text"
                    placeholder="Balance Of"
                    value={balanceOfAddress}
                    onChange={(e) => setBalanceOfAddress(e.target.value)}
                    className="p-2 border rounded m-2"
                />
                <button
                    onClick={handleBalance}
                    className="p-2 bg-blue-500 text-white rounded"
                >
                    Get Balance
                </button>
                <h3 className="font-bold text-gray-700 m-2">
                    Balance: {balance}{" "}
                </h3>
            </div>
        </div>
    );
}
