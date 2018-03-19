let {prefix, corpsecret, corpid} = require('../config');
let {requestApi} = require('../libs/ajax');
let fs = require('fs');
let util = require('util');
let writeFile = util.promisify(fs.writeFile);
let readFile = util.promisify(fs.readFile);
let path = require('path');
module.exports = async (ctx, next) => {

    ctx.success = (data,code='', err='') => {
      ctx.body = {
        code: code ? code : err ? -1 : 0,
        err: err ? err : null,
        data: data? data: null
      }
    }



    let data = await readFile(path.resolve(__dirname, '../data.json'), 'utf8') || "";
    let res = [];
    if (data) {
      res = JSON.parse(data);
      if (res[0].expires_in < Date.now()) {
        res = await reFreshToken();
      }
    }else {
      res = await reFreshToken();
    }
    res.forEach(item => {
      ctx[Object.keys(item)[0]] = item[Object.keys(item)[0]];
    })
    console.log()
    await next();
};

let reFreshToken = async () => {
  let arr = [];
  for(let i =0; i< corpsecret.length; i++) {
    let item = corpsecret[i];
    let key = Object.keys(item)[0];
    let options = {
      uri: `${prefix}gettoken?corpid=${corpid}&corpsecret=${item[key]}`,
      method: 'GET'
    };

    let ret = await requestApi(options);
    let obj = {};
    obj[key] = ret.access_token;
    obj["expires_in"] =  (ret.expires_in - 3*60)* 1000 + Date.now();
    arr.push(obj);
  }
  await writeFile(path.resolve(__dirname, '../data.json'),JSON.stringify(arr));
  return arr;
}
