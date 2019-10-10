const HDWalletProvider = require('truffle-hdwallet-provider');
import Web3 from 'web3';
let web3;
if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider);
}else{
    // we are in the server and matamask is not using by user
    const provider = new HDWalletProvider(
        'mesh almost stairs envelope earth plastic interest hat stock camera panda boat', // metamask
        'https://rinkeby.infura.io/v3/37bd907f93a146679960d54e729cd51a'
    );
    web3 = new Web3(provider);
}
export default web3;