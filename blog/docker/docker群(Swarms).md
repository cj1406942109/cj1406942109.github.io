# docker Swarms
> 记录时间：2018-07-27    
> 参考：https://docs.docker.com/get-started/part4/

将应用部署到集群上，在多个机器上运行。通过将多个机器连接成为一个docker化的集群(`swarm`)，使得多机器、多容器应用成为可能。

`Swarm`是运行docker并连接成为一个集群的机器的聚合。实现了`Swarm`之后，你还是按往常一样使用docker的命令，但它们现在是通过`swarm manager`在集群上执行。`swarm`中的机器可能是实体的也可能是虚拟的，连接到`swarm`之后，统一称为`nodes`。

`swarm manager`可以使用不同的策略来运行容器，可以在构成文件(`docker-compose.yml`)里面指定使用的策略。

`swarm`中，只有`swarm managers`可以执行你的指令，虽然可以授权其他机器加入到`swarm`中作为`workers`，但它们只提供容量，并没有权限告诉其他机器该做什么不该做什么。

docker有单主机(single-host)模式和群(swarm)模式，启用`swarm`模式，将使当前机器成为`swarm manager`，此后，docker就可以运行你在管理的所有`swarm`上执行的命令，而不仅仅是当前机器了。

## 设置`swarm`
`swarm`由多个节点(`node`)组成，节点可以是实体机和虚拟机。

```sh
  # enable swarm mode and make your current machine a swarm manager
  $ docker swarm init

  #  run docker swarm join on other machines to have them join the swarm as workers.
  $ docker swarm join

```

## 创建集群

