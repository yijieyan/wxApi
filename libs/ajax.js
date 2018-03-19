let request = require('request-promise');

let requestApi = async (options) => {
    try {
      let res = await request(options);
      res = typeof res === 'string' ? JSON.parse(res) : res;
      return res;
    }catch(err) {
      throw new Error(`request ${options.uri} fail: ${err}`);
    }
}


module.exports = {
  requestApi
}
