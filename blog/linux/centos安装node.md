# centos 安装node
> 记录时间：2017-10-08

源码编译方式安装

## 下载源码
> 当前最新版：https://nodejs.org/dist/v6.11.4/node-v6.11.4.tar.gz
> 官网下载页面：https://nodejs.org/en/download/


## 解压源码


## 编译安装


## 配置环境变量

## 验证



    ```bash
        # 切换到安装目录
        cd /usr/local/src

        # 下载源码压缩包
        wget https://nodejs.org/dist/v6.11.4/node-v6.11.4.tar.gz

        # 解压源码
        tar zxvf node-v6.11.4.tar.gz

        # 编译安装
        cd node-v6.11.4.tar.gz

        ./configure --prefix=/usr/local/node/6.11.4

        # 执行make命令之前，请确保已经安装了gcc、g++ 
        # 如果没安装，执行命令：
        # yum install gcc 
        # yum install gcc-c++
        make

        make install

        # 配置NODE_HOME，进入profile编辑环境变量
        vim /etc/profile

        # 设置nodejs环境变量，在 export PATH USER LOGNAME MAIL HOSTNAME HISTSIZE HISTCONTROL 一行的上面添加如下内容:        
        > #set for nodejs
        > export NODE_HOME=/usr/local/node/0.10.24
        > export PATH=$NODE_HOME/bin:$PATH

        # :wq保存并退出，编译/etc/profile 使配置生效
        source /etc/profile

        # 验证是否安装配置成功
        node -v
        # 输出 v6.11.4 表示配置成功
        # npm模块安装路径：/usr/local/node/6.11.4/lib/node_modules/
    ```