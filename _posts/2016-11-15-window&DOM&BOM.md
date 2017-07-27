---
layout: post
title: JavaScript中的window对象属于DOM还是BOM？
---

# 概念

JavaScript由三部分组成：EMCAScript、DOM、BOM

DOM是一个使程序和脚本有能力动态地访问和更新文档的内容、结构以及样式的平台和语言中的接口。而BOM定义了JavaScript可以进行操作的浏览器的各个功能部件的接口。两者皆为接口定义。

* DOM是W3C的标准（所有浏览器公共遵守的标准）
* BOM是各个浏览器厂商根据DOM在各自浏览器上的实现
* window是BOM对象，而非JavaScript对象，不过恰好为EMCAScript中定义的Global对象

# 结论

BOM的核心是window，而window对象又具有双重角色，它既是通过JavaScript访问浏览器窗口的一个接口，又是一个Global全局对象。

由于window包含了document，因此JavaScript可以直接通过使用window的document对象来访问、检索、修改文档内容与结构。
因为document对象又是DOM的根节点，所以可以理解为BOM包含了DOM。即浏览器提供出来给予访问的是BOM对象，而BOM对象再访问到DOM对象，
从而JavaScript可以操作浏览器以及浏览器读取到的文档。