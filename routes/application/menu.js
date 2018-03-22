const router = require('koa-router')()
let {prefix, test1Agentid} = require('../../config')
let {requestApi} = require('../../libs/ajax')
router.prefix('/menu')


/**
 * 创建菜单
 * @type {[type]}
 */
router.post('/create', async (ctx, next) => {
  let obj = ctx.request.body;
  let options = {
    uri: `${prefix}menu/create?access_token=${ctx.test1Token}&agentid=${test1Agentid}`,
    method: 'POST',
    body: obj,
    json: true
  }

  let res = await requestApi(options)
  if (res.errcode === 0) {
    ctx.success(`create sucessful!`)
  }else {
    ctx.success('', res.errcode, res.errmsg)
  }
})


/**
 * 获取菜单
 * @type {Object}
 */
router.get('/', async (ctx, next) => {
  let agentid = ctx.query.agentid
  let options = {
    uri: `${prefix}/menu/get?access_token=${ctx.test1Token}&agentid=${test1Agentid}`,
    method: 'GET',
    json: true
  }

  let res = await requestApi(options)

  if (res.errcode === 0) {
    ctx.success(res.button)
  }else {
    ctx.success('', res.errcode, res.errmsg)
  }
})


/**
 * 删除菜单
 * @type {Object}
 */
router.post('/delete', async (ctx, next) => {
    let {agentid} = ctx.request.body
    let options = {
      uri: `${prefix}menu/delete?access_token=${ctx.test1Token}&agentid=${test1Agentid}`,
      method: 'GET',
      json: true
    }

    let res = await requestApi(options)
    if (res.errcode === 0) {
      ctx.success(`delete sucessful!`)
    }else {
      ctx.success('', res.errcode, res.errmsg)
    }
})
module.exports = router
