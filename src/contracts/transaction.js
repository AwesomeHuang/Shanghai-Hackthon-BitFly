const nervos = require('../nervos')
const transaction = {
	//from: nervos.appchain.accounts.wallet[0].address,
	//from: window.neuron.getAccount(),
	//from:'',
	//privateKey: nervos.appchain.accounts.wallet[0].privateKey,
	//from:'0x18CCF2F125e566E21b521F58cF392AB52959983f',
	//privateKey:'0x1f3ed395f6ec32467d905b62f6b3eed5100db80e7d6fa4f9390b5e0cabc06671',
	nonce: 999999,
	quota: 5000000,
	chainId: 1,
	version: 0,
	validUntilBlock: 999999,
	value: '0x0'
};

module.exports = transaction
