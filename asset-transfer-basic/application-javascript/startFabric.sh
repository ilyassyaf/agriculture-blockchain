#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#
# Exit on first error
set -e

# don't rewrite paths for Windows Git Bash users
export MSYS_NO_PATHCONV=1

# clean out any old identites in the wallets
rm -rf wallet/*
rm -rf walletApi/*

# launch network; create channel and join peer to channel
pushd ../../test-network
./network.sh down
./network.sh up createChannel -ca -s couchdb

# ./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-javascript/ -ccl javascript

./network.sh deployCC -ccn cabai -ccp ../asset-transfer-basic/chaincode-cabai -ccl javascript
./network.sh deployCC -ccn distribusi -ccp ../asset-transfer-basic/chaincode-distribusi -ccl javascript
./network.sh deployCC -ccn konsumen -ccp ../asset-transfer-basic/chaincode-konsumen -ccl javascript
./network.sh deployCC -ccn kud -ccp ../asset-transfer-basic/chaincode-kud -ccl javascript
./network.sh deployCC -ccn petani -ccp ../asset-transfer-basic/chaincode-petani -ccl javascript
popd

pushd ../hyperledger-explorer
./startExplorer.sh
popd

# node ./init.js
node ./server.js