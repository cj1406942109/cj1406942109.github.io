# docker容器
> 记录时间：2018-07-27    
> 参考：https://docs.docker.com/get-started/part2/

## 创建一个docker容器
1. 新建一个目录，并切换到该目录
    ```sh
      mkdir container-test
      cd container-test
    ```

2. 创建一个名为`Dockerfile`的文件
    > 该文件在你的容器中定义环境相关的配置，访问在环境中虚拟化之后诸如网络接口、磁盘驱动的资源，它们独立于你的系统，因此需要与外界进行端口映射，并指定你想要复制到环境中的文件。  

    示例文件内容如下：
    ```sh
      # Use an official Python runtime as a parent image
      FROM python:2.7-slim

      # Set the working directory to /app
      WORKDIR /app

      # Copy the current directory contents into the container at /app
      ADD . /app

      # Install any needed packages specified in requirements.txt
      RUN pip install --trusted-host pypi.python.org -r requirements.txt

      # Make port 80 available to the world outside this container
      EXPOSE 80

      # Define environment variable
      ENV NAME World

      # Run app.py when the container launches
      CMD ["python", "app.py"]
    ```

3. 创建`requirements.txt`和`app.py`文件
    * `requirements.txt`
      ```
        Flask
        Redis
      ```
    * `app.py`
      ```py
        from flask import Flask
        from redis import Redis, RedisError
        import os
        import socket

        # Connect to Redis
        redis = Redis(host="redis", db=0, socket_connect_timeout=2, socket_timeout=2)

        app = Flask(__name__)

        @app.route("/")
        def hello():
            try:
                visits = redis.incr("counter")
            except RedisError:
                visits = "<i>cannot connect to Redis, counter disabled</i>"

            html = "<h3>Hello {name}!</h3>" \
                  "<b>Hostname:</b> {hostname}<br/>" \
                  "<b>Visits:</b> {visits}"
            return html.format(name=os.getenv("NAME", "world"), hostname=socket.gethostname(), visits=visits)

        if __name__ == "__main__":
            app.run(host='0.0.0.0', port=80)
      ```

4. 构建app
    ```sh
      # 查看当前目录下的文件
      $ ls

      Dockerfile		app.py			requirements.txt

      # 使用 docker build 命令进行构建
      $ docker build -t friendlyhello . # -t 用于给该镜像创建一个标签

      # 查看创建好的镜像
      $ docker image ls

      REPOSITORY            TAG                 IMAGE ID
      friendlyhello         latest              326387cea398
    ```

5. 运行app
    ```sh
      # 将本地机器的4000端口与容器的发布端口80进行映射
      docker run -p 4000:80 friendlyhello
    ```
    测试：
    * 打开本地浏览器访问：http://localhost:4000   
      尽管你看到`Running on http://0.0.0.0:80/ `的消息，但这是从容器内部发出来的，它并不知道你指定的映射端口是什么，所以，在浏览器应该输入正确的URL`http://localhost:4000`
    * 使用`curl`命令访问
        ```sh
          $ curl http://localhost:4000
          
          <h3>Hello World!</h3><b>Hostname:</b> 8fc990912a14<br/><b>Visits:</b> <i>cannot connect to Redis, counter disabled</i>
        ```
    **注意：** 在windows系统下，使用`CTRL+C`命令，不会停止容器，需要显式地停止容器，步骤如下：    

      1. 使用`CTRL+C`命令回到命令行，或者重新打开一个shell
      2. 输入`docker container ls`查看正在运行的容器
      3. 使用`docker container stop <Container NAME or ID>`命令停止容器
          ```sh
            $ docker container ls
            CONTAINER ID        IMAGE               COMMAND                ...
            99c48d68f9ce        friendlyhello       "python app.py"        ...

            $ docker container stop 99c48d68f9ce
            99c48d68f9ce
          ```
    
    **后台运行app：** 
    `docker run -d -p 4000:80 friendlyhello`

6. 分享镜像   
  注册中心是仓库的集合，仓库是镜像的集合，类似于github仓库。注册中心的一个账户可以创建多个仓库，`docker` CLI默认使用docker的公共注册中心(public registry)，你可以通过配置选择其他的注册中心
    1. 使用你的docker id进行登录
        ```sh
          $ docker login
        ```
    2. 给镜像打标签   
      使用`username/repository:tag`将本地镜像与注册中心的一个仓库建立联系，注册中心将根据`tag`为docker镜像创建版本，建议使用有实际意义的标签
        ```sh
          # 设置本地镜像要上传到注册中心的仓库
          $ docker tag image username/repository:tag # 如：docker tag friendlyhello gordon/get-started:part2
        ```
    3. 使用`docker image ls`命令查看新打标签的镜像
        ```sh
          $ docker image ls
            REPOSITORY               TAG                 IMAGE ID            CREATED             SIZE
            friendlyhello            latest              d9e555c53008        3 minutes ago       195MB
            gordon/get-started         part2               d9e555c53008        3 minutes ago       195MB
            python                   2.7-slim            1c7128a655f6        5 days ago          183MB
            ...
        ```

7. 发布镜像   
    将打了标签的镜像上传到仓库
    ```sh
      docker push username/repository:tag
    ```
    发布完成之后，该镜像就是公开可用的了，登录到[Docker Hub](https://hub.docker.com/)，你可以看到你的新镜像

8. 从远处仓库pull并运行镜像   
  现在，你可以使用`docker run`命令在任何机器上运行你的app了，如果本地机器没有改镜像，docker会从仓库pull下来
    ```sh
      docker run -p 4000:80 username/repository:tag
    ```
