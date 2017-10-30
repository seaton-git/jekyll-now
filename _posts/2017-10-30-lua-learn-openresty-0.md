---
layout: post
title: Lua 学习记录（二）
date:       2017-10-30
author:     Seaton
catalog: true
tags:
    - lua
    - OpenResty
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

    # 验证nginx配置文件是否正确
      nginx -t
    # 重启nginx服务
      nginx -s reload
      
## 创建工作空间
    
在解压缩目录下新建文件夹 `workspace`（看个人习惯）

为方便管理，在 `workspace` 下新建文件夹 `conf`（配置）, `logs`（日志）, `common`（公共）, `src`（业务代码）

## 编写代码

### lua.conf

在 `workspace/conf/` 下，新建 `lua.conf`

在解压缩目录下 `conf` 文件夹下的 `nginx.conf` 文件中的 `http` 区域内添加：

    lua_package_path 'workspace/?.lua;;';
    include ../workspace/conf/lua.conf;
    
`workspace` 改成自己的文件夹名称

`lua.conf` 代码如下

    #lua.conf
    
    # 指定log打印文件
    error_log workspace/logs/error.log;
    
    # 设置允许跨域请求，方便测试
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Headers X-Requested-With;
    add_header Access-Control-Allow-Methods GET,POST,OPTIONS;
    
    # 自定义服务
    server {
    	listen   8210;  # 自定义端口
    	server_name  _;
    
    	default_type text/html;
    
    	location /index {
    	    content_by_lua_file  /workspace/index.lua;
    	}
    	
    	location ~ ^/app/([-_a-zA-Z0-9/]+) {  # 使用正则匹配访问文件， 例如 /app/home, 访问 src下 home.lua
    		set $path $1;
    		lua_code_cache off;
    		content_by_lua_file  /workspace/src/$path.lua;
    	}
    }
    
### error.log

在 `workspace/logs/` 下，新建 `error.log`

### db_factory.lua

在 `workspace/common/` 下，新建 `db_factory.lua`， 提供数据库基础配置

数据库连接信息按照自己的修改即可

代码如下：
    
    local mysql = require('resty.mysql')
    
    function close_db(db)
        if not db then
            return
        end
        db:close()
    end
    
    -- 创建实例
    db, err = mysql:new()
    
    if not db then
        ngx.say('new mysql error:', err)
        return
    end
    
    -- 设置超时时间（毫秒）
    db:set_timeout(2000)
    
    props = {
        host = '127.0.0.1',
        port = 3306,
        database = 'lua',
        user = 'root',
        password = 'root',
        charset = 'utf8'
    }
    
### home.lua

在 `workspace/src/` 下，新建 `home.lua`，实现数据库连接、查询操作

查询sql语句按照自己的数据库表结构修改

代码如下：
    require('common.db_factory')
    local cjson = require("cjson")
    
    res, err, errno, sqlstate = db:connect(props)  -- 创建连接
    
    local select_sql = 'select id, name from tb_test'
    res, err, errno, sqlstate = db:query(select_sql)  -- 执行sql
    if not res then
        ngx.say('connect to mysql error: ', err, ', errno: ', errno, ', sqlstate: ', sqlstate)
        return close_db(db)
    else
        ngx.say(cjson.encode(res))
        return close_db(db)
    end
    
## 执行命令

    nginx -t
    nginx -s reload
    
检测配置是否有误，重启服务

## 查看效果

访问 [http://localhost:8210/app/home](http://localhost:8210/app/home) 查看效果

# 总结

[OpenResty](http://openresty.org/cn/) 非常强大，这只是冰山一角，继续学习

本章代码 [learn-openResty-0](https://github.com/seaton-git/learn-openResty/tree/master/0)