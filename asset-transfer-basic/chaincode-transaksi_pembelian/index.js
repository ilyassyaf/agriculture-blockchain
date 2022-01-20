/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// const assetTransfer = require('./lib/assetTransfer');
const transaksi_pembelian = require('./lib/transaksi_pembelian');

// module.exports.AssetTransfer = assetTransfer;
module.exports.TransaksiPembelian = transaksi_pembelian;
module.exports.contracts = [transaksi_pembelian];
