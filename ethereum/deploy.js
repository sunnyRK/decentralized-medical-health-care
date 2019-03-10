const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const Medical = require('./build/Medical.json');

const provider = new HDWalletProvider(
    'siege bachelor blind acoustic glide butter snack avoid evil priority ready gain',
    'https://rinkeby.infura.io/v3/0546d521cf50424a8a252691171e5182'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy contract by account address : ", accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(Medical.interface))
        .deploy({ data: '0x' + Medical.bytecode })
        .send({  gas: '3000000',from: accounts[0] }); 
    
    //console.log(compiledFactory.interface);
    console.log("Contract deployed to : ", result.options.address);

};
deploy();