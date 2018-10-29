# npm scripts
> 记录时间：2018-10-27

npm如何处理`scripts`字段

## 描述

对于以下脚本，npm在`package.json`文件中的`scripts`属性中支持：

- prepublish： 在package打包和发布之前运行，在不使用参数的本地`npm install`下也生效。
- prepare： 在package打包发布之前运行，在不使用参数的本地`npm install`下也生效，在`prepublish`之后运行，在`prepublishOnly`之前运行。
- prepublishOnly：在package准备好和打包之前运行，只在`npm publish`下有效。
- prepack：在源码打包之前运行。
- postpack：在源码打包并且移动到最终目的地之后运行。
- publish, postpublish：在package发布之后运行。
- preinstall：在package安装之前运行。
- install, postinstall：在package安装之后运行。
- preuninstall, uninstall：在package卸载之前运行。
- postuninstall：在package卸载之后运行。
- preversion：在生成package版本之前运行。
- version：在生成package版本之后，但是commit之前运行。
- postversion：在生成package版本之后，且commit之后运行。
- pretest, test, posttest：通过`npm test`命令执行。
- prestop, stop, poststop：通过`npm stop`命令执行。
- prestart, start, poststart：通过`npm start`命令执行。
- prerestart, restart, postrestart：通过`npm restart`命令执行。注意：如果没有提供`restart`脚本，将会执行`stop`和`start`脚本。
- preshrinkwrap, shrinkwrap, postshrinkwrap：通过`npm shrinkwrap`命令执行。

此外，还可以使用`npm run-script <stage>`执行任意脚本。`pre`和`post`匹配对应的名字的脚本也会运行（如`premyscript`, `myscript`, `postmyscript`）。

## 默认值

npm根据package内容提供不同的默认值。

如果package的根目录下有一个`server.js`文件则`start`命令值为：
`"start": "node server.js"`

如果package的根目录下有一个`binding.gyp`文件，并且你没有定义自己的`install`和`preinstall`脚本，npm会默认设置`install`命令使用node-gyp去编译：
`"install": "node-gyp rebuild"`

## 退出

脚本通过将设置的值作为脚本参数传递给`sh`去运行。

如果脚本退出码不为0，那么将会终止该进程。

注意：这些脚本文件，不需要一定是nodejs或者JavaScript程序，只需要它们是可执行文件。
