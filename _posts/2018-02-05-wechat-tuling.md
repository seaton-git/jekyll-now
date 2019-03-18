---
layout: post
title: itchat（一）
date:       2018-02-05
author:     Seaton
tags:
    - python
    - itchat
---

> 以下内容均在windows平台

## 安装python

[官网地址 v2.7.14](https://www.python.org/downloads/)，推荐安装`2.7.*`

安装过程中，一定要勾选`pip`, `Add python.exe to Path`组件，`pip`用于安装其他组件

之后重启电脑，不然终端输入`python` 会显示“不是内部或外部命令...”

## 安装itchat

[itchat](http://itchat.readthedocs.io/zh/latest/)是一个开源的微信个人号接口

在终端执行以下代码：
    
    pip install itchat

## 注册图灵机器人

普通注册，无特殊说明，注册成功后的`key`后文会使用到

## 代码

创建`index.py`，写入下列代码：

    import itchat, time, re
    from itchat.content import *
    import urllib2, urllib
    import json
    
    @itchat.msg_register([TEXT])
    def text_reply(msg):
    		info = msg['Text'].encode('UTF-8')
    		url = 'http://www.tuling123.com/openapi/api'
    		data = {"key": "填写自己的key", "info": info, "loc": "", "userid": ""}
    		data = urllib.urlencode(data)
    		
    		url2 = urllib2.Request(url, data)
    		
    		response = urllib2.urlopen(url2)
    		
    		apicontent = response.read()
    		s = json.loads(apicontent, encoding='utf-8')
    		print 's==', s
    		if s['code'] == 100000:
    			itchat.send(s['text'], msg['FromUserName'])
    			
    itchat.auto_login(enableCmdQR=1, hotReload=True) // enableCmdQR表示终端显示的二维码大小
    itchat.run(debug=True)
    
## 运行

双击`index.py`，启动终端，自动绘制QR，扫描即可

## 完结

其他好友或自己发送文本信息，查看是否自动回应

仅供测试，尝鲜

