import web3 from './web3';
import Medical from './build/Medical.json';
const instance = new web3.eth.Contract(
    JSON.parse(Medical.interface),
    '0x73F5D6f5204e53E102A5cDAE5753FAc1D03C5807'
);
export default instance;