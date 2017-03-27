# C(Creation)操作

- db.collection.insert()
- db.collection.insertOne()
- db.collection.insertMany()

创建和插入操作添加新文档到集合，如果集合不存在，插入操作将创建集合。
MongoDB的插入操作针对单个集合，单文档级别上的所有写操作都是原子的。


# R(Read)操作

- db.collection.find()

`AND`条件查询
```mongo
db.users.find( 
    { 
        status: "A", 
        age: { $lt: 30 } 
    } 
)
```

`OR`条件查询
```mongo
db.users.find( 
    { 
        $or: [ { status: "A" }, { age: { $lt:30 } } ]
    } 
)
```

`AND`和`OR`查询同时存在
```mongo
db.users.find( 
    { 
        status: "A", 
        $or: [ { age: { $lt: 30 } }, { type: 1} ]
    } 
)
```

### 数组匹配

1. 精确匹配
```mongo
//查询语句
db.users.find( { badges: [ "blue", "black" ] } )

//匹配结果
{
   "_id" : 1,
   "name" : "sue",
   "age" : 19,
   "type" : 1,
   "status" : "P",
   "favorites" : { "artist" : "Picasso", "food" : "pizza" },
   "finished" : [ 17, 3 ]
   "badges" : [ "blue", "black" ],
   "points" : [ { "points" : 85, "bonus" : 20 }, { "points" : 85, "bonus" : 10 } ]
}
```

2. 元素包含匹配
```mongo
//查询语句
db.users.find( { badges: "black" } )

//匹配结果
{
   "_id" : 1,
   "name" : "sue",
   "age" : 19,
   "type" : 1,
   "status" : "P",
   "favorites" : { "artist" : "Picasso", "food" : "pizza" },
   "finished" : [ 17, 3 ]
   "badges" : [ "blue", "black" ],
   "points" : [ { "points" : 85, "bonus" : 20 }, { "points" : 85, "bonus" : 10 } ]
}
{
   "_id" : 4,
   "name" : "xi",
   "age" : 34,
   "type" : 2,
   "status" : "D",
   "favorites" : { "artist" : "Chagall", "food" : "chocolate" },
   "finished" : [ 5, 11 ],
   "badges" : [ "red", "black" ],
   "points" : [ { "points" : 53, "bonus" : 15 }, { "points" : 51, "bonus" : 15 } ]
}
{
   "_id" : 6,
   "name" : "abc",
   "age" : 43,
   "type" : 1,
   "status" : "A",
   "favorites" : { "food" : "pizza", "artist" : "Picasso" },
   "finished" : [ 18, 12 ],
   "badges" : [ "black", "blue" ],
   "points" : [ { "points" : 78, "bonus" : 8 }, { "points" : 57, "bonus" : 7 } ]
}
```

3. 特定元素匹配
```mongo
//查询语句
db.users.find( { "badges.0": "black" } )

//匹配结果
{
   "_id" : 6,
   "name" : "abc",
   "age" : 43,
   "type" : 1,
   "status" : "A",
   "favorites" : { "food" : "pizza", "artist" : "Picasso" },
   "finished" : [ 18, 12 ],
   "badges" : [ "black", "blue" ],
   "points" : [ { "points" : 78, "bonus" : 8 }, { "points" : 57, "bonus" : 7 } ]
}
```

4. 多条件同时匹配
```mongo
//查询语句
db.users.find( { finished: { $elemMatch: { $gt: 15, $lt: 20 } } } )

//查询结果
{
   "_id" : 1,
   "name" : "sue",
   "age" : 19,
   "type" : 1,
   "status" : "P",
   "favorites" : { "artist" : "Picasso", "food" : "pizza" },
   "finished" : [ 17, 3 ]
   "badges" : [ "blue", "black" ],
   "points" : [ { "points" : 85, "bonus" : 20 }, { "points" : 85, "bonus" : 10 } ]
}
{
   "_id" : 6,
   "name" : "abc",
   "age" : 43,
   "type" : 1,
   "status" : "A",
   "favorites" : { "food" : "pizza", "artist" : "Picasso" },
   "finished" : [ 18, 12 ],
   "badges" : [ "black", "blue" ],
   "points" : [ { "points" : 78, "bonus" : 8 }, { "points" : 57, "bonus" : 7 } ]
}
```

5. 多条件匹配其中一个或多个
```mongo
//查询语句
db.users.find( { finished: { $gt: 15, $lt: 20 } } )

//匹配结果
{
   "_id" : 1,
   "name" : "sue",
   "age" : 19,
   "type" : 1,
   "status" : "P",
   "favorites" : { "artist" : "Picasso", "food" : "pizza" },
   "finished" : [ 17, 3 ]
   "badges" : [ "blue", "black" ],
   "points" : [ { "points" : 85, "bonus" : 20 }, { "points" : 85, "bonus" : 10 } ]
}
{
   "_id" : 2,
   "name" : "bob",
   "age" : 42,
   "type" : 1,
   "status" : "A",
   "favorites" : { "artist" : "Miro", "food" : "meringue" },
   "finished" : [ 11, 20 ],
   "badges" : [ "green" ],
   "points" : [ { "points" : 85, "bonus" : 20 }, { "points" : 64, "bonus" : 12 } ]
}
{
   "_id" : 6,
   "name" : "abc",
   "age" : 43,
   "type" : 1,
   "status" : "A",
   "favorites" : { "food" : "pizza", "artist" : "Picasso" },
   "finished" : [ 18, 12 ],
   "badges" : [ "black", "blue" ],
   "points" : [ { "points" : 78, "bonus" : 8 }, { "points" : 57, "bonus" : 7 } ]
}
```

