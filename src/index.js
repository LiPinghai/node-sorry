const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = '';
});

app.listen(3000);