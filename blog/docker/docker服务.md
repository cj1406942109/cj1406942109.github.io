# docker服务
> 记录时间：2018-07-27    
> 参考：https://docs.docker.com/get-started/part3/

为了扩展应用程序并启用负载平衡，必须在分布式应用程序的层次结构中提升一级：服务。

## 创建一个`docker-compose.yml`文件
在docker平台中，只需要创建一个`docker-compose.yml`文件，就可以实现服务的定义，运行与扩展。
```yml
  # docker-compose.yml

  version: "3"
  services:
    web:
      # replace username/repo:tag with your name and image details
      image: username/repo:tag
      deploy:
        replicas: 5
        resources:
          limits:
            cpus: "0.1"
            memory: 50M
        restart_policy:
          condition: on-failure
      ports:
        - "4000:80"
      networks:
        - webnet
  networks:
    webnet:
```
`docker-compose.yml`文件告诉docker执行以下操作：
* 将指定的镜像从注册中心pull下来
* 将该镜像的5个实例作为名为`web`的服务运行，限制每个实例最多使用`10%`的CPU和`50MB`的内存资源
* 如果一个实例失败了，则立即重启容器
* 将主机的`4000`端口映射到`web`服务的`80`端口
* 指定`web`服务的容器通过称为`webnet`的负载均衡网络共享`80`端口。
* 使用默认设置定义`webnet`网络（这是一个负载均衡网络）

## 运行新的负载均衡app
1. 先运行命令 `docker swarm init` 
    > 不使用该命令会报错：
    Error response from daemon: This node is not a swarm manager. Use "docker swarm init" or "docker swarm join" to connect this node to swarm and try again.

2. 将app命名为`getstartedlab`，并运行
    ```sh
      $ docker stack deploy -c docker-compose.yml getstartedlab

      # 查看服务信息
      $ docker service ls
    ```
3. 服务里运行的单个容器称为一个`task`，查看`service`中的`task`信息：
    ```
      $ docker service ps getstartedlab_web

      ID                  NAME                  IMAGE                                 NODE                    DESIRED STATE       CURRENT STATE           ERROR               PORTS
      nnw0bqh9kdh7        getstartedlab_web.1   cj1406942109/get-started:first-demo   linuxkit-00155d0ae915   Running             Running 2 minutes ago
      hdeo9vn0hzo4        getstartedlab_web.2   cj1406942109/get-started:first-demo   linuxkit-00155d0ae915   Running             Running 2 minutes ago
      f7l22z600893        getstartedlab_web.3   cj1406942109/get-started:first-demo   linuxkit-00155d0ae915   Running             Running 2 minutes ago
      h7yqtkopoqrf        getstartedlab_web.4   cj1406942109/get-started:first-demo   linuxkit-00155d0ae915   Running             Running 2 minutes ago
      vyxbnymk9up7        getstartedlab_web.5   cj1406942109/get-started:first-demo   linuxkit-00155d0ae915   Running             Running 2 minutes ago

    ```
    列出容器的时候可以看到`taks`的信息
    ```
      $ docker container ls -q
    ```

4. 可以多次运行命令`curl -4 http://localhost:4000`或者在浏览器里输入URL并多次刷新查看效果，可以看到容器的ID发生改变，表明启用了负载均衡

5. 可以通过修改`docker-compose.yml`文件中的`replicas`值来扩展app，保存文件，重新运行`docker stack deploy -c docker-compose.yml getstartedlab`命令即可

6. 拆卸`app`和`swarm`
  ```sh
    # Take the app down with docker stack rm
    $ docker stack rm getstartedlab

    # Take down the swarm
    $ docker swarm leave --force
  ```
  