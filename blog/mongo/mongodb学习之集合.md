# 集合(collection)
集合用于存储文档，类似关系数据库中的表格(`table`)。

### 创建集合
如果一个集合不存在，mongo会在第一次存入数据时将其创建。

```mongo
    db.myNewCollection2.insert( { x: 1 } )
    db.myNewCollection3.createIndex( { y: 1 } )
```

##### 显式创建
使用`db.createCollection()`方法指定选项显示创建集合。


### 查看集合
```mongo
    show collections
```

### 删除集合
```mongo
    db.collection.drop()
```

### 固定集合(`capped collection`)
固定集合的大小固定，支持高吞吐量操作，插入和获取文档都是根据插入次序。当集合空间用完后，再插入的元素就会覆盖最初始的头部的元素

##### 创建方法
```mongo
    db.createCollection("log", { capped : true, size : 5242880, max : 5000 } )
```
最小`size`为`4096`，单位`bytes`，如果`size`<=4096，集合的大小分配为4096。否则，mongo会将给定的`size`提升到256的整数倍。
`max`指定集合中文档的最大数。**`size`为必填项**。

###### 判断集合是否为固定集合
```mongo
    db.collection.isCapped()
```

##### 固定集合查询操作
固定集合默认显示顺序与文档插入顺序相同，可以使用`sort()`方法更改排序
```mongo
    db.cappedCollection.find().sort( { $natural: -1 } )     //逆序排列
```

#####　将集合转换为固定集合
```mongo
    db.runCommand({"convertToCapped": "mycoll", size: 100000});
    //or 
    db.mycol1.convertToCapped(100000);
```

*该命令会得到一个全局写锁，并阻塞其他操作直到该命令完成*