1. 本地机器上的虚拟机(win10)
    1. 打开hyper-v管理器
    2. 点击右侧的虚拟交换机管理器
    3. 点击创建`外部`类型的虚拟交换机
    4. 将其命名为`myswitch`，并勾选共享主机的活动网络适配器
    5. 重启机器，否则第二步会出现[问题](https://docs.docker.com/machine/drivers/hyper-v/#3-reboot)

2. 用节点管理工具`docker-machine`创建几个虚拟机:
    ```sh
      docker-machine create -d hyperv --hyperv-virtual-switch "myswitch" myvm1
      docker-machine create -d hyperv --hyperv-virtual-switch "myswitch" myvm2
    ```
    **注意：** 创建虚拟交换机时，要选择实体网卡；创建过程要在管理员模式下进行，不然会出现一直停在waiting for host to start...

3. 查看虚拟机获取其ip地址，同样需要管理员模式
    ```sh
      $ docker-machine ls
      NAME    ACTIVE   DRIVER   STATE     URL                         SWARM   DOCKER        ERRORS
      myvm1   -        hyperv   Running   tcp://192.168.10.145:2376           v18.06.0-ce
      myvm2   -        hyperv   Running   tcp://192.168.10.155:2376           v18.06.0-ce
    ```
4. 初始化`swarm`并添加节点    
    将`myvm1`设置为`swarm manager`，`myvm2`设置为`worker`，
    * 使用命令`docker-machine ssh myvm1 "docker swarm init --advertise-addr <myvm1 ip>"`进行初始化
      ```sh
        $ docker-machine ssh myvm1 "docker swarm init --advertise-addr 192.168.10.145"
        Swarm initialized: current node (se4zi8fjz25ifcule1i1qgfsz) is now a manager.

        To add a worker to this swarm, run the following command:

            docker swarm join --token SWMTKN-1-56tiaeik2guz1ajawhif1wpdl947aw2ot6mipbp4q6g0weaebg-7wxuqzaw9uv4jhiia0pft7uzb 192.168.10.145:2377

        To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
      ```
    * 使用`docker-machine ssh myvm2 "docker swarm join --token <token> <ip>:2377"`将`myvm2`加入`swarm`
      ```sh
        $ docker-machine ssh myvm2 "docker swarm join --token SWMTKN-1-56tiaeik2guz1ajawhif1wpdl947aw2ot6mipbp4q6g0weaebg-7wxuqzaw9uv4jhiia0pft7uzb 192.168.10.145:2377"

        This node joined a swarm as a worker.
      ```
5. 成功创建了一个`swarm`，在`swarm manager`上运行`docker node ls`命令查看节点信息
    ```sh
      $ docker-machine ssh myvm1 "docker node ls"
      ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
      se4zi8fjz25ifcule1i1qgfsz *   myvm1               Ready               Active              Leader              18.06.0-ce
      8w0vdkds78h9il5bgsasvjebz     myvm2               Ready               Active                                  18.06.0-ce
    ```
6. 如果想要重新开始，可以在每个节点上执行`docker swarm leave`


## 在`swarm`集群上部署应用
此部分与[docker服务部分](https://docs.docker.com/get-started/part3/)相同，但要记住，只有`swarm manager`可以执行命令，`workers`只提供容量


## 为`swarm manager`配置一个`docker-machine`shell
将docker命令发送到虚拟机的方式：
* 除了使用`docker-machine ssh`，
* 还有另一种方式，`docker-machine env <machine>`可以获取并运行一个命令，配置当前shell以与VM上的Docker守护程序通信。该方法允许您使用本地docker-compose.yml文件“远程”部署应用程序，而无需将其复制到任何位置。

### windows下配置
1. 运行`docker-machine env myvm1`以获取命令来配置shell以与myvm1通信
    ```sh
      $ docker-machine env myvm1
      SET DOCKER_TLS_VERIFY=1
      SET DOCKER_HOST=tcp://192.168.10.145:2376
      SET DOCKER_CERT_PATH=C:\Users\Abraham\.docker\machine\machines\myvm1
      SET DOCKER_MACHINE_NAME=myvm1
      SET COMPOSE_CONVERT_WINDOWS_PATHS=true
      REM Run this command to configure your shell:
      REM     @FOR /f "tokens=*" %i IN ('docker-machine env myvm1') DO @%i
    ```
2. 执行给出的命令来配置shell
    ```sh
      $ @FOR /f "tokens=*" %i IN ('docker-machine env myvm1') DO @%i
    ```
3. 运行`docker-machine ls`来验证`myvm1`是否为激活机器（旁边有*号标记）
    ```sh
      $ docker-machine ls
      NAME    ACTIVE   DRIVER   STATE     URL                         SWARM   DOCKER        ERRORS
      myvm1   *        hyperv   Running   tcp://192.168.10.145:2376           v18.06.0-ce
      myvm2   -        hyperv   Running   tcp://192.168.10.155:2376           v18.06.0-ce
    ```
4. 在`swarm manager`上部署app
    通过`docker-machine`shell配置，已经连接到了`myvm1`，同时，你还可以访问本机的文件，如[docker服务](https://docs.docker.com/get-started/part3/)篇，运行以下命令在`myvm1`上部署应用
    ```sh
      # 注意确保docker-compose.yml在当前目录下
      $ docker stack deploy -c docker-compose.yml getstartedlab

      Creating network getstartedlab_webnet
      Creating service getstartedlab_web
    ```
    查看服务信息
    ```sh
      $ docker stack ps getstartedlab
      ID                  NAME                  IMAGE                                 NODE                DESIRED STATE       CURRENT STATE             ERROR               PORTS
      oyc6dogleu6f        getstartedlab_web.1   cj1406942109/get-started:first-demo   myvm1               Running             Preparing 5 seconds ago
      uyrx15qo9lyi        getstartedlab_web.2   cj1406942109/get-started:first-demo   myvm2               Running             Preparing 5 seconds ago
      xgbfz939vzmx        getstartedlab_web.3   cj1406942109/get-started:first-demo   myvm2               Running             Preparing 5 seconds ago
      wnx5d8pe5oxz        getstartedlab_web.4   cj1406942109/get-started:first-demo   myvm1               Running             Preparing 5 seconds ago
      qk5y9zhwyib6        getstartedlab_web.5   cj1406942109/get-started:first-demo   myvm2               Running             Preparing 5 seconds ago
    ```
5. 访问集群   
现在，你可以通过`myvm1`或`myvm2`的ip地址来访问部署好的app

    **访问出现问题：** 在开启`swarm`模式之前，请确保`swarm`节点之间的以下端口是开放的：
    * 端口7946 TCP / UDP用于容器网络发现。
    * 端口4789 UDP用于容器入口网络。

    参考[文章](https://jingyan.baidu.com/article/0f5fb0993cd01d6d8334ea00.html)进行配置

6. 清除   
可以使用`docker stack rm`命令清除`stack`
    ```sh
      docker stack rm getstartedlab
    ```
    如果关闭本地主机，docker机器也会跟着关闭，可以使用`docker-machine ls`查看其状态

    可以使用`docker-machine start <machine-name>`命令重启关闭的机器。