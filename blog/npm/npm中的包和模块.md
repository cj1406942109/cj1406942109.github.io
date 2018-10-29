# npm中的包和模块
> 记录时间：2018-10-27

## 概述

- 包（package）是使用`package.json`描述的一个文件或目录。
- 模块（module）是可以使用Node.js的`require()`加载的任何文件或目录。

## 什么是包

包是以下：

- a 一个包含一个程序的文件夹，使用`package.json`文件描述
- b 一个包含a的代码压缩包
- c 一个指向b的url
- d 在注册中心使用c发布的<name>@<version>
- e 指向d的<name>@<tag>
- f 满足e的有`latest`标签的<name>
- 克隆之后产生a的一个git的url

由于以上这些可能性，即使你从未在注册中心发不过包，你仍能够使用很多npm的好处：

- 如果你只想写一个node程序
- 或者，你也希望将其打包之后能够在其他地方轻松安装

## 什么是模块

模块是可以Nodejs程序中使用`require()`加载的任何东西。一下是可以作为模块加载的示例：

- 一个包含`package.json`文件的文件夹，并且`package.json`文件中指定了`main`字段
- 一个包含`index.js`文件的文件夹
- 一个JavaScript文件

## 大多数的包都是模块

一般情况下，在Node.js程序中使用的包，用`require`进行加载，使它们变成模块。但是没有要求npm包一定是模块。

一些包，如`cli`包，值包含一个可执行的命令行界面，不提供`mian`字段，这些包就不是模块。

几乎所有的npm包，都包含了很多模块。

在Node程序上下文中，模块也指从一个文件加载的内容，如：
```js
var req = require('request')
```
我们可能会说`req`变量指向了`request`模块。
