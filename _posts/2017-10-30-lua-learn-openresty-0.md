---
layout: post
title: Lua 学习记录（二）
date:       2017-10-30
author:     Seaton
catalog: true
tags:
    - lua
---

# 前言

使用 [OpenResty](http://openresty.org/cn/) 搭建服务器，开发接口

感谢章亦春、开涛等前辈

本文主要参考教程、代码 [跟我学OpenResty(Nginx+Lua)](http://jinnianshilongnian.iteye.com/blog/2190344)

# 环境、工具

windows 7系统

下载安装包 [openresty-1.11.2.5-win32.zip](https://openresty.org/download/openresty-1.11.2.5-win32.zip), 解压，点击 `nginx.exe` ，
浏览器输入 [http://localhost](http://localhost) 就可以看到效果了

其他环境的安装详见上面的参考教程

# 开发

## 常用命令

```shell
# 验证nginx配置文件是否正确
    nginx -t
# 重启nginx服务
    nginx -s reload
 ```

## 创建工作空间
    
在解压缩目录下新建文件夹 `workspace`（看个人习惯）

为方便管理，在 `workspace` 下新建文件夹 `conf`（配置）, `logs`（日志）, `common`（公共）, `src`（业务代码）

## 编写代码

代码见[learn-openResty-0](https://github.com/seaton-git/learn-openResty/tree/master/0)
    
## 执行命令

```shell
nginx -t
nginx -s reload
```
检测配置是否有误，重启服务

## 查看效果

访问 [http://localhost:8210/app/home](http://localhost:8210/app/home) 查看效果

# 总结

[OpenResty](http://openresty.org/cn/) 非常强大，这只是冰山一角，继续学习

本章代码 [learn-openResty-0](https://github.com/seaton-git/learn-openResty/tree/master/0)