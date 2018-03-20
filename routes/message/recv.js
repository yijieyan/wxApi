const router = require('koa-router')()
let {prefix, test1Agentid, test1Token, test1AESKey, corpid} = require('../../config')
let {requestApi} = require('../../libs/ajax')
let sha1 = require('sha1')

let getRawBody = require('raw-body')
let parser = require('xml2json')
let {formatMessage, analysis} = require('../../libs/util')
router.prefix('/recv')

router.get('/', async (ctx, next) => {
  let {msg_signature, timestamp, nonce, echostr} = ctx.query;
  let msg_encrypt = decodeURI(echostr)
  let str = [test1Token,timestamp,nonce,msg_encrypt].sort().join('')
  let dev_msg_signature=sha1(str)
  if (dev_msg_signature === msg_signature) {
      let result = analysis(test1Token,test1AESKey, corpid)
      ctx.body = result.message
  }else {
    ctx.success('',-1,'verification failure')
  }
})

router.post('/', async (ctx, next) => {
  let query = ctx.query
  let body = ctx.request.body
  console.log(query)
  console.log('------------')
  console.log(body)
  let xml = await getRawBody(ctx.req,{
        length: ctx.headers["content-length"],
        limit: '1mb',
        encoding: 'utf-8'
    });
    let data = formatMessage(JSON.parse(parser.toJson(xml)).xml)
    console.log(data)
    let msg
    msg_signature(query.msg_signature, query.timestamp,query.nonce,body, msg)
    console.log(msg)

})

module.exports = router
