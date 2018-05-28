# 数据库(database)
> 记录时间：2017-01-03

数据库用于存放文档(`document`)的集合(`collection`)。

### 选择数据库：
```mongo
    use myDB
```

### 查看数据库：
```mongo
    show dbs
```
### 显示当前使用的数据库
```mongo
    db
```

### 删除数据库
```mongo
    db.dropDatabase()
```

### 创建数据库：
如果数据库不存在，mongo在第一次存入数据时创建该数据库，如：

```mongo
    use myNewDB
    db.myNewCollection1.insert( { x : 1} )
```

如果 `myNewDB` 和 `myNewCollection1` 不存在，则`insert()`操作将会创建它们。

