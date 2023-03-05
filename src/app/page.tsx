"use client";
import styles from './page.module.css'
import { useState } from 'react'
import { connectAccount } from './metamask';
import { ethers } from 'ethers'
import useProvider from './utils';
import { ABI, ADDR } from './constant';
import Header from './header';


export default function Home() {
  const [address, setAddress] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false);
  const [hash, setHash] = useState('')
  const { addr, provider } = useProvider()
  const [err, setError] = useState('')
  const [inputAddress, setInputAddress] = useState<string>()

  function updateAddress(addr: any): void {
    setInputAddress(addr!)
    if (addr) {
      if (ethers.utils.isAddress(addr)) {
        setAddress(addr)
      } else {
        setAddress(null)
      }
    } else if (address != null) {
      setAddress(null)
    }
  }
  const getTokenContract = (providerOrSigner: ethers.providers.JsonRpcSigner) => {
    const tokenContract = new ethers.Contract(
      ADDR,
      ABI,
      providerOrSigner
    );
    return tokenContract;
  };
  async function sendToken() {
    setIsLoading(true);
    try {
      const contract = getTokenContract(provider!.getSigner());
      const res = await contract.faucet()
      const data = await res.wait()
      // console.log('data', data)
      setHash(data.transactionHash);
    } catch (err) {
      setError(JSON.stringify(err))
    }

    setIsLoading(false);
  }

  return (
    <main className={styles.main}>
      <div className='rounded w-6/12'>
        <Header />
        <div className='rounded flex bg-inherit w-full flex h-24 bg-gray-900'>
          <input
            className='text-center rounded w-full bg-gray-900'
            placeholder='Hexadecimal Address (0x...)'
            value={addr}
            disabled={true}
            onChange={(e) => updateAddress(e.target.value)}
            autoFocus
          />


          <span className='flex flex-col items-center justify-center ml-4 mr-4 bg-gray-900' onClick={() => connectAccount(updateAddress)}>
            <img alt='metamask' src="/memtamask.webp" className='w-10 h-10 mr-4 bg-gray-900' />
            Connect
          </span>
        </div>
        {/* Please try again after 8hours */}
        <div className='flex bg-inherit w-full flex h-24'>
          {isLoading ? <div className="mx-auto w-[50px] h-[50px] mt-5 rounded-full border-t-2 border-gray-700 animate-spin"></div>
            : provider && <button className="w-full bg-submit-button select-none mx-auto px-3 py-2 cursor-pointer bg-black text-2xl my-1 text-center rounded font-montserrat text-white txt-button-shadow" onClick={sendToken} disabled={!address && !addr}>REQUEST USDC</button>}
        </div>
        {hash ? (
          <div className="select-none w-full">
            Transaction hash:{" "}
            <a
              target="_blank"
              rel="noopennner noreferrer"
              className="break-words w-full"
              href={"https://testnet.snowtrace.io/tx/" + hash}
            >
              {hash}
            </a>
          </div>
        ) : (
          <></>
        )}
        {err && <div className='w-full break-words'>{err}</div>}
      </div>
    </main >
  )
}