### 投影文档(Projection Document)
对匹配的文档返回时进行字段限制（包含或不包含）。
```mongo
{ field1: <value>, field2: <value> ... }

//value 值可以为`1`（或`true`）和`0`（或`false`），1表示包含，0表示不包含。对于`_id`字段，如果不指定`_id:0`，默认将包含在返回文档中。
```

1. 返回指定字段和`_id`
```mongo
//查询语句
db.users.find( { status: "A" }, { name: 1, status: 1 } )

//匹配结果
{ "_id" : 2, "name" : "bob", "status" : "A" }
{ "_id" : 3, "name" : "ahn", "status" : "A" }
{ "_id" : 6, "name" : "abc", "status" : "A" }
```

2. 只返回指定字段
```mongo
//查询语句
db.users.find( { status: "A" }, { name: 1, status: 1, _id: 0 } )

//匹配结果
{ "name" : "bob", "status" : "A" }
{ "name" : "ahn", "status" : "A" }
{ "name" : "abc", "status" : "A" }
```

3. 返回除指定字段的其他结果
```mongo
//查询语句
db.users.find( { status: "A" }, { favorites: 0, points: 0 } )

//匹配结果
{
   "_id" : 2,
   "name" : "bob",
   "age" : 42,
   "type" : 1,
   "status" : "A",
   "finished" : [ 11, 25 ],
   "badges" : [ "green" ]
}
{
   "_id" : 3,
   "name" : "ahn",
   "age" : 22,
   "type" : 2,
   "status" : "A",
   "finished" : [ 6 ],
   "badges" : [ "blue", "red" ]
}
{
   "_id" : 6,
   "name" : "abc",
   "age" : 43,
   "type" : 1,
   "status" : "A",
   "finished" : [ 18, 12 ],
   "badges" : [ "black", "blue" ]
}
```
*除了`_id`字段，不能在投影文档中同时使用包含和不包含语句*

4. 数组字段，返回特定数组元素
可以使用的投影操作符有：`$elemMatch`，`$slice`，`$`。

### 查询空(`null`)字段或缺失字段

1. 相等过滤
`{ name: null }`查询，匹配包含`name`字段值为`null`的文档或不包含`name`字段的文档。
```mongo
//查询语句
db.users.find( { name: null } )

//匹配结果
{ "_id" : 900, "name" : null }
{ "_id" : 901 }
```

2. 类型检查
`{ name: { $type： 10 } }`查询，只匹配`name`字段值为`null`的文档。
```mongo
//查询条件
db.users.find( { name : { $type: 10 } } )

//匹配结果
{ "_id" : 900, "name" : null }
```

3. 存在性检查
`{ name: { $exists: false} }`查询，只匹配不包含`name`字段的文档。
```mongo
//查询语句
db.users.find( { name : { $exists: false } } )

//匹配结果
{ "_id" : 901 }
```

###　查询结果指针迭代
`db.collection.find()`方法返回一个指针，如果该指针没有赋值给`var`声明的变量，则该指针默认自动迭代20次，将前20条结果打印出来，如果赋值，则不迭代。

1. 指针方法`next()`
```mongo
var myCursor = db.users.find( { type: 2 } );

while (myCursor.hasNext()) {
   print(tojson(myCursor.next()));
}

//printjson()可以替换print(tojson())
while (myCursor.hasNext()) {
   printjson(myCursor.next());
}
```

2. 指针方法`forEach()`
```mongo
var myCursor =  db.users.find( { type: 2 } );

myCursor.forEach(printjson);
```

3. 迭代器下标
```mongo
var myCursor = db.inventory.find( { type: 2 } );
var documentArray = myCursor.toArray();
var myDocument = documentArray[3];

// 简写方式
var myCursor = db.inventory.find( { type: 2 } );
var myDocument = myCursor[1];       //等价于myCursor.toArray()[1]
```

4. 指针行为
默认情况下，服务器会自动关闭闲置超过10分钟的指针和用尽的指针。可以通过`cursor.noCursorTimeout()`方法修改默认行为。
```mongo
var myCursor = db.users.find().noCursorTimeout();
```
设置了`noCursorTimeout`之后，你必须通过`cursor.close()`来手动关闭指针，或者用尽指针的结果。

