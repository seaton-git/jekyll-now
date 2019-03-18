---
layout: post
title: 使用热加载开发多页面web应用
date:       2017-08-24
author:     Seaton
catalog: true
tags:
    - 前端开发
---

# 写在前面

工作中有时需要开发一些静态页面，改了之后还要切换到html摁一下f5看效果，着实浪费我的两台显示器。

因为开发vue，react等，对热加载很是感兴趣，可是都停留在使用`vue-cli`等地步。

终于得空，参考 [kingvid-chan](https://github.com/kingvid-chan/webpack2-lessons) 的代码，搭了一个简单的多页面web应用脚手架。

过程很美好，对webpack、hmr以及其他插件都有了更深的了解，特此记录。

# github
 
 [MPA](https://github.com/seaton-git/MPA) ， 欢迎指正