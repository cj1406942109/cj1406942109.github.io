# Windows 下安装 Android Studio
> 记录时间：2018-10-12

## 下载

访问[http://www.android-studio.org](http://www.android-studio.org/)网站，找到Android Studio的[下载链接](https://dl.google.com/dl/android/studio/install/3.2.0.26/android-studio-ide-181.5014246-windows.exe)，点击下载即可。

## 安装

安装比较简单，详情可以参考[博客](https://www.cnblogs.com/xiadewang/p/7820377.html)

注意问题：

1. 安装时，默认情况会出现`Unable to access Android SDK add-on list`错误，这是因为其源需要翻墙才能访问，这里使用的解决方法是，点击下方的`setup proxy`按钮，设置代理。可使用代理软件[Shadowsocks](https://github.com/shadowsocks/shadowsocks-windows)等。
2. 安装成功之后，点击`Config\Settings\`，搜索`encoding`，将`Project Encoding`和`Default encoding for properties files`设置为`UTF-8`。

## 新建项目

参考[博客](https://www.cnblogs.com/xiadewang/p/7820377.html)新建项目，这里在安装[gradle](https://gradle.org/)时同样需要翻墙，设置代理之后，可能会下载失败，点击右上角的`Try Again`，多试几次即可。

## 生成apk

点击`Build\Build Bundle(s)/APK(s)\Build/APK(s)`，就可以在`项目目录/app/build/outputs/apk/debug/app-debug.apk`下，找到构建好的app，安装到手机上，就可以运行了。
