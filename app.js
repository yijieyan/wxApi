const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const auth = require('./middiware/auth')
const index = require('./routes/index')
const users = require('./routes/address/users')
const label = require('./routes/address/label')
const dept = require('./routes/address/dept')
const application = require('./routes/application/index')
const clock = require('./routes/application/clock')
const menu = require('./routes/application/menu')
const send = require('./routes/message/send')
const recv = require('./routes/message/recv')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(auth)
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(label.routes(), label.allowedMethods())
app.use(dept.routes(), dept.allowedMethods())
app.use(application.routes(), application.allowedMethods())
app.use(clock.routes(), clock.allowedMethods())
app.use(menu.routes(), menu.allowedMethods())
app.use(send.routes(), send.allowedMethods())
app.use(recv.routes(), recv.allowedMethods())
module.exports = app
