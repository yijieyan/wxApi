const router = require('koa-router')()
let {requestApi} = require('../../libs/ajax')
let {prefix} = require('../../config')
router.prefix('/label')

/**
 * 创建标签
 * @type {String}
 */
router.post('/create', async (ctx, next) => {
  let {tagname='', tagid=''} = ctx.request.body;
  if (!tagname) {
    throw new Error('lack of parameters');
  }else {
    let body = {
      tagname
    };
    if (tagid) {
      body.tagid = tagid;
    }

    let options = {
      uri: `${prefix}/tag/create?access_token=${ctx.userToken}`,
      method: 'POST',
      body,
      json: true
    };

    let res = await requestApi(options);
    if (res.errcode === 0) {
      ctx.success(`create successful!`);
    }else {
      ctx.success('',ctx.errcode, ctx.errmsg);
    }
  }

})

/**
 * 更新标签名字
 * @type {String}
 */
router.post('/update', async (ctx, next) => {
  let {tagid= '', tagname = ''} = ctx.request.body;
  if (!tagid || !tagname) {
    throw new Error('lack of parameters');
  }else {
    let options = {
      uri: `${prefix}tag/update?access_token=${ctx.userToken}`,
      method: 'POST',
      body: {
        tagid,
        tagname
      },
      json: true
    };

    let res = await requestApi(options);
    if (res.errcode === 0) {
      ctx.success(`update successful!`);
    }else {
      ctx.success('', res.errcode, res.errmsg);
    }
  }
})

/**
 * 删除标签
 * @type {Object}
 */
router.post('/delete', async (ctx, next) => {
  let {tagid} = ctx.request.body;
  if (!tagid) {
    throw new Error('lack of parameters');
  }else {
    let options = {
      uri: `${prefix}tag/delete?access_token=${ctx.userToken}&tagid=${tagid}`,
      methid: 'GET',
      json: true
    };

    let res = await requestApi(options);
    if (res.errcode === 0) {
      ctx.success(`delete successful!`);
    }else {
      ctx.success('',ctx.errcode, ctx.errmsg);
    }
  }
})

/**
 * 获取标签成员
 * @type {Object}
 */
router.get('/getLabelMembers', async (ctx, next) => {
  let {tagid} = ctx.query;
  if (!tagid) {
    throw new Error('lack of parameters');
  }else {
    let options = {
      uri: `${prefix}tag/get?access_token=${ctx.userToken}&tagid=${tagid}`,
      method: 'GET',
      json : true
    };

    let res = await requestApi(options);
    if (res.errcode === 0) {
      ctx.success(res);
    }else {
      ctx.success('', res.errcode, res.errmsg);
    }
  }
})

/**
 * 增加标签成员
 * @type {String}
 */
router.post('/addLabelMember', async (ctx, next) => {
  let {tagid='', userlist=[], partylist=[]} = ctx.request.body;
  if (!tagid) {
    throw new Error('lack of parameters');
  }else {
    let body = {
      tagid
    };

    (userlist.length != 0) && (body.userlist = userlist);
    (partylist.length != 0) && (body.partylist = partylist);
    let options = {
      uri: `${prefix}tag/addtagusers?access_token=${ctx.userToken}`,
      method: 'POST',
      body,
      json: true
    };

    let res = await requestApi(options);
    if (res.errcode === 0) {
      ctx.success(`addLabelMember successful!`);
    }else {
      ctx.success('', res.errcode, res.errmsg);
    }
  }
})

/**
 * 删除标签成员
 * @type {String}
 */
router.post('/deleteLabel', async (ctx, next) => {
  let {tagid='', userlist=[], partylist=[]} = ctx.request.body;
  if (!tagid) {
    throw new Error('lack of parameters');
  }else{
    let obj = {
      tagid
    };

    (userlist.length != 0) && (obj.userlist = userlist);
    (partylist.length != 0) && (obj.partylist = partylist);
    let options = {
      uri: `${prefix}tag/deltagusers?access_token=${ctx.userToken}`,
      method: 'POST',
      body: obj,
      json: true
    };
    console.log(options)

    let res = await requestApi(options);
    if (res.errcode === 0) {
      ctx.success(`delete label success`);
    }else {
      ctx.success('', res.errcode, res.errmsg);
    }
  }
})

/**
 * 获取标签列表
 * @type {Object}
 */
router.get('/getLabel', async (ctx, next) => {
  let options = {
    uri: `${prefix}tag/list?access_token=${ctx.userToken}`,
    method: 'GET',
    json: true
  };

  let res = await requestApi(options);
  if (res.errcode === 0) {
    ctx.success(res.taglist);
  }else {
    ctx.success('', res.errcode, res.errmsg);
  }
})
module.exports = router
