const Gif = require('./createGif.js')
const Koa = require('koa');
const koaBody = require('koa-body');
const static = require('koa-static');
const fs = require('fs')
const path = require('path')


const app = new Koa();
app.use(koaBody());
// 捕捉错误
const handleError = async(ctx, next)=> {
  try {
    await next();
  } catch(e) {
    const status =  e.status || 404
    const message =  e.message || 'unknown error'
    const paths = ctx.request.path.split('/')

    if (paths[1] === 'apis' ) {
      ctx.response.status = status;
      ctx.response.body = {
        status: status,
        message: message
      };
    }else{
      ctx.response.type = 'html'
      ctx.response.body = fs.readFileSync('./server/404.html');
    }
  }

}
app.use(handleError);

// 页面服务
app.use(static('./dist'));
// api服务
app.use(async ctx => {
  const { request, response, method } = ctx
  const { body } = request
  const paths = request.path.split('/')

  if (paths[1] === 'apis' ) {
    if( method === 'POST'){
      postGif(ctx)
    }else if(method === 'GET'){
      getGif(ctx)
    }
  } else {
    ctx.throw()
  }
});

const postGif = (ctx) => {
  const { request, response, method } = ctx
  const { body } = request
  const paths = request.path.split('/')
  const templateName = paths[2]
  const subtitle = JSON.parse(body.subtitle)

  if (!templateName) {
    ctx.throw({ message: 'templateName required', status: 404 })
  }

  if (!subtitle) {
    ctx.throw({ message: 'subtitle required', status: 404 })
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
    ctx.throw({ message: 'templateName required', status: 404 })
  }
  if (!id) {
    ctx.throw({ message: 'id required', status: 404 })
  }
  const gifPath = `../output/${templateName}/${id}.gif`

  if (!fs.existsSync(gifPath)) {
    ctx.throw({ message: `id:${id} not exist`, status: 404 });
  } else {
    ctx.type = 'gif';
    // ctx.set('Content-Type', 'image/gif')
    ctx.body = fs.createReadStream(gifPath)
  }

}



app.listen(80);
