import React from "react";
import { ADDR } from "./constant";
import useProvider from "./utils";
export const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(address.length - 4)}`;
};
export default function Header() {
    const { addr, requestAccount } = useProvider();
    return (
        <div className="h-10">
            <div className="flex absolute right-5 top-5">
                <a
                    rel="noopenner noreferrer"
                    target="_blank"
                    href={`https://testnet.snowtrace.io/token/${ADDR}`}
                    className="hover:scale-125 transition duration-100 text-xl text-black font-medium select-none cursor-pointer "
                >
                    Contract
                </a>
                {!addr ? (
                    <div
                        onClick={() => requestAccount()}
                        className="hover:scale-125 transition mx-8 text-xl text-black font-medium select-none cursor-pointer"
                    >
                        Connect Wallet
                    </div>
                ) : (
                    <a
                        rel="noopenner noreferrer"
                        target="_blank"
                        href={"https://testnet.snowtrace.io/address/" + addr}
                        className="hover:scale-125 transition mx-8 text-xl text-black font-medium select-none cursor-pointer"
                    >
                        {shortenAddress(addr)}
                    </a>
                )}
            </div>
        </div >
    );
}
