const router = require('koa-router')()
let {prefix, test1Agentid} = require('../../config')
let {requestApi} = require('../../libs/ajax')
router.prefix('/send')

/**
 * 主动发送消息
 * @type {[type]}
 */
router.post('/', async (ctx, next) => {
  let body = ctx.request.body

  let options = {
    uri: `${prefix}message/send?access_token=${ctx.test1Token}`,
    method: 'POST',
    body,
    json: true
  }

  let res = await requestApi(options)

  if (res.errcode === 0) {
    ctx.success('发送成功')
  }else {
    ctx.success('', res.errcode, res.errmsg)
  }
})
module.exports = router
