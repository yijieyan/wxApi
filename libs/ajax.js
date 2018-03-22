let request = require('request-promise');


/**
 * 此方法不适用于去下载文件的场景
 * @param  {[type]}  options [description]
 * @return {Promise}         [description]
 */
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
