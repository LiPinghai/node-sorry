node-sorry
========

最近很火的sorry在线制作gif的node版本，创意来自[Xuty的ruby原版](https://github.com/xtyxtyx/sorry)，本文档亦有参考原文档。

[线上演示地址](http://gif.lipinghai.cn/index.html?from=github)

有问题欢迎提issue，喜欢项目的请star,谢谢！

![图片](http://imgsrc.baidu.com/forum/pic/item/a98c4bc6a7efce1b86b10ccca351f3deb58f6585.gif)

## 项目说明

* 服务端采用 koa + fluent-ffmpeg,生成字幕和gif存在cache目录
* api用RESTful规范
* 页面采用ejs渲染，构建脚本build.js,生成页面和资源在dist目录
* 项目配置在config.js中(部署请删掉或替换统计代码)

## 源码结构

```
├── package
├── package.lock
├── common                  # 工具类
├── server                  # node源码
├── view                    # 页面源码
├── template                # gif模板
├── config.js               # 配置
├── build.js                # 页面构建脚本
├── README.md
└── cache                   # gif和字幕缓存
```

## 其他版本

- [ruby原版](https://github.com/xtyxtyx/sorry)@Xuty编写
- [python版](https://github.com/East196/sorrypy)，由@East196编写
- [java版](https://github.com/li24361/sorryJava)，由@li24361编写
- [C# ASP.NET版](https://github.com/shuangrain/SorryNet)，由@shuangrain编写
- [微信小程序](https://github.com/CoXier/iemoji-wechat)，由@CoXier编写
- [node+Express版](https://github.com/q809198545/node-sorry)，由@q809198545编写

## API

制作GIF：
```
POST {host}/api/{template_name}/
{
    subtitle:['好啊',.....]
}

# 返回GIF的hash
-> 200 
{
  status: 200,
  data: 'c2f4069ed207dc38e0f2d9359a2fa6b7'
}
```

获取GIF：
```
GET {host}/api/{template_name}/{gif_hash}
```

目前支持的template_name有：
```
- sorry
- wangjingze
- guevara
```

## 部署指南

### 安装
```
npm i
```
`@ffmpeg-installer/ffmpeg`有可能装不上，多装`npm i`几次

### 构建页面
```
npm run build
```

### 部署

本地开发用`npm run server`

线上部署用推荐使用`pm2`管理,先安装`npm i pm2 -g`,再`pm2 start server/index.js`启动项目即可

## 制作字幕模板template.ass

首先使用aegisub为模板视频创建字幕，保存为template.ass（aegisub教程可以看这个 https://tieba.baidu.com/p/1360405931 ）
![图片](https://dn-coding-net-production-pp.qbox.me/56a213df-9ff7-41e0-9b6c-96b1f0fe2cb6.png)

然后把文本替换成模板字符串 <%= sentences[n] %>
![图片](https://dn-coding-net-production-pp.qbox.me/6b07bc65-c3d7-4251-aad2-bd7b05af9102.png)
