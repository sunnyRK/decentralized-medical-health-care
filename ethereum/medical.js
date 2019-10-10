import web3 from './web3';
import Medical from './build/Medical.json';
const instance = new web3.eth.Contract(
    JSON.parse(Medical.interface),
    // '0x5f7224f7C763fdc65BB824024002f9A5ef6DEB46',
    '0xf032999A10D019dDE9900585868E39Da665338e8',
);
export default instance;