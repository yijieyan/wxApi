const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
router.prefix('/material')
let {requestApi} = require('../../libs/ajax')
let {prefix} = require('../../config')

/**
 * 上传临时素材
 * @type {String}
 */
router.post('/upload', async (ctx, next) => {
  let {type= 'image'} = ctx.request.body;
  let options = {
    uri: `${prefix}media/upload?access_token=${ctx.test1Token}&type=${type}`,
    method: 'POST',
    formData: {
      media: fs.createReadStream(path.join(__dirname, '../../pics/3.txt'))
    }
  }

  let res = await requestApi(options)

  if (res.errcode === 0) {
    ctx.success(res)
  }else {
    ctx.success('', res.errcode, res.errmsg)
  }
})


/**
 * 获取临时素材 (此方法不通，去浏览器地址栏输入url或者把buffer存到一个文件)
 * @type {Object}
 */
router.get('/', async (ctx, next) => {
  let {media_id} = ctx.request.query

  if (!media_id) {
    throw new Error('lack of parameters')
  }else {
    let options = {
      uri: `${prefix}media/get?access_token=${ctx.test1Token}&media_id=${media_id}`,
      method: 'GET',
      json: true
    }
    let res = await requestApi(options)
    if (res.errcode === 0) {
      ctx.success(res)
    }else {
      ctx.success('', res.errcode, res.errmsg)
    }
  }
})
module.exports = router
