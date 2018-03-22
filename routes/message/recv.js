const router = require('koa-router')()
let {prefix, test1Agentid, test1Token, test1AESKey, corpid} = require('../../config')
let {requestApi} = require('../../libs/ajax')
let sha1 = require('sha1')

let getRawBody = require('raw-body')
let parser = require('xml2json')
let {formatMessage, wechatDecrypt, wechatEncrypt} = require('../../libs/util')
let {reply} = require('../../libs/reply')
// router.prefix('/recv')

router.get('/', async (ctx, next) => {
  let {msg_signature, timestamp, nonce, echostr} = ctx.query;
  let msg_encrypt = decodeURI(echostr)
  let str = [test1Token,timestamp,nonce,msg_encrypt].sort().join('')
  let dev_msg_signature=sha1(str)
  if (dev_msg_signature === msg_signature) {
      let result = wechatDecrypt(test1Token,test1AESKey, corpid, msg_encrypt)
      ctx.body = result.message
  }else {
    ctx.success('',-1,'verification failure')
  }
})

router.post('/', async (ctx, next) => {
  let xml = await getRawBody(ctx.req,{
        length: ctx.headers["content-length"],
        limit: '1mb',
        encoding: 'utf-8'
    });
    let data = formatMessage(JSON.parse(parser.toJson(xml)).xml)
    let result = wechatDecrypt(test1Token,test1AESKey, corpid, data.Encrypt)
    let content = formatMessage(JSON.parse(parser.toJson(result.message)).xml)
    let res = await reply(content)

    let msg = wechatEncrypt(test1Token,test1AESKey, corpid, res)
    let timestamp = parseInt(Date.now()/1000)
    let nonce = Math.random().toString().slice(2,12)
    let str = [test1Token,timestamp,nonce,msg].sort().join('')
    let new_msg_signature=sha1(str)
    let ret = `<xml>
                <Encrypt><![CDATA[${msg}]]></Encrypt>
                <MsgSignature><![CDATA[${new_msg_signature}]]></MsgSignature>
                <TimeStamp>${timestamp}</TimeStamp>
                <Nonce><![CDATA[${nonce}]]></Nonce>
              </xml>`
    ctx.type = 'application/xml'
    ctx.body = ret

})

module.exports = router
