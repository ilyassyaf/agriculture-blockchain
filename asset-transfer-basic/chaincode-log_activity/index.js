/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// const assetTransfer = require('./lib/assetTransfer');
const log_activity = require('./lib/log_activity');

// module.exports.AssetTransfer = assetTransfer;
module.exports.LogActivity = log_activity;
module.exports.contracts = [log_activity];
