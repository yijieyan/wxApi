let WXBizMsgCrypt = require('wechat-crypto')

function formatMessage(result) {
    let message = {};
    if (typeof result === 'object') {
        let keys = Object.keys(result);
        for (let i=0; i< keys.length; i++) {
            let item = result[keys[i]];
            let key = keys[i];

            if (!(item instanceof Array) || item.length === 0) {
                if (typeof item === 'object') {
                    message[key] = formatMessage(item);
                }else {
                    message[key] = (item || '').trim();
                }
                continue;
            }

            if (item.length === 1) {
                let val = item[0];

                if (typeof val === 'object') {
                    message[key] = formatMessage(val);
                }else {
                    message[key] = (val || '').trim();
                }
            }else {
                message[key] = [];

                for (let j= 0; j< item.length; j++) {
                    message[key].push(formatMessage(item[j]));
                }
            }
        }
    }
    return message;
};

function analysis (token, key, id) {
  let cryptor = new WXBizMsgCrypt( token,key, id);
  let result = cryptor.decrypt(msg_encrypt)
  return result;
}
module.exports = {
  formatMessage,
  analysis
}
