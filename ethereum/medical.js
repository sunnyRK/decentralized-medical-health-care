import web3 from './web3';
import Medical from './build/Medical.json';
const instance = new web3.eth.Contract(
    JSON.parse(Medical.interface),
    '0xF210305bd4d28CE1b7292913089555d977dC9dE2'
);
export default instance;