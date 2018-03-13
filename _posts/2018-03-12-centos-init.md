---
layout: post
title: CentOS6.8 + nginx + jekyll搭建自己的博客
date:       2018-03-12
author:     Seaton
tags:
    - centOS
    - nginx
    - jekyll
---

# 前言

赶上腾讯云活动，买了云服，第一步想着先把自己的博客从github上迁移过来。

基础环境：1C2G1M，CentOS6.8，先前有在Red Hat上部署过java项目，还好命令记着些。

## 安装Nginx

1. 安装gcc, 编译器
        
        yum install gcc-c++
        
2. 安装PCRE, 是一个Perl库

        yum install -y pcre pcre-devel
        
3. 安装zlib，压缩、解压缩工具

        yum install -y zlib zlib-devel
        
4. 安装OpenSSL，后面配置https需要

        yum install -y openssl openssl-devel
        
5. 下载`*.tar.gz`安装包，地址[nginx](https://nginx.org/en/download.html)

        cd /usr/local/

    1). 我安装的是1.10版本，使用`wget`下载
    
        wget -c https://nginx.org/download/nginx-1.10.1.tar.gz
        
    2). 解压
    
        tar -zxvf nginx-1.10.1.tar.gz
        cd nginx-1.10.1
        
    3). 配置
    
     我用的是默认配置（此处有坑）,如果需要配置SSL，请使用第二行命令提前修改配置
     
        ./configure  // 默认配置
        
        ./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module  // 开启SSL 模块
        
     4). 编译安装
     
        make
        make install
        
     5). 查找安装路径
        
        whereis nginx
        
     6). 进入nginx安装目录
     
        cd /usr/local/nginx/sbin
        
     7). 启动、停止
     
        ./nginx -s reload  // 启动
        ./nginx -s stop  //  停止
        
     具体命令可以去官网查看详细说明
     
     8). 访问云服公网ip,显示 Welcome to nginx! 即表示启动成功
     
### nginx 问题、小技巧

1. 启动nginx之后，关闭再重启，可能会出现：

        nginx: [error] open() "/usr/local/nginx/logs/nginx.pid" failed (2: No such file or directory)
        
   类似错误，关键字 `nginx.pid`
   
   导致原因是杀掉nginx进程之后，pid无法找得到
   
   解决方案:
   
        /usr/local/nginx/sbin/nginx  -c  /usr/local/nginx/conf/nginx.conf
        
    使用nginx -c 指定nginx.conf文件的位置
    
2. 添加环境变量

        vim /etc/profile
        
    尾行添加：
            
        PATH=$PATH:/usr/local/nginx/sbin
        export PATH
        
    保存关闭之后，运行：
    
        source /etc/profile
        
    之后就可以直接使用 `nginx` 来执行命令了，至此，nginx 安装完毕！
        
        
## 安装Ruby

1. 安装，直接`yum`安装版本太低，后面`gem`安装时会报错

        wget https://cache.ruby-lang.org/pub/ruby/2.3/ruby-2.3.6.tar.gz
        
        tar -zxvf ruby-2.3.6.tar.gz
        cd ruby-2.3.6
        ./configure
        make
        make install
        
2. 测试

        ruby -v
        
   显示版本号即为成功
   
## 安装RubyGems

1. 安装

        参考[RubyChina](https://gems.ruby-china.org/)
        
2. 测试
        
        gem -v
        
   显示版本号即为成功
   
## 安装nodeJS

        cd /usr/local/

1. 下载`*.tar.gz`文件，我装的是6.10.0版本

        wget https://nodejs.org/dist/v6.10.0/node-v6.10.0-linux-x86.tar.gz
    
2. 解压

        tar -zxvf node-v6.10.0-linux-x86.tar.gz
    
3. 重命名(可选)

        mv node-v6.10.0-linux-x86.tar.gz nodejs
    
4. 查看必要文件是否存在

        cd nodejs/bin/
    
        ls
    
    查看`node`, `npm` 是否存在
    
5. 测试是否正常

        ./node -v
        ./npm -v
    
6. 添加软链接,方便全局使用

        ln -s /usr/local/nodejs/bin/node /usr/bin/node
        ln -s /usr/local/nodejs/bin/npm /usr/bin/npm
        
   此处注意两点,
   1). `ln`,是小写的`L`，不是大写`I`，有好些朋友都搞错了
   2). 目标路径为`/usr/bin`，看到有朋友写的是`/usr/local`，亲测无效
   
