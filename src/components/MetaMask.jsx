/* eslint-disable */

import React, {useState} from 'react';
// import  {ethers} from 'ethers';
import Axios from 'axios'; 
import ButtonComp from './ButtonComp';


const MetaMask = (props) => {

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null); 
  const [note, setnote] = useState({amount:0}); 

  const connectWallet = () => {
    try{
    if (window.ethereum) {
        window.ethereum.request({method: 'eth_requestAccounts'})
        .then(result => {
        //   accountChanged([result[0]])
          const accountName=[result[0]]
          setDefaultAccount(accountName)
          window.ethereum.request({method: 'eth_getBalance', params: [String(accountName), "latest"]})
          .then(balance => {
              setUserBalance(ethers?.utils?.formatEther(balance));
              console.log("balance", balance)
          })
          console.log("result is",result)

        })
    } else {
      setErrorMessage('Install MetaMask please!!')
    }
  }
  catch(error){
    console.log(error)
  }
  }

  const handlechange=(e)=>{
    setnote({...note,   [e.target.name]:e.target.value})
  }
  const accountChanged = (accountName) => {
    try{
    setDefaultAccount(accountName)
    window.ethereum.request({method: 'eth_getBalance', params: [String(accountName), "latest"]})
    .then(balance => {
        console.log("balance", balance)
      setUserBalance(ethers?.utils?.formatEther(balance));
      console.log(errorMessage,defaultAccount,userBalance)
    })
  }
  catch(error){
    console.log(error)
  }
  }

  const getUserBalance = (accountAddress) => {
    try{
    window.ethereum.request({method: 'eth_getBalance', params: [String(accountAddress), "latest"]})
    .then(balance => {
        console.log("balance", balance)
      setUserBalance(ethers?.utils?.formatEther(balance));
      console.log(errorMessage,defaultAccount,userBalance)
    })
  }
  catch(error){
    console.log(error)
  }
  }

  async function sendTransaction(e){
    try{
        let params=[{
        from :"0x6b13a2af774b317babd380590133d439cbfe7c6c",
        to:"0xa644b9c52b7a9093bb129001e7b162c18112f5c6",
        gas:Number(2100).toString(16),
        gasPrice:Number(2500000).toString(16),
        value:Number(note.amount*100000000).toString(16)
        }]

        let result=await window.ethereum.request({method:"eth_sendTransaction",params}).catch((err)=>{
            console.log(err)
        })
        console.log("after transaction is",result)
      }
      catch(error){
        console.log(error)
      }
  }

  return (
    <div>
     {/* <h1>MetaMask Wallet Connection </h1>
        <button onClick={connectWallet}>Connect Wallet Button</button>
        <h3>Address: {defaultAccount}</h3>
        <h3>Balance is:  {userBalance?userBalance:"nothing"}</h3>
        <h3>Enter Transaction Address: </h3>
        <input type="text" name="to_address" placeholder="Address: " />
        {errorMessage}
        <button onClick={sendTransaction}>send</button> */}
        <div className="Ok" onClick={connectWallet}>
          <ButtonComp title="Connect MetaMask Wallet" />
          {defaultAccount}
        
        </div>
          <input  className='SearchBox' label='Email address' id='form1' name='amount' type='text' onChange={handlechange} placeholder="Enter amount"/>
          <div className="ok" onClick={sendTransaction}>
          <ButtonComp title="Send money" />

          </div>
    </div>

  )

}
export default MetaMask;