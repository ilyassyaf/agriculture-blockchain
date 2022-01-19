/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// const assetTransfer = require('./lib/assetTransfer');
const kud = require('./lib/kud');

// module.exports.AssetTransfer = assetTransfer;
module.exports.Kud = kud;
module.exports.contracts = [kud];
