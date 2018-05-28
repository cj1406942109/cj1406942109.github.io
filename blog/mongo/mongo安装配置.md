# mongo安装与配置
> 记录时间：2017-10-5

1. 下载https://www.mongodb.com/dr/fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-3.4.9-signed.msi/download后，本地安装

2. 环境配置


    - 配置文件

        在`/bin`目录下创建一个名为`mongod.config`的文件，文件内容如下：
        ```py
            ##database directory

        　　dbpath=d:\MongoDB\data

        　　##log file

        　　logpath=d:\MongoDB\log
        ```
    - 启动方式

        * 作为服务启动

            直接将MongoDB配置为服务（这样做的好处是：免去了每次启动需要输入数据路径，为了方便，可以将启动数据库写成window服务的方式），步骤如下：

            1. 本地创建`d:\MongoDB\data`和`d:\MongoDB\log`目录，分别用于存储日志与数据

            2. 以管理员身份打开cmd命令行

                **此处不能用powershell，会导致服务创建失败，出错信息如下：**
                ```cmd
                    PS D:\MongoDB\Server\3.4\bin> sc create mongodb binPath= "d:\MongoDB\Server\3.4\bin\mongod.exe --service -
                    goDB\data --logpath=d:\MongoDB\log\mongodb.log --logappend --directoryperdb"
                    Set-Content : 找不到接受实际参数“binPath=”的位置形式参数。
                    所在位置 行:1 字符: 1
                    + sc create mongodb binPath= "d:\MongoDB\Server\3.4\bin\mongod.exe --se ...
                    + ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        + CategoryInfo          : InvalidArgument: (:) [Set-Content]，ParameterBindingException
                        + FullyQualifiedErrorId : PositionalParameterNotFound,Microsoft.PowerShell.Commands.SetContentCommand
                ```
            3. 输入命令创建服务：
                ```cmd
                    sc create MongoDB binPath= "d:\MongoDB\Server\3.4\bin\mongod.exe --service --dbpath d:\MongoDB\data --logpath=d:\MongoDB\log\mongodb.log --logappend --directoryperdb"
                ```
            4. 输入win+r，打开运行界面，输入services.msc，打开服务，找到MongoDB服务，鼠标右击启动，（或者使用命令行，`net start MongoDB`）。

            5. 问题及解决方案：

                配置服务时，可能遇到`提示错误1053：服务没有及时响应启动或控制请求`

                原因为：没有创建`data`和`log`目录，创建之后即可正常配置。
        
        * 直接启动

            不通过创建服务的方式，我们也可以在bin目录下打开命令行输入: `mongod.exe --dbpath "d://MongoDB//data" --logpath "d://MongoDB//log//mongodb.log" --logappend`

            *注意：mongod --dbpath 命令是创建数据库文件的存放位置，启动mongodb服务时需要先确定数据库文件存放的位置，否则系统不会自动创建，启动会不成功。（--logpath 表示日志文件存放的路径     --logappend  表示以追加的方式写日志文件）*

    - 环境变量配置

        1. 环境变量 > 系统变量 > Path：添加：`D:\MongoDB\Server\3.4\bin`

        2. 打开cmd，输入mongo，查看效果