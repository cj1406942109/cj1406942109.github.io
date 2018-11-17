# 解决bundle install无响应的问题
> 记录时间：2018-11-17

## 问题

使用`bundle install` 安装`Gemfile`中的依赖时，遇到长时间无响应的情况。

其原因为：访问国外镜像源`https://rubygems.org`速度较慢。

## 解决方案

此处使用 `Gemfile`和`Bundler`，可以用 Bundler 的 Gem 源代码镜像命令：
```sh
$ bundle config mirror.https://rubygems.org https://gems.ruby-china.com
```

这样就不需要修改`Gemfile`中的`source`：
```gemfile
source 'https://rubygems.org/'
gem 'rails', '4.2.5'
...
```

> 详情请参考[官方网站](https://gems.ruby-china.com/)
