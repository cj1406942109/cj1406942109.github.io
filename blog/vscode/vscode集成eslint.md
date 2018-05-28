# vscode集成eslint
> 记录时间：2018-05-28

## vscode eslint 扩展
> 点击访问[eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)    
> 
> 该扩展使用打开的工作区文件夹下安装的eslint库，如果在该文件夹下没有找到，则该扩展会自动寻找全局安装的eslint版本。

如果本地和全局都没有安装eslint，可以：
```bash
  # 本地安装
  npm install eslint 

  # 全局安装
  npm install -g eslint
```

在新文件夹下，需要创建一个`.eslintrc`配置文件，可以：
* 使用vscode命令：`Create Eslint configuration`
* 在终端运行eslint命令：
    ```bash
      # 全局安装的eslint
      eslint --init

      # 本地安装的eslint, Windows下
      .\node_modules\.bin\eslint --init
      # 本地安装的eslint, Mac或Linux下
      ./node_modules/.bin/eslint --init
    ```

## 配置eslint扩展的vscode选项
该扩展提供了以下变量，可以在设置中进行配置：
* `eslint.enable`：启用/禁用eslint，默认启用
* `eslint.provideLintTask`：是否对整个工作区文件夹提供lint操作
* `eslint.packageManager`：控制使用包管理工具来解析eslint库，只有在eslint库被全局解析时才有效。有效值有：`npm`或`yarn`
* `eslint.options`：使用[ESLint CLI Engine API](https://eslint.org/docs/developer-guide/nodejs-api#cliengine)配置eslint如何启动，默认为空，要指向一个自定义的`.eslintrc.json`文件，示例如下：
  ```json
    {
      "eslint.options": { "configFile": "C:/mydirectory/.eslintrc.json" }
    }
  ```
* `eslint.run`：在输入(`onType`)时或者在保存(`onSave`)时运行linter，默认为`onType`
* `eslint.autoFixOnSave`：启用保存时自动修复。注意，保存时自动修复只有在VS Code的`files.autoSave`值是`off`、`onFocusChange`或`onWindowChange`时才有效，为`afterDelay`时不生效
* `eslint.nodePath`:如果安装的eslint包无法被检测到，则使用该设置，例如：`/myGlobalNodePackages/node_modules`
* `eslint.validate`：语言标识符数组，用于指定要验证的文件类型，如：`"eslint.validate": [ "javascript", "javascriptreact", "html" ]`，如果没有配置，则默认为`["javascript", "javascriptreact"]`。还可以控制哪个插件应该提供自动修复支持。只需要在设置里面添加一个包含`language`和`autoFix`属性的对象，如：`"eslint.validate": [ "javascript", "javascriptreact", { "language": "html", "autoFix": true } ]`
* `eslint.workingDirectories`：要使用的工作目录的数组，eslint相对于一个工作目录来解析配置文件。该设置允许用户控制哪个目录使用哪个文件，如下基本设置：
  ```
    client/
      .eslintignore
      .eslintrc.json
      client.js
    server/
      .eslintignore
      .eslintrc.json
      server.js
  ```
  然后使用以下配置：
  ```json
    "eslint.workingDirectories": [
      "./client", "./server"
    ]
  ```
  如果省略该设置，则工作目录是工作区文件夹。

## vscode 添加eslint对vue文件的支持
要添加eslint对vue文件的支持，只需要修改eslint的配置：
```json
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue"
  ]
```