5. 指针信息
可以通过`db.serverStatus().metrics.cursor`来获取指针的信息。
```mongo
db.serverStatus().metrics.cursor

//结果
{
   "timedOut" : <number>    //服务器启动后，已经过时的指针数
   "open" : {
      "noTimeout" : <number>,       //设置`noTimeout`的指针数
      "pinned" : <number>,          //固定的指针数
      "total" : <number>            //打开指针的总数
   }
}
```

# U(Update)操作

- db.collection.update()
- db.collection.updateOne()
- db.collection.updateMany()
- db.collection.replaceOne()

### 行为
1. 原子性
mongo中所有的写操作都具备原子性，只在单文档层面上操作。

2. `_id`字段
更新操作不能改变`_id`字段的值，也不能用一个`_id`字段值不同的文档来替换当前文档。

3. `upsert`选项
如果上面的更新的方法包含`upsert:true`选项，并且没有文档匹配当前过滤器，则更新操作将新建一个文档插入到数据库。

4. `db.collection.updateOne()`
```mongo
db.users.updateOne(
   { "favorites.artist": "Picasso" },
   {
     $set: { "favorites.food": "pie", type: 3 },
     $currentDate: { lastModified: true }
   }
)

//$currentDate 操作符 用于更新`lastModified`字段的值，如果该字段不存在，将会创建该字段。
```

5. `db.collection.updateMany()`
```mongo
db.users.updateMany(
   { "favorites.artist": "Picasso" },
   {
     $set: { "favorites.artist": "Pisanello", type: 3 },
     $currentDate: { lastModified: true }
   }
)
```

6. `db.collection.update()`
```mongo
//更新匹配的第一个文档
db.users.update(
   { "favorites.artist": "Pisanello" },
   {
     $set: { "favorites.food": "pizza", type: 0,  },
     $currentDate: { lastModified: true }
   }
)

//更新匹配的所有文档
db.users.update(
   { "favorites.artist": "Pisanello" },
   {
     $set: { "favorites.food": "pizza", type: 0,  },
     $currentDate: { lastModified: true }
   },
   { multi: true }
)
```

### 替换文档
要替换文档除`_id`字段外的所有内容，可以使用`db.collection.replaceOne()`或`db.collection.update()`。新的文档可以省略`_id`字段，如果不省略，则必须与当前值相同。

```mongo
db.users.replaceOne(
   { name: "abc" },
   { name: "amy", age: 34, type: 2, status: "P", favorites: { "artist": "Dali", food: "donuts" } }
)

//或者
db.users.update(
   { name: "xyz" },
   { name: "mee", age: 25, type: 1, status: "A", favorites: { "artist": "Matisse", food: "mango" } }
)
```


# D(Delete)操作

- db.collection.remove()
- db.collection.deleteOne()
- db.collection.deleteMany()

### 删除行为
1. 删除操作不删除索引，即使是从集合中删除整个文档
2. 原子性

### 删除所有文档
```mongo
db.users.deleteMany({})

//或者
db.users.remove({})
```
要删除一个集合中的所有文档，使用`db.collection.drop()`方法可能更高效，该方法将删除整个集合，包括索引，然后重建集合和索引。

### 删除单个文档
```mongo
db.users.deleteOne( { status: "D" } )

//或者
db.users.remove( { status: "D" }, 1)
```

# 批量写（Bulk Write）操作

- db.collection.bulkWrite()
该方法支持批量插入，更新和删除操作。还可以使用`db.collection.insertMany()`方法进行批量插入。

批量写操作，如果中途出错，对于有序列表，则不处理列表中的剩余项；对于无序列表，则会继续处理列表中的剩余项，默认执行有序操作，要指定无序操作，需要设置`ordered:false`。

`bulkWrite()`方法支持以下写操作：

- insertOne
- updateOne
- updateMany
- replaceOne
- deleteOne
- deleteMany

```mongo
try {
   db.characters.bulkWrite(
      [
         { insertOne :
            {
               "document" :
               {
                  "_id" : 4, "char" : "Dithras", "class" : "barbarian", "lvl" : 4
               }
            }
         },
         { insertOne :
            {
               "document" :
               {
                  "_id" : 5, "char" : "Taeln", "class" : "fighter", "lvl" : 3
               }
            }
         },
         { updateOne :
            {
               "filter" : { "char" : "Eldon" },
               "update" : { $set : { "status" : "Critical Injury" } }
            }
         },
         { deleteOne :
            { "filter" : { "char" : "Brisbane"} }
         },
         { replaceOne :
            {
               "filter" : { "char" : "Meldane" },
               "replacement" : { "char" : "Tanys", "class" : "oracle", "lvl" : 4 }
            }
         }
      ]
   );
}
catch (e) {
   print(e);
}

//返回结果
{
   "acknowledged" : true,
   "deletedCount" : 1,
   "insertedCount" : 2,
   "matchedCount" : 2,
   "upsertedCount" : 0,
   "insertedIds" : {
      "0" : 4,
      "1" : 5
   },
   "upsertedIds" : {

   }
}
```