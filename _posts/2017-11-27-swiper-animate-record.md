---
layout: post
title: 使用swiper-animate问题记录
date:       2017-11-27
author:     Seaton
catalog: true
tags:
    - 前端开发
---

使用 [swiper-animate](http://www.swiper.com.cn)时，遇到几个问题，特记录。

### 图片旋转抖动问题

使用 `rotate*` 动画会出现图片旋转一周之后抖动的问题，很影响美观，经朋友指点后，改用 `rotateZ` 实现，效果立马改观，代码如下：

    @-webkit-keyframes --rotate-clockwise { # 自定义动画名称
        0% {
            -webkit-transform-origin: center;
            transform-origin: center;
            -webkit-transform:rotateZ(0deg);
            transform:rotateZ(0deg);
        }
    
        100% {
            -webkit-transform-origin: center;
            transform-origin: center;
            -webkit-transform:rotateZ(360deg);
            transform:rotateZ(360deg);
        }
    }
    
    @keyframes --rotate-clockwise {
        0% {
            -webkit-transform-origin: center;
            transform-origin: center;
            -webkit-transform:rotateZ(0deg);
            transform:rotateZ(0deg);
        }
    
        100% {
            -webkit-transform-origin: center;
            transform-origin: center;
            -webkit-transform:rotateZ(360deg);
            transform:rotateZ(360deg);
        }
    }
    
### 微信浏览器内闪屏问题

使用 `bounce*` 等动画，在微信浏览器内，加载时会出现闪屏问题，添加以下css到对应dom，建议直接添加到 `*` 下，代码如下：

    *{-webkit-backface-visibility: hidden;backface-visibility: hidden;-webkit-transform-style: preserve-3d;transform-style: preserve-3d;}

