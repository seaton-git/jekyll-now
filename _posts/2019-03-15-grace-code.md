---
layout: post
title: 优雅code持续记录
date:       2019-03-15
author:     Seaton
catalog:    true
tags:
    - Code
---

## 书写规范

推荐airbnb的书写规范 [airbnb/javascript](https://github.com/airbnb/javascript?utm_source=gold_browser_extension)

## 集合

1. 文件头声明
```js
/**
* 组件描述
* @author  Seaton （要为自己的代码负责）
* @date    2018-11-09 15:35
*/      
<!-- 
组件描述
@author  Seaton （要为自己的代码负责）
@date    2018-11-09 15:35
-->
 ```   

2. 方法内，模块分段，首尾无需空行
```js
function devtoolPlugin (store) {
    // 首段无需空行
    if (!devtoolHook) { return }
    store._devtoolHook = devtoolHook

    // 为分段添加注释，空行，清晰
    devtoolHook.emit('vuex:init', store)
    devtoolHook.on('vuex:travel-to-state', function (targetState) {
      store.replaceState(targetState)
    })
    store.subscribe(function (mutation, state) {
      devtoolHook.emit('vuex:mutation', mutation, state);
    })
}
``` 

3. 方法添加多行注释，说明功能，参数
```js
/**
* forEach for object
* @param   obj 对象
* @param   fn  回调函数
*/
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key) })
}
```   
4. 避免在分段顶部及行尾部同时注释，`eslint` 或者 IDE 内会有不友好提示
```js  
  // 描述
  let a = 123 // 赋值
```   

5. 以 `vue` 文件为例，属性、方法间应有空行
  ```js
    data () {
      return {}
    },

    methods: {
      /**
      * 初始化
      * /
      init () {
      ...
      },

      /**
      * 购买
      * /
      buy () {
      ...
      }
    }
  ```    
6. 方法内局部/私有属性定义添加 `_` 前缀
```js
function test () {
  let _id = this.id
}
 ```   

## 目标

- 代码结构清晰，不杂糅一团
- 注释详尽，方便优化、更新
- 解耦，减少嵌套回调并使用声明方法形式
    