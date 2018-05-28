# mongo添加用户
> 记录时间：2018-05-23

## 创建管理员用户流程
参考资料：https://docs.mongodb.com/manual/tutorial/enable-authentication
1. 启动mongodb    
    > 使用命令参数启动：`mongod --port 27017 --dbpath /data/db1`   
    > 或者使用配置文件启动：`mongod -f mongodb.conf`   
2. 连接到数据库实例
    > 通过mongo shell进行连接：`mongo --port 27017`
    > 或者使用客户端应用（如robomongo）进行连接   
    *注意：此处如果mongo实例使用的端口号不为`27017`，一定要指定端口号，直接执行`mongo`命令默认链接的端口号为27017*
3. 创建管理员用户
    > 在`admin`数据库中，添加`userAdminAnyDatabase`角色的用户
    > ```
    > use admin
    > db.createUser(
    >   {
    >     user: "myUserAdmin",
    >     pwd: "abc123",
    >     roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
    >   }
    > )
    > ```
4. 断开shell连接
5. 重新启动mongodb，并开启访问控制
    > 使用命令参数启动： `mongod --auth --port 27017 --dbpath /data/db1`    
    > 或者使用配置文件启动： `mongod -f mongodb.conf -auth`
6. 连接到实例并以管理员身份认证   
    * 使用认证信息进行连接
      > 使用`-u <username> -p <password> --authenticationDatabase <database> `命令行选项连接到mongo shell   
      > ```
      > mongo --port 27017 -u "myUserAdmin" -p "abc123" --authenticationDatabase "admin"
      > ```
    * 先连接，然后再认证信息
      > 连接到mongo shell
      > ```
      > mongo --port 27017
      > ```    
      > 切换到验证数据库，并认证
      > ```
      > use admin
      > db.auth("myUserAdmin", "abc123" )
      > ```


## 内置角色（roles）
参考资料：https://docs.mongodb.com/manual/reference/built-in-roles/

mongodb通过基于角色的授权和提供的内置角色来提供数据库系统中通常需要的不同级别的访问，来实现授予数据和命令的访问。

给一个角色授予一些权限，在指定的资源（resources）上执行一系列的动作（actions）。

mongo提供的内置数据库用户（database user）和数据库管理（database administration）角色在所有数据库，其他的内置角色只在`admin`数据库。

### 数据库用户角色（database user）
每个数据库包括以下客户角色：
* read   
  提供读数据的能力，对于所有的非系统集合和部分系统集合：`system.indexes, system.js 和system.namespaces`，角色通过授权以下动作提供读访问：
    * collStats
    * dbHash
    * dbstats
    * find
    * killCursors
    * listIndexes
    * listCollections
* readWrite
  提供`read`角色的所有权限，加上修改数据的能力，对于所有的非系统集合和系统集合`system.js`，授权以下动作：
    * collStats
    * convertToCapped
    * createCollection
    * dbHash
    * dbStats
    * dropCollection
    * createIndex
    * dropIndex
    * find
    * insert
    * killCursors
    * listIndexes
    * listCollections
    * remove
    * renameCollectionSameDB
    * update

### 数据库管理角色（database administration）
每个数据库包括以下管理角色：
* dbAdmin   
  对于数据库的`system.indexes, system.namespaces和system.profile`集合，提供以下动作：
    * collStats
    * dbHash
    * dbStats
    * find
    * killCursors
    * listIndexes
    * listCollections
    * 仅对于system.profile的dropCollection和createCollection    

  对于所有的非系统集合，提供以下动作（该角色不包括对所有非系统集合的full read access）：
    * bypassDocumentValidation
    * collMod
    * collStats
    * compact
    * convertToCapped
    * createCollection
    * createIndex
    * dbStats
    * dropCollection
    * dropDatabase
    * dropIndex
    * enableProfiler
    * reIndex
    * renameCollectionSameDB
    * repairDatabase
    * storageDetails
    * validate
* dbOwner   
  数据库的所有者可以在该数据库上执行任何管理动作，该角色结合了`readWrite`，`dbAdmin`和`userAdmin`角色的所有权限
* userAdmin   
  提供为一个数据库创建和修改角色的能力，拥有该角色的用户能够为该数据库分配任意角色和权限给任意用户，包括自己。该角色提供以下动作：
    * changeCustomData
    * changePassword
    * createRole
    * createUser
    * dropRole
    * dropUser
    * grantRole
    * revokeRole
    * setAuthenticationRestriction
    * viewRole
    * viewUser

### 集群管理角色（cluster administration）
`admin`数据库包含以下角色用于管理整个系统而不是单个数据库，这些角色包括但不限于`replica set`和`sharded cluster`管理函数。
（此处不作详细介绍，参见官方文档）
* clusterAdmin
* clusterManager
* clusterMonitor
* hostManager

### 备份和恢复角色（backup and restoration）
`admin`数据库包含以下角色用于备份和恢复数据
（此处不作详细介绍，参见官方文档）
* backup
* restore

### 所有数据库角色（all-database）
以下角色只在`admin`数据库中可用，这些角色提供应用于除了`local`和`config`的所有数据库的除了`system.*`集合的权限。

* readAnyDatabase
  提供与`read`角色相同的只读权限，对于除了`local`和`config`的所有数据库，并提供对于集群的`listDatabases`权限
* readWriteAnyDatabase
  提供与`readWrite`角色相同的读和写权限，对于除了`local`和`config`的所有数据库，并提供对于集群的`listDatabases`和`readWriteAnyDatabase`权限
* userAdminAnyDatabase
  提供与`userAdmin`角色相同的用户管理权限，对于除了`local`和`config`的所有数据库，并提供对于集群的`userAdminAnyDatabase`，`authSchemaUpgrade`，`invalidateUserCache`和`listDatabases`权限
* dbAdminAnyDatabase
  提供与`dbAdmin`角色相同访问控制权限，对于除了`local`和`config`的所有数据库，并提供对于集群的`dbAdminAnyDatabase`和`listDatabases`权限

### 超级用户角色（superuser）
几个角色提供直接或间接的系统超级用户访问。    
以下角色提供为任意数据库的任意用户分配任意权限的能力,这意味着用户与其中一个角色可以分配自己在任何数据库的任何特权:
* dbOwner，当存在于`admin`数据库时
* userAdmin，当存在于`admin`数据库时
* userAdminAnyDatabase

以下角色提供完整的所有资源上的权限:
* root    
  提供`readWriteAnyDatabase`,`dbAdminAnyDatabase`,`userAdminAnyDatabase` `clusterAdmin`,`restore`和`backup`角色的操作和所有资源总和。

### 内部角色（internal）
* __system    
MongoDB将这个角色分配给用户对象来代表集群成员,如`replica set`成员和`mongos`实例。这个角色使其持有者有权对数据库中的任何对象采取任何行动。   
*注意：除了异常情况，不要将该角色分配给用户对象代表应用程序或人类管理员。*