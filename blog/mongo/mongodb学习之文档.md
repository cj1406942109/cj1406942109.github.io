# 文档(document)
> 记录时间：2016-12-30

MongoDB将数据存储为`BSON`文档，`BSON`是`JSON`文档的二进制表示，但是包含更多的数据类型。

### 文档结构：
```json
    {
        field1: value1,
        field2: value2,
        field3: value3,
        ...
        fieldN: valueN
    }
```
文档的字段值可以是`BSON`的任何数据类型，包括：其他文档，数组，文档的数组等。
如：
```json
    var mydoc = {
               _id: ObjectId("5099803df3f4948bd2f98391"),
               name: { first: "Alan", last: "Turing" },
               birth: new Date('Jun 23, 1912'),
               death: new Date('Jun 07, 1954'),
               contribs: [ "Turing machine", "Turing test", "Turingery" ],
               views : NumberLong(1250000)
            }
```

### 文档字段名(field name)
字段名为字符串，格式限制如下：
- `_id`字段名，作为主键保留，在集合中值必须唯一，不可变，可以是数组之外的任何类型；
- 字段名不能以美元符(`$`)开始；
- 字段名不能包含点(`.`)；
- 字段名不能包含空字符。

`BSON`文档本身支持可以有多个相同的字段名，但是很多MongoDB的接口不支持重复字段名，所以，在操作有多个相同字段名的文档时，请先查看数据库驱动的文档。

### 文档字段值(field value)
MongoDB使用 *点记法* 访问数组的元素。
如：
```json
    {
        ...
        contribs: [ "Turing machine", "Turing test", "Turingery" ],
        ...
    }
```
使用`"contribs.2"`来获取`contribs`数组的第三个元素。

### 嵌入式文档(embedded document)
点记法获取嵌入式文档的字段，使用点连接嵌入式文档名和字段名，用引号包裹。
如：
```json
    {
        ...
        name: { first: "Alan", last: "Turing" },
        contact: { phone: { type: "cell", number: "111-222-3333" } },
        ...
    }
```
使用`"contact.phone.number"`获取`contact`字段的`phone`文档的`number`值。

### 文档限制
1. 文档大小限制
    `BJSON`文档大小的最大值为16MB。确保单个文档不会过度使用RAM，或者在传输过程中不会过度占用带宽。存储大文件可以查看`GridFS`API。
2. 文档字段顺序
    除以下情况，MongoDB根据写入操作的顺序保存文档字段的顺序：
    - `_id`字段一直是文档的第一个字段
    - 对字段名进行重命名操作可能会对文档的字段重新排序
3. `_id`字段
    每个集合保存的文档需要一个唯一的`_id`字段作为主键。如果插入的文档没有`_id`字段，MongDB驱动会自动为`_id`字段生成一个`ObjectId`。

### 文档的其他用途
除了定义数据记录，MongoDB还有很多地方使用了文档，包括：查询过滤，更新规格文档，索引规格文档等。
