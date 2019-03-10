import web3 from './web3';
import Medical from './build/Medical.json';
const instance = new web3.eth.Contract(
    JSON.parse(Medical.interface),
    '0x2e0a3a5726f1305cDC1110144c95a4041c4505B8'
);
export default instance;