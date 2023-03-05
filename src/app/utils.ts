import { useEffect, useState } from "react";
import { ethers } from 'ethers'

const useProvider = () => {
    const [account, setAccount] = useState<string | undefined>(undefined)
    const [provider, setProvider] = useState<ethers.providers.Web3Provider | undefined>(undefined)
    const requestAccount = async () => {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
    };
    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                setProvider(provider)
                // setIsSupportMetaMask(true);
            } else {
                // setIsSupportMetaMask(false);
                // provider = new ethers.JsonRpcProvider(RPC_URL);
                // web3 = new Web3(provider);
            }
        };
        init();
    }, []);

    useEffect(() => {
        const getAccount = async (provider: ethers.providers.Web3Provider) => {
            const acc = await provider.listAccounts();
            if (acc) {
                setAccount(acc[0]);
            }
            // window.ethereum.on("chainChanged", function (networkId) {
            //     // Time to reload your interface with the new networkId
            //     // setNetworkId(networkId);
            // });
            window.ethereum.on("accountsChanged", (acc: string[]) => {
                if (acc) {
                    // changed account
                    setAccount(acc[0]);
                } else {
                    // disconnect
                    setAccount('');
                }
            });
        }
        if (provider) getAccount(provider)
    }, [provider])
    return {
        addr: account,
        provider,
        requestAccount
    }
}

export default useProvider