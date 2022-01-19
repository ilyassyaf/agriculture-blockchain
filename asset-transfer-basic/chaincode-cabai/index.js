/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// const assetTransfer = require('./lib/assetTransfer');
const cabai = require('./lib/cabai');

// module.exports.AssetTransfer = assetTransfer;
module.exports.Cabai = cabai;
module.exports.contracts = [cabai];
