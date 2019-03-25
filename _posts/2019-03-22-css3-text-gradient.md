---
layout: post
title: CSS3 文字颜色渐变
date:       2019-03-22
author:     Seaton
tags:
    - 前端开发
---


> 本文主要内容来源于 [前端观察](https://qianduan.net/css3-text-gradient/)

## 基础代码
```css
background-image: linear-gradient(180deg, rgba(228, 40, 72, 1) 0%, rgba(109, 11, 36, 1) 100%);
-webkit-background-clip: text;
color / -webkit-text-fill-color: transparent;
```

### background-image

设置文本区域背景色，非文字

### -webkit-background-clip: text

> background-clip 设置元素的背景（背景图片或颜色）是否延伸到边框下面

> -webkit-background-clip: text; 属性值 `text` 为 `webkit` 独有，其他高级浏览器有这个属性，但不支持 `text` 值

### -webkit-text-fill-color

指定文本字符的填充颜色，如不设置该值，则使用 `color` 属性值

## 原理说明

- 设置区域背景色及填充方式；
- `color / -webkit-text-fill-color`：使文字透明，露出背景色。因为其他浏览器不支持 `-webkit-background-clip: text;` 所以建议使用后者，`color` 属性会让文字在其他浏览器中透明；


## 效果图

![CSS3 文字颜色渐变](/img/posts/css3-text-gradient.png)

