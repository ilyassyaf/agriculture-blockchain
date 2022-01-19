/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { uuid } = require('uuidv4');
const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('../../test-application/javascript/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('../../test-application/javascript/AppUtil.js');

const channelName = 'mychannel';
const chaincodeName = 'basic';
const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'appUser';

function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2);
}

async function main() {
	try {
		const ccp = buildCCPOrg1();
		const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
		const wallet = await buildWallet(Wallets, walletPath);
		await enrollAdmin(caClient, wallet, mspOrg1);
		await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');
		const gateway = new Gateway();

		try {
			await gateway.connect(ccp, {
				wallet,
				identity: org1UserId,
				discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
			});

			const network = await gateway.getNetwork(channelName);

			// let contract = network.getContract(chaincodeName, 'AssetTransfer');
			// console.log('\n--> Submit Transaction: InitLedger, function creates the initial set of assets on the ledger');
			// await contract.submitTransaction('InitLedger');
			// console.log('*** Result: committed');
			
			let contract = network.getContract('cabai');
			console.log('\n--> Submit Transaction: InitLedger, function creates the initial set of assets on the ledger');
			await contract.submitTransaction('initLedger');
			console.log('*** Result: committed');
			
			contract = network.getContract('distribusi');
			console.log('\n--> Submit Transaction: InitLedger, function creates the initial set of assets on the ledger');
			await contract.submitTransaction('initLedger');
			console.log('*** Result: committed');
			
			contract = network.getContract('konsumen');
			console.log('\n--> Submit Transaction: InitLedger, function creates the initial set of assets on the ledger');
			await contract.submitTransaction('initLedger');
			console.log('*** Result: committed');
			
			contract = network.getContract('kud');
			console.log('\n--> Submit Transaction: InitLedger, function creates the initial set of assets on the ledger');
			await contract.submitTransaction('initLedger');
			console.log('*** Result: committed');
			
			contract = network.getContract('petani');
			console.log('\n--> Submit Transaction: InitLedger, function creates the initial set of assets on the ledger');
			await contract.submitTransaction('initLedger');
			console.log('*** Result: committed');

			// console.log('\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger');
			// let result = await contract.evaluateTransaction('GetAllAssets');
			// console.log(`*** Result: ${prettyJSONString(result.toString())}`);

			// console.log('\n--> Submit Transaction: CreateAsset, creates new asset with ID, color, owner, size, and appraisedValue arguments');
			// let id = uuid();
			// result = await contract.submitTransaction('CreateAsset', id, 'yellow', '5', 'Tom', '1300');
			// console.log('*** Result: committed');
			// if (`${result}` !== '') {
			// 	console.log(`*** Result: ${prettyJSONString(result.toString())}`);
			// }

			// console.log('\n--> Evaluate Transaction: ReadAsset, function returns an asset with a given assetID');
			// result = await contract.evaluateTransaction('ReadAsset', id);
			// console.log(`*** Result: ${prettyJSONString(result.toString())}`);

			// console.log('\n--> Evaluate Transaction: AssetExists, function returns "true" if an asset with given assetID exist');
			// result = await contract.evaluateTransaction('AssetExists', 'asset1');
			// console.log(`*** Result: ${prettyJSONString(result.toString())}`);

			// console.log('\n--> Submit Transaction: UpdateAsset asset1, change the appraisedValue to 350');
			// await contract.submitTransaction('UpdateAsset', 'asset1', 'blue', '5', 'Tomoko', '350');
			// console.log('*** Result: committed');

			// console.log('\n--> Evaluate Transaction: ReadAsset, function returns "asset1" attributes');
			// result = await contract.evaluateTransaction('ReadAsset', 'asset1');
			// console.log(`*** Result: ${prettyJSONString(result.toString())}`);

			// try {
			// 	console.log('\n--> Submit Transaction: UpdateAsset asset70, asset70 does not exist and should return an error');
			// 	await contract.submitTransaction('UpdateAsset', 'asset70', 'blue', '5', 'Tomoko', '300');
			// 	console.log('******** FAILED to return an error');
			// } catch (error) {
			// 	console.log(`*** Successfully caught the error: \n    ${error}`);
			// }

			// console.log('\n--> Submit Transaction: TransferAsset asset1, transfer to new owner of Tom');
			// await contract.submitTransaction('TransferAsset', 'asset1', 'Tom');
			// console.log('*** Result: committed');

			// console.log('\n--> Evaluate Transaction: ReadAsset, function returns "asset1" attributes');
			// result = await contract.evaluateTransaction('ReadAsset', 'asset1');
			// console.log(`*** Result: ${prettyJSONString(result.toString())}`);
		} finally {
			gateway.disconnect();
		}
	} catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
	}
}

main();
