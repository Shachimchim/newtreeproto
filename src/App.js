import './App.css';
import web3 from './web3';
import React, {useState} from "react";
import {lptokenaddress,abi,bttokenaddress,abi1,mctokenaddress,abi2} from './abi';
import {useRef} from "react";

function App() {

const[walletconnect,setwalletconnect] = useState("");
const[stak_e,setstake] = useState("");
const[un_stake,setunstake] = useState("");
const[claim_reward,setclaimreward] = useState("");
const[amount,setAmount]=useState("");
const inputamt=useRef(null);
const stakeamount=useRef(null);
const unstakeamount=useRef(null);
const amt=useRef(null);
  
  const erc20contract = new web3.eth.Contract(abi, lptokenaddress);
  const erc20contract1 = new web3.eth.Contract(abi1, bttokenaddress);
  const masterchefcontract = new web3.eth.Contract(abi2,mctokenaddress);

  const connect = async()=>{
    let accounts=await web3.eth.getAccounts();
    
    // web3.eth.getChainId().then(console.log);
    // const networkid=await web3.eth.getChainId();
    // console.log("network id",networkid);
     await web3.eth.getAccounts().then(()=>{          
         console.log("acc Ethereum",accounts[0])
         setwalletconnect(accounts[0])
         window.wallet=accounts[0];
        
        localStorage.setItem("wallet",accounts[0])
        //sessionStorage.setItem("wallet", accounts[0]);
       })
  }
// stake
const stake = async() =>{
    const accounts = await web3.eth.getAccounts();
     await masterchefcontract.methods.deposit(stakeamount.current.value).send({from:accounts[0]});

}

// unstake
const unstake = async() =>{
  const accounts = await web3.eth.getAccounts();
  let b = await masterchefcontract.methods.withdraw(unstakeamount.current.value).send({from:accounts[0]});
  setunstake(b);
}

//getreward
const claimreward = async() =>{
  const accounts = await web3.eth.getAccounts();
  let c = await masterchefcontract.methods.claimreward().send({from:accounts[0]});
  setclaimreward(c);
}

const emergencywithdraw = async() =>{
  const accounts = await web3.eth.getAccounts();
  await masterchefcontract.methods.emergencyWithdraw().send({from:accounts[0]}); 
}

const approve = async()=>{
  const accounts = await  web3.eth.getAccounts();
  await erc20contract.methods.approve("0x09e7fDb96D27Bb2beB5132cF58905Fd2B3c73bFF",web3.utils.toBN(1000000000000)).send({from:accounts[0]});
  await erc20contract1.methods.approve("0x09e7fDb96D27Bb2beB5132cF58905Fd2B3c73bFF",web3.utils.toBN(1000000000000)).send({from:accounts[0]});
}


function handlestaking(){
  console.log("STAKING..");
  console.log(stakeamount.current.value);
  let d = stakeamount.current.value*(10**9);
  setAmount(d*100000000000);
  stake(d);
} 

function handlestaking1(){
  console.log("UNSTAKING..");
  console.log(unstakeamount.current.value);
  let e = unstakeamount.current.value*(10**9);
  setAmount(e*100000000000);
  stake(e);
} 


  return (
    <div className="App">
     <br/><br/>
     <button onClick={connect}>Connect Wallet</button>&nbsp;&nbsp;
     <button onClick={approve}>Approve</button>&nbsp;&nbsp;
     <button onClick={handlestaking}>Stake</button>&nbsp;&nbsp;
     <button onClick={handlestaking1}>Unstake</button>&nbsp;&nbsp;
     <button onClick={emergencywithdraw}>Emergency Withdraw</button>&nbsp;&nbsp;
     <button onClick={claimreward}>claimreward</button>&nbsp;&nbsp;
     <br/>

     <label>Stake</label>
     <input  ref = {stakeamount}type="text" id="stakeamount" name="address"/><br/><br/>

     <label>Unstake</label>&nbsp;&nbsp;
     <input ref = {unstakeamount}type="text"id="amt"name="unstakeamount"/>&nbsp;&nbsp;

     
    </div>

  );
  }
export default App;