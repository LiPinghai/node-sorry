const Gif = require('./createGif.js')
const Koa = require('koa');
const koaBody = require('koa-body');
const sendfile = require('koa-sendfile')
const fs = require('fs')


const app = new Koa();
app.use(koaBody());
app.use(async ctx => {
  const { request, response, method } = ctx
  const { body } = request
  const paths = request.path.split('/')

  if (paths[1] === 'apis' && method === 'POST') {
    postGif(ctx)
  } else if (paths[1] === 'apis' && method === 'GET') {
    getGif(ctx)
  }
});

const postGif = (ctx) => {
  const { request, response, method } = ctx
  const { body } = request
  const paths = request.path.split('/')
  const templateName = paths[2]
  const subtitle = JSON.parse(body.subtitle)

  if (!templateName) {
    err(ctx, { message: 'templateName required', status: 404 })
  }

  if (!subtitle) {
    err(ctx, { message: 'subtitle required', status: 404 })
  }

  const gif = new Gif(templateName, subtitle)
  ctx.body = {
    status: 200,
    data: gif.hash
  }
}

const getGif = (ctx) => {
  const { request, response, method } = ctx
  const { body } = request
  const paths = request.path.split('/')
  const templateName = paths[2]
  const id = paths[3]
  if (!templateName) {
    err(ctx, { message: 'templateName required', status: 404 })
  }
  if (!id) {
    err(ctx, { message: 'id required', status: 404 })
  }
  const gifPath = `../output/${templateName}/${id}.gif`

  if (!fs.existsSync(gifPath)) {
    err(ctx, { message: `id:${id} not exist`, status: 404 })
  } else {
    ctx.type = 'gif';
    // ctx.set('Content-Type', 'image/gif')
    ctx.body = fs.createReadStream(gifPath)
  }

}

const err = (ctx, { message, code }) => {
  ctx.response.status = code || 404
  ctx.body = {
    'status': code || 404,
    'message': message || 'unknown erroe'
  }
}

app.listen(80);