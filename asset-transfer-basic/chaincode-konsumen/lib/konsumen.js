/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const { Contract } = require("fabric-contract-api");

class Konsumen extends Contract {
  //1 initledger
  //2 writeData
  //3 readData

  async initLedger(ctx) {
    await ctx.stub.putState("Konsumen agriculture-blockchain", "Konsumen");
    return "success";
  }
  async writeData(ctx, key, value) {
    await ctx.stub.putState(
      key,
      value
    );
    return "success";
  }
  async readData(ctx, key) {
    var response = await ctx.stub.getState(key);
    let data;
    try {
      data = JSON.parse(response.toString());
    } catch (error) {
      data = response.toString();
    }
    return {
      key: key,
      data: data
    };
  }
  async getAll(ctx) {
    const allResults = [];
    // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
    const iterator = await ctx.stub.getStateByRange('', '');
    let result = await iterator.next();
    while (!result.done) {
        const strKey = Buffer.from(result.value.key.toString()).toString('utf8');
        const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
        let key;
        let record;
        try {
            key = JSON.parse(strKey);
            record = JSON.parse(strValue);
        } catch (err) {
            console.log(err);
            key = strKey;
            record = strValue;
        }
        allResults.push({
          key: key,
          data: record
        });
        result = await iterator.next();
    }
    return allResults;
  }
}

module.exports = Konsumen;
