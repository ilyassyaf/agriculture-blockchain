var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

const options = {
	type: 'application/*'
  }
app.use(express.raw(options));

const { uuid } = require('uuidv4');
const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('../../test-application/javascript/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('../../test-application/javascript/AppUtil.js');

const channelName = 'mychannel';
const chaincodeName = 'basic';
const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'walletApi');
const org1UserId = 'appUserApi';

function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2);
}

// get all
app.get('/api/:chaincode/all', async function (req, res) {
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
			const contract = network.getContract(req.params.chaincode);

			let result = await contract.evaluateTransaction('getAll');
			let data;
			try {
				data = JSON.parse(result.toString());
			} catch (error) {
				data = result.toString();
			}
            res.status(200).json({response: data});
		} finally {
			gateway.disconnect();
		}
	} catch (error) {
		console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        // process.exit(1);
	}
});

// get one
app.get('/api/:chaincode', async function (req, res) {
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
			const contract = network.getContract(req.params.chaincode);
			
			let result = await contract.evaluateTransaction('readData', req.body.key);
			let data;
			try {
				data = JSON.parse(result.toString());
			} catch (error) {
				data = result.toString();
			}
            res.status(200).json({response: data});
		} finally {
			gateway.disconnect();
		}
	} catch (error) {
		console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        // process.exit(1);
	}
});

// write data
app.post('/api/:chaincode', async function (req, res) {
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
			const contract = network.getContract(req.params.chaincode);

			console.log(req.body);
			let result = await contract.submitTransaction('writeData', req.body.key, JSON.stringify(req.body.data));
			let data;
			try {
				data = JSON.parse(result.toString());
			} catch (error) {
				data = result.toString();
			}
            res.status(200).json({response: data});
		} finally {
			gateway.disconnect();
		}
	} catch (error) {
		console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        // process.exit(1);
	}
});

// // create
// app.post('/api/asset/', async function (req, res) {
//     try {
//         const ccp = buildCCPOrg1();
//         const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
//         const wallet = await buildWallet(Wallets, walletPath);
//         await enrollAdmin(caClient, wallet, mspOrg1);
//         await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');
// 		const gateway = new Gateway();

// 		try {
// 			await gateway.connect(ccp, {
// 				wallet,
// 				identity: org1UserId,
// 				discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
// 			});

// 			const network = await gateway.getNetwork(channelName);
// 			const contract = network.getContract(chaincodeName);

// 			let id = uuid();
// 			result = await contract.submitTransaction('CreateAsset', id, req.body.color, req.body.size, req.body.owner, req.body.appraisedvalue);
//             res.status(200).json({response: JSON.parse(result.toString())});
// 		} finally {
// 			gateway.disconnect();
// 		}
// 	} catch (error) {
// 		console.error(`Failed to evaluate transaction: ${error}`);
//         res.status(500).json({error: error});
//         // process.exit(1);
// 	}
// });

// // update
// app.put('/api/asset/:asset_id', async function (req, res) {
//     try {
//         const ccp = buildCCPOrg1();
//         const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
//         const wallet = await buildWallet(Wallets, walletPath);
//         await enrollAdmin(caClient, wallet, mspOrg1);
//         await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');
// 		const gateway = new Gateway();

// 		try {
// 			await gateway.connect(ccp, {
// 				wallet,
// 				identity: org1UserId,
// 				discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
// 			});

// 			const network = await gateway.getNetwork(channelName);
// 			const contract = network.getContract(chaincodeName);
            
// 			result = await contract.submitTransaction('UpdateAsset', req.params.asset_id, req.body.color, req.body.size, req.body.owner, req.body.appraisedvalue);
//             res.status(200).json({response: JSON.parse(result.toString())});
// 		} finally {
// 			gateway.disconnect();
// 		}
// 	} catch (error) {
// 		console.error(`Failed to evaluate transaction: ${error}`);
//         res.status(500).json({error: error});
//         // process.exit(1);
// 	}
// });

// // delete
// app.delete('/api/asset/:asset_id', async function (req, res) {
//     try {
//         const ccp = buildCCPOrg1();
//         const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
//         const wallet = await buildWallet(Wallets, walletPath);
//         await enrollAdmin(caClient, wallet, mspOrg1);
//         await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');
// 		const gateway = new Gateway();

// 		try {
// 			await gateway.connect(ccp, {
// 				wallet,
// 				identity: org1UserId,
// 				discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
// 			});

// 			const network = await gateway.getNetwork(channelName);
// 			const contract = network.getContract(chaincodeName);
            
// 			result = await contract.submitTransaction('DeleteAsset', req.params.asset_id);
//             res.status(200).json({response: JSON.parse(result.toString())});
// 		} finally {
// 			gateway.disconnect();
// 		}
// 	} catch (error) {
// 		console.error(`Failed to evaluate transaction: ${error}`);
//         res.status(500).json({error: error});
//         // process.exit(1);
// 	}
// });

app.listen(8080, 'localhost');
console.log('Running on http://localhost:8080');
