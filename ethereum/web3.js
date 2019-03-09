import Web3 from 'web3';
let web3;
if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined')
{
    // we are in the browser and metamask running
    console.log("1");
    web3 = new Web3(window.web3.currentProvider);
}else{
    // we are in the server and matamask is not using by user
    console.log("11");
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/0546d521cf50424a8a252691171e5182'
    );
    web3 = new Web3(provider);
}
export default web3;