const router = require('koa-router')()
let {prefix, test1Agentid} = require('../../config')
let {requestApi} = require('../../libs/ajax')
router.prefix('/send')


module.exports = router
