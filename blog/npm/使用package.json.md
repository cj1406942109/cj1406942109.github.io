# 使用package.json
> 记录时间：2018-10-27

管理本地安装的npm包，最好的方式就是使用`package.json`文件。

`package.json`文件的功能：

- 列出项目依赖的包。
- 允许你使用语义化版本规则去指定你的项目中能够使用的包的版本。
- 让你的构建过程可再生，因此更容易与其他开发人员共享。

## 要求

`package.json`文件必须包含`name`和`version`属性。

其中
- `name`：全部小写；一个单词，不能有空格；可以使用连接号或下划线。
- `version`：以`x.x.x`的形式；参考[语义化版本](https://www.npmjs.com.cn/getting-started/semantic-versioning/)

示例：
```json
{
  "name": "my-awesome-package",
  "version": "1.0.0"
}
```

## 创建package.json文件

### 运行CLI问卷

如果你想指定package.json文件中的字段值，可以运行
```sh
npm init
```

这会启动一个命令行问卷，完成之后，就会在你启动命令行的目录下创建一个对应的`package.json`文件。

### 默认package.json

如果你想创建一个默认的`package.json文件`，只需要在使用`npm init`命令时附加`--yes`或`-y` 参数：
```sh
npm init -y
```

这会在当前目录下创建一个`package.json`文件。
```json
{
  "name": "my_package",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```
其中：
- `name`：当前目录名
- `version`：总是`1.0.0`
- `description`：从readme文件中读取第一行，如果没有就是空字符串""
- `main`：总是`index.js`
- `scripts`：默认创建一个空的`test`脚本
- `keywords`：空
- `author`：空
- `license`：ISC
- `bugs`：从当前目录读取，如果有
- `homepage`：从当前目录读取，如果有s

你还可以为init命令设置几个配置选项。如:
```sh
npm set init.author.email "wombat@npmjs.com"
npm set init.author.name "ag_dubs"
npm set init.license "MIT"
```

这样以后每次执行`npm init -y`，就会使用配置好的选项。

## 自定义package.json问卷

如果在创建`package.json`文件时，你只想填其中的几个关键信息，你可以自定义问卷的字段。

在你的HOME目录下创建一个`.npm-init.js`文件`~/.npm-init.js`。

类似于：
```js
module.exports = {
  customField: 'Custom Field',
  otherCustomField: 'This field is really cool'
}
```

这时，再运行`npm init`，就会使用HOME目录下的`.npm-init.js`文件

```sh
{
  "name": "",
  "customField": "Custom Field",
  "otherCustomField": "This field is really cool",
  "version": ""
}
```

也可以使用`prompt`函数：
```js
module.exports = prompt("what's your favorite flavor of ice cream, buddy?", "I LIKE THEM ALL");
```

## 指定依赖

为了指定项目要依赖的包，需要在`package.json`文件中将其列出来。包分为两种：

- `"dependencies"`：这些包是在生产中要用到的
- `"devDependencies"`：这些包只在开发和测试过程中用到

## `--save`和`--save-dev`安装参数

要在你的`package.json`的`dependencies`中添加一条：
```sh
npm install <package_name> --save
```

要在你的`package.json`的`devDependencies`中添加一条：
```sh
npm install <package_name> --save-dev
```

