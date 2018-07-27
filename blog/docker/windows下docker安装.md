# docker
> 记录时间：2018-07-26    

Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。容器是完全使用沙箱机制，相互之间不会有任何接口。

## windows下docker安装
1. 访问docker官网，注册一个[docker hub](https://hub.docker.com/)账号，**注意**：此处需要vpn访问外网，通过谷歌验证才能完成注册

2. 注册后，成功登录，访问[windows社区版下载页](https://store.docker.com/editions/community/docker-ce-desktop-windows)，点击下载即可。

3. 下载之后点击安装，很简单，不能自定义安装目录，默认装在`C:\Program Files\Docker`

4. 安装成功之后，需要重启电脑，然后启动docker

5. 注意，需要先启用win10的hyper-v程序，否则docker将启动失败，这里，我在选择windows container时，启动失败了，切换到linux container之后，成功启动

6. 设置：docker的镜像默认安装在c盘，为了避免c盘空间不够，修改其目录
  * windows10的docker使用的是Hyper-V虚拟机，所以镜像存放的目录就是Hyper-V的目录，首先停止docker，然后修改hyper-V的目录，默认为`C:\Users\Public\Documents\Hyper-V\Virtual hard disks`
  * 重启docker即可
  