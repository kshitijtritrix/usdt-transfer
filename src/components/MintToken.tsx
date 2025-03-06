"use client";
import { ethers } from "ethers";
import React, { useState } from "react";

export default function MintToken({ signer, USDT }) {
    const [mintAmount, setMintAmount] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleMint() {
        if (!mintAmount || Number(mintAmount) <= 0) {
            alert("Enter a valid amount");
            return;
        }

        try {
            setLoading(true);

            // Convert mintAmount to the correct BigNumber format (adjust decimals)
            const mintAmountBigNumber = ethers.parseUnits(mintAmount, 18); // Change decimals if needed

            const tx = await USDT.mintTokensToAddress(
                signer.address,
                mintAmountBigNumber
            );

            await tx.wait();
            alert("Mint successful!");
        } catch (error) {
            console.error("Minting failed:", error);
            alert("Minting failed. Check console for details.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col p-2 items-center">
            <div className="font-bold text-gray-700 m-2">
                Mint Token: {USDT.address}
            </div>
            <div>
                <input
                    className="bg-blue-500 p-2 rounded m-2"
                    type="text"
                    placeholder="Amount"
                    value={mintAmount}
                    onChange={(e) => setMintAmount(e.target.value)}
                />
                <button
                    onClick={handleMint}
                    disabled={loading}
                    className="p-2 bg-green-400 text-white rounded m-2"
                >
                    {loading ? "Minting..." : "Mint"}
                </button>
            </div>
        </div>
    );
}
