# express中使用apidoc
> 记录时间：2018-06-02

## apidoc
[apidoc](http://apidocjs.com/)可以从你的源码中根据api注释创建文档。

## 安装
全局安装或本地安装
```bash
  # 全局安装
  npm install apidoc -g

  # 本地安装
  npm install apidoc --save-dev
```

## 运行
```bash
  apidoc -i myapp/ -o apidoc/ -t mytemplate/
```
以上命令的含义为：使用`mytemplate`目录中的模板来创建`myapp`目录下的所有文件的apidoc，并将它们放到`apidoc`目录下。   

没有指定参数时：apidoc从所有`cs .dart .erl .go .java .js .php .py .rb .ts`文件生成apidoc，并将其放到`./doc`目录下。

## 详细参数
具体参数及文档写法参考[官方文档](http://apidocjs.com/#params)，此处不作赘述。
