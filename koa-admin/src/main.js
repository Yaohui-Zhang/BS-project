const Koa = require('koa')
const bodyParser = require('koa-body')
const parameter = require('koa-parameter')
const router = require('./routers/index.js')
const cors = require('koa2-cors');
const path = require('path')
const koaStatic = require('koa-static')
const error = require('koa-json-error')

// 连接数据库
require('./db')

const app = new Koa()

app.use(cors({
  // 任何地址都可以访问
  origin: "*",
  maxAge: 2592000,
  // 必要配置
  credentials: true
}));

app.use(koaStatic(path.join(__dirname, 'public')))

// 错误处理中间件
app.use(error({
  postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
}))



// 解析body参数
app.use(bodyParser({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '/public/uploads'),
    keepExtensions: true
  }
}))

// 检验参数
app.use(parameter(app))

// 挂载路由
router(app)

app.listen(3000)