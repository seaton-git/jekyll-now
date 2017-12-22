---
layout: post
title:      vue同页面更新静态数据
date:       2017-12-05
author:     Seaton
catalog: true
tags:
    - vue
---

# 前情

为方便其他同学快速生成页面，抽离页面数据到js文件，之所以不用json，是为了方便使用require等，之后在 `Template.vue` 文件中根据路由 `require`
不同文件的数据来渲染页面

# 问题

因为组件只有一个 `Template.vue`，所以切换路由之后，组件并不会更新，其中的 `created` 只在渲染初执行一次

# 解决方案

在 `Template.vue` 中添加如下代码：

    watch: {
        '$route' (to, from) {
            // 重新引入数据
        }
    }
	
官网有详细说明[侦听属性](https://cn.vuejs.org/v2/guide/computed.html#计算属性-vs-侦听属性)
    
完毕