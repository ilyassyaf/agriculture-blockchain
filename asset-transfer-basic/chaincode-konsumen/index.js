/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// const assetTransfer = require('./lib/assetTransfer');
const konsumen = require('./lib/konsumen');

// module.exports.AssetTransfer = assetTransfer;
module.exports.Konsumen = konsumen;
module.exports.contracts = [konsumen];
