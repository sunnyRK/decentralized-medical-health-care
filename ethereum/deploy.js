const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const Medical = require('./build/Medical.json');

const provider = new HDWalletProvider(
    'mesh almost stairs envelope earth plastic interest hat stock camera panda boat', 
    'https://rinkeby.infura.io/v3/37bd907f93a146679960d54e729cd51a',
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