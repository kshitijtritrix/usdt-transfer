"use client";
import MintToken from "@/components/MintToken";
import TransferToken from "@/components/TransferToken";
import { Provider } from "ethers";
import { Contract } from "ethers";
import { SigningKey } from "ethers";
import { Wallet } from "ethers";
import { ethers } from "ethers";

export default function Home() {
    // const account = 0x8c937303351bc71fe685ac90878e57e7d68cfe12;
    const PRIVATE_KEY: any = process.env.NEXT_PUBLIC_PRIVATE_KEY;
    const provider: Provider = new ethers.getDefaultProvider(
        process.env.NEXT_PUBLIC_ALCHEMY_RPC
    );
    const signer: Wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    const abi = [
        "function mintTokensToAddress(address _to,uint _amount) public",
        "function transferTokens(address _from,address _to,uint _amount) public",
        "function transfer(address to, uint256 value) public returns (bool)",
        "function balanceOf(address owner) public view returns (uint256)",
    ];

    const USDT_CONTRACT_ADDRESS = "0xdf107676e6b37799f8c107037dc384176923adb9";

    const USDT = new Contract(USDT_CONTRACT_ADDRESS, abi, signer);

    return (
        <div className="p-3 bg-blue-300 flex items-center justify-center flex-col w-1/2 rounded-2xl">
            <h2 className="text-blue-700 font-extrabold">
                Public address: {signer.address}
            </h2>
            <MintToken
                signer={signer}
                USDT={USDT}
            />
            <TransferToken
                signer={signer}
                USDT={USDT}
            />
        </div>
    );
}
