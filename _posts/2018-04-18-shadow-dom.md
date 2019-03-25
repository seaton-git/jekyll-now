---
layout: post
title: 隐藏video标签下载按钮
date:       2018-04-18
author:     Seaton
tags:
    - 前端开发
---

## 问题描述

隐藏video标签的下载按钮

## 解决方案

> 使用`shadow-dom`

1.	设置`controls`区域宽度，超过隐藏
```css
	video::-webkit-media-controls-enclosure{ overflow: hidden; }
	video::-webkit-media-controls-panel{ width: calc(100% + 30px); }
```
> 设置`video`属性

1.	设置`video`的属性`controlslist`
```html
	controlslist="nodownload"
```
	另外也可以隐藏全屏播放按钮
```html
	controlislist="nofullscreen"
```
	但是此方法有兼容问题，移动端vivo手机亲测无效
	