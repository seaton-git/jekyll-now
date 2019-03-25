---
layout: post
title: typescript初探
date:       2018-08-12
author:     Seaton
tags:
    - 前端开发
---

## 起步

[文档](https://www.tslang.cn/docs/home.html)

### 类型注解

> TypeScript里的类型注解是一种轻量级的为函数或变量添加约束的方式

```js
function greeter(person: string) {
  return "Hello, " + person;
}

let name: string = 'ts'
let isBoy: boolean = true
let list: number[] = [1, 2, 3]
let list: Array<number> = [1, 2, 3] // 数组泛型
let map: any[] = [1, '2']
let map: Array<any> = [1, '2']

// 元祖
let x: [string, number]
x = ['hello', 123] // ok
x = [10, 9] // error

// 枚举
enum Colr {Red, Green, Blue}
let c: Color = Color.Green
let d: Color = Color[1] // Green

// Any
为在编程阶段还不清楚类型的变量指定一个类型

跟Object不同，Object允许赋任意值，但是不能调用任意方法

let a: Object = 4
a.toFixed() // error

// void
无返回值，常用于函数，变量只能赋值为null和undefined

// Null和Undefined
对应null 和 undefined

// Never，基本用不上
表示永不存在的值
是任何类型的子类型
返回never的函数必须存在无法达到的终点，例如throw、Error、while(true)

// 联合类型, 只能访问联合类型的所有类型里共有的成员
let value = string | number | boolean
function pet(): Fish | Bird { ... }
```
    

- 传入数据类型不匹配，编译报错
- 删除参数，告知异常

### 类型断言

> 告诉编译器，`我知道`

```js
// 两种类型
let someValue: any = 'this is a string'

let strLength: number = (<string>someValue).length // <> 形式

let strLength: number = (someValue as string).length // as 语法
```
### 接口

> 只在两个类型内部的结构兼容那么这两个类型就是兼容的

```js
interface Person {
    firstName: string
    lastName: string 
}

function greeter(person: Person) {
    ...
}

let user = { firstName: 'Jane', lastName: 'User' }

greeter(user)
```
- `user`内部结构同`Person`相同，所以不报错

### 类

> 一切皆对象，类即是对象的抽象定义

> 在构造函数的参数上使用public等同于创建了同名的成员变量

```js
class Student {
fullName: string;
constructor(public firstName, public middleInitial, public lastName) {
  this.fullName = firstName + " " + middleInitial + " " + lastName;
}
}

interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person : Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

greeter(user);
```

## vue-cli 添加 ts 支持

1. 安装依赖，版本不宜过高，建议3.2
```shell
npm i typescript ts-loader -S
```
2. 配置 webpack.base.conf.js
```js
module.exports = {
  // 修改入口文件
  entry: './src/main.ts',
  // 引入 ts/tsx 文件时不必后缀 
  resolve: {
          extensions: ['.js', '.vue', '.json', '.ts', '.tsx'],
          alias: {
          'vue$': 'vue/dist/vue.esm.js',
          '@': resolve('src'),
          }
  },
  module: {
          // 对 ts 使用 ts-loader
          {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
          "babel-loader",
          {
          loader: "ts-loader",
          options: { appendTsxSuffixTo: [/\.vue$/] }
          }
          ]
          }
          // ...其他
  }
}
```   
3. 创建 `.d.ts` 文件让`TypeScript`识别 `.vue` 文件，存放 `src/typings`
```js
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
```  
4. 添加 `tsconfig.json` 配置文件

[tsconfig.json 配置文件说明](https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/tsconfig.json.html)

5. `.vue`文件

    - 在 `script` 标签上添加 `lang="ts"`
    - 安装 `Component` 插件
    

    npm i vue-class-component -S
    
推荐使用另外一个基于 `vue-class-component` 的插件 [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator) 提供了 `Watch`、 `Prop`、 `Emit`等[修饰器](http://es6.ruanyifeng.com/#docs/decorator)

6. Vue Router

在 `router/index.ts` 内添加 `interface` 即可

使用导航钩子，必须在使用之前注册
```js
import Component from 'vue-class-component'

// Register the router hooks with their nameshooks
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate' 
])
```   
7. 识别Vuex

    - `interface` 声明 `State`
    - `state` 实现 `State`
    
## 添加tslint

1. 安装插件
```shell
npm i tslint-loader tslint tslint-config-standard -S
 ```   
2. 配置webpack
```js
module: {
  rules: [
    ...
    {
    test: /\.ts$/,
    exclude: /node_modules/,
    enforce: 'pre',
    loader: 'tslint-loader'
    },
    ...
  }
}
 ```   
3. 根目录下添加tslint.json文件，内容如下：
```js
{
  "extends": "tslint-config-standard",
  "globals": {
    "require": true
  }
}
```


    

            