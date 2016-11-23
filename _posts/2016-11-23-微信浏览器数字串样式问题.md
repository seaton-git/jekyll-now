---
layout: post
title: 微信浏览器内数字串样式问题
---


    <meta name="format-detection" content="telephone=no"/>

在iphone手机上默认值是`yes`，微信浏览器会渲染数字串为#333，其他手机浏览器正常。

发生场景举例如下：

    var span = document.createElement("span");
    span.style.color = "#FF0000";
    span.innerHTML = "347238473284";
    document.querySelector("body").appendChild(span);

上面的代码在微信浏览器内的效果为：渲染为`#FF0000` -> 变成`#333333`

在`head`内添加开篇`meta`解决。

