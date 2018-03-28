node-sorry
========

最近很火的sorry在线制作gif的node版本，创意来自[Xuty的ruby原版](https://github.com/xtyxtyx/sorry)，本文档亦有参考原文档。

![图片](http://tieba.baidu.com/photo/p?kw=%E6%8A%97%E5%8E%8B&flux=1&tid=5609207987&pic_id=a98c4bc6a7efce1b86b10ccca351f3deb58f6585&pn=1&fp=2&see_lz=1&red_tag=c3045573210)

## 源码结构

```
├── package
├── package.lock
├── public                  # 静态文件目录
├── view                    # 页面源码
├── template                # 模板目录
├── build.js                # 页面构建脚本
├── dist                    # 打包目录
├── README.md
├── config.js               # 配置
├── server                  # node源码
├── common                  # 工具类
└── cache                   # gif和字幕缓存
```

## 其他版本

- [ruby原版](https://github.com/xtyxtyx/sorry), @Xuty编写
- [python版](https://github.com/East196/sorrypy)，由@East196编写
- [java版](https://github.com/li24361/sorryJava)，由@li24361编写
- [C# ASP.NET版](https://github.com/shuangrain/SorryNet)，由@shuangrain编写
- [微信小程序](https://github.com/CoXier/iemoji-wechat)，由@CoXier编写

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
```

## 部署指南

### 安装
```
npm i
```
`@ffmpeg-installer/ffmpeg`大概率装不上，多装几次

### 构建页面
```
npm run build
```

### 部署

本地开发用`npm run server`

线上用`pm2`运行`server/index.js`即可

## 制作字幕模板template.ass

首先使用aegisub为模板视频创建字幕，保存为template.ass（aegisub教程可以看这个 https://tieba.baidu.com/p/1360405931 ）
![图片](https://dn-coding-net-production-pp.qbox.me/56a213df-9ff7-41e0-9b6c-96b1f0fe2cb6.png)

然后把文本替换成模板字符串 <%= sentences[n] %>
![图片](https://dn-coding-net-production-pp.qbox.me/6b07bc65-c3d7-4251-aad2-bd7b05af9102.png)
