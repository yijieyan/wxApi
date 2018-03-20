const router = require('koa-router')()
let {prefix, clockAgentid} = require('../../config')
let {requestApi} = require('../../libs/ajax')

router.prefix('/clock')

/**
 * 获取打卡规则
 * @type {String}
 */
router.post('/', async (ctx, next) => {
  let {datetime= '', useridlist= []} = ctx.request.body
  if (!datetime || useridlist.length === 0) {
    throw new Error('lack of parameters')
  }else {
    let options = {
      uri: `${prefix}checkin/getcheckinoption?access_token=${ctx.clockToken}`,
      method: 'POST',
      body: {
        datetime,
        useridlist
      },
      json: true
    }

    let res = await requestApi(options)
    if (res.errcode === 0) {
      ctx.success(res.info)
    }else {
      ctx.success('', res.errcode, res.errmsg)
    }
  }
})

/**
 * 获取打卡数据
 * @type {Number}
 */
router.post('/checkinData', async (ctx, next) => {
  let {opencheckindatatype=1, starttime= '', endtime= '', useridlist= []} = ctx.request.body
  if (!starttime || !endtime || useridlist.length === 0) {
      throw new Error('lack of parameters')
  }else {
    let options = {
      uri: `${prefix}checkin/getcheckindata?access_token=${ctx.clockToken}`,
      method: 'POST',
      body: {
        opencheckindatatype,
        starttime,
        endtime,
        useridlist
      },
      json:true
    }

    let res = await requestApi(options)
    if (res.errcode === 0) {
      ctx.success(res.checkindata)
    }else {
      ctx.success('', res.errcode, res.errmsg)
    }
  }
})

/**
 * 获取审批数据
 * @type {String}
 */
router.post('/getapprovaldata', async (ctx, next) => {
  let {starttime='', endtime='',next_spnum=''} = ctx.request.body
  if (!starttime || !endtime) {
    throw new Error('lack of parameters')
  }else {
    let options = {
      url: `${prefix}corp/getapprovaldata?access_token=${ctx.approveToken}`,
      method: 'POST',
      body: {
        starttime,
        endtime
      },
      json: true
    }

    let res = await requestApi(options)
    if (res.errcode === 0) {
      delete res.errcode
      delete res.errmsg
      ctx.success(res)
    }else {
      ctx.success('', res.errcode, res.errmsg)
    }
  }
})

module.exports = router