7. 测试

    在任意目录下使用：
    
        node -v
        npm -v
        
    显示版本号即为成功，至此`nodeJS` 安装完毕
    
## 安装Python2.7

1. 系统自带为`2.6`版本，需升级至`2.7`

        wget https://www.python.org/ftp/python/2.7.6/Python-2.7.6.tgz
        
2. 解压，重命名(可选)

        tar -zxvf Python-2.7.6.tgz
        mv Python-2.7.6.tgz python2.7
        
3. 编译、安装
        
        ./configure // 配置
        make
        make install
        
4. 测试

        python -V  // 一定要注意，是大写 V
        
   显示版本号还是`2.6.*`，是因为软链接还没更新，执行下面命令：
   
        rm -fr /usr/bin/python
        ln -s /usr/local/python2.7/python /usr/bin/python   // 指向目录填写自己的即可
        
    再测试，显示`2.7.6`
    
5. 问题

    由于`yum`命令不兼容`python2.7`,需修改`/usr/bin/yum`
    
    首先查看`/usr/bin`下`python`有几个版本，我这边有`2.6`, `2.7`
    
    将`/usr/bin/yum`第一行由`#!/usr/bin/python`改为
    `#!/usr/bin/python2.6`
    
    `python`安装完毕
    
     
## 安装Jekyll

1. 执行以下命令

        gem install jekyll
        gem install bundler
        gem install minima // 这个可以不装，是jekyll默认的主题，而且貌似也装不上，下载不了
        
2. 在个人工作目录中新建

        cd /home
        mkdir blog
        cd blog 
        jekyll new myblog
        cd myblog
        jekyll serve
        
    不出意外会提示访问`http://localhost:4000`端口访问，在`nginx`中配置一下代理，就可以看到效果了（基本无样式）

## 安装git

1. 安装依赖包
        
        yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel perl-ExtUtils-MakeMaker

2. 下载git源码

        wget https://www.kernel.org/pub/software/scm/git/git-2.11.0.tar.gz
        tar -zxvf git-2.11.0.tar.gz
        cd git-2.11.0
        
3. 编译安装

        make prefix=/usr/local/git all
        make prefix=/usr/local/git install  // git可以自定义命名
        
4. 配置环境变量

    修改 `/etc/bashrc`文件，在尾行添加：
    
        export PATH=/usr/local/git/bin:$PATH
        
5. 测试

        source /etc/bashrc
        git --version
        
   显示版本号即为成功
   
6. 配置信息

        git config --global user.name 'name' 
        git config --global user.email 'email'
        
## 获取项目

删除jekyll默认项目，拉取自己的blog

        cd /home/blog/  // 随意，个人目录
        git clone blog_url
        
        jekyll serve --detach  // 启动项目，脱离终端运行
        
## SSL 配置

[腾讯云](https://buy.cloud.tencent.com/ssl?fromSource=ssl)、[阿里云](https://common-buy.aliyun.com/?spm=5176.7968328.911106.btn1.15e74ebf9DhELZ&commodityCode=cas#/buy)、[freeSSL](https://freessl.org/)
均有免费SSL证书，申请即可

配置nginx ssl服务

        server {
             listen 80 default backlog=2048;
             listen 443 ssl;
             server_name seaton.wang;
          
             ssl_certificate /usr/local/nginx/chain/full_chain.crt;   // 自己存放证书的路径
             ssl_certificate_key /usr/local/nginx/chain/private.key;  // 自己存放证书的路径
        }
        
重启nginx服务，如果报错：
        
        nginx: [emerg] the "ssl" parameter requires ngx_http_ssl_module...
        
参考[ノGHJ的博客](https://www.cnblogs.com/ghjbk/p/6744131.html)，有详细说明，即可解决，感谢！

至此，就可以使用[https://www.seaton.wang](https://www.seaton.wang)访问了！！！