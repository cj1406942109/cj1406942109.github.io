# 运行一个简单的本地http服务器

## 1. 可以使用`Python`的`SimpleHttpServer`模块

1. 安装python
2. 输入以下命令查看python版本
   ```bash
         python -V
   ```
3. 切换到要启动服务器的目录，如：
   ```bash
     cd Desktop
   ```
4. 输入命令在该目录中启动服务器
   ```bash
     # 如果python版本为3.x
     python -m http.server
     # 如果python版本为2.x
     python -mSimpleHTTPServer
   ```
5. 默认情况下，将在本地web服务器的8000端口上运行目录的内容。可以转到浏览器的`localhost:8000`URL来访问此服务器。
