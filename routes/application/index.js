const router = require('koa-router')()
let {requestApi} = require('../../libs/ajax')
let {prefix, clockAgentid} = require('../../config')
router.prefix('/application')


/**
 * 获取应用
 * @type {Object}
 */
router.get('/', async(ctx, next) => {
  let options = {
    uri: `${prefix}agent/get?access_token=${ctx.clockToken}&agentid=${clockAgentid}`
  }

  let res = await requestApi(options)
  if (res.errcode === 0) {
    delete res.errcode
    delete res.errmsg
    ctx.success(res)
  }else {
    ctx.success('', res.errcode, res.errmsg)
  }
})

/**
 * 获取应用列表
 * @type {Object}
 */
router.get('/list', async (ctx, next) => {
  let options = {
    uri: `${prefix}agent/list?access_token=${ctx.clockToken}`,
    method: 'GET',
    json: true
  }
  console.log(options)
  let res = await requestApi(options)

  if (res.errcode === 0) {
    ctx.success(res.agentlist)
  }else {
    ctx.success('', res.errcode, res.errmsg)
  }
})

module.exports = router
