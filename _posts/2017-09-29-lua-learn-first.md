---
layout: post
title: Lua 学习记录（一）
date:       2017-09-29
author:     Seaton
catalog: true
tags:
    - hmr
---

# 前言

看好几个同事项目中都用lua，又碰巧了解到用lua可以写魔兽世界的插件，激动激动，不如自学。以下为学习过程中的简单记录，仅供参考

本章为基础学习，从零开始，完全参考 [菜鸟教程](http://www.runoob.com/lua/lua-tutorial.html)

# Lua 数据类型

`Lua` 是动态类型语言，变量无需类型定义，只需赋值

基本类型：`nil`, `boolean`, `number`, `string`, `userdata`, `function`, `thread` 和 `table`

## string(字符串)

使用 `..` 连接字符串，例如 

```lua
"a" .. "b"
```

也可以用两个方括号来表示一块字符串

```lua
html = [[
    <html>
        <head></head>
    </html>
]]
```

## table(表)

通过 “构造表达式” 创建 `table`， 例如 `{}`

```lua
-- 创建空表
local table1 = {}

-- 直接初始化
local table2 = {'white', 'red', 'blue'}
```

表其实是一个 “关联数组(associative arrays)”，数组的索引可以是数字或者字符串

`Lua` 中表的默认初始索引一般以 `1` 开始

```lua
local table3 = {}
table3['key'] = 'hello'
table3[10] = 'world'

for k, v in pairs(table3) do
    print(k .. ' ： ' .. v)
end
```

## function(函数)

```lua
function func(n, fun)
    if n == 0 then
        print('hello Lua')
    else
        print('hello Lua demo')
    end
    
    fun(n)
end

func(1, function(n)
    print(n)
end
)
```

## thread(线程)

`Lua` 中，最主要的线程是协同程序(coroutine)，类似线程(thread)，有自己独立的栈、局部变量和指令指针

线程和协程的区别：线程可以同时多个运行，而协程任意时刻只能运行一个，并且处于运行状态的协程只有被挂起(suspend)时才会暂停

## userdata(自定义类型)

`userdata` 是一种自定义数据，用于表示由应用程序或C/C++语言库所创建的类型，可以将任意C/C++的任意数据类型的数据（通常是struct和指针）存储到 `Lua` 变量中调用