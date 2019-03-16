import web3 from './web3';
import Medical from './build/Medical.json';
const instance = new web3.eth.Contract(
    JSON.parse(Medical.interface),
    '0x4a9433a2e34dd82dae80c2f886e37de083c57733'
);
export default instance;