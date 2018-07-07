# Speech and Language Processing
> 记录时间：2018-07-06    
> 参考网址：https://web.stanford.edu/~jurafsky/slp3/

## 词和语料库（Words and Corpora）

* 语料库：一种计算机可读的文本或语音集合。

* 是否应该把标点符号看成单独的词？    
这取决于具体的任务，标点对于发现事物边界（逗号、句号、冒号）和识别意义的某些方面（问号、感叹号、引号）至关重要。对于一些任务，比如词类标注、句法分析或语音合成，我们有时把标点符号当作是单独的单词。

* 填充词或者填充停顿（如：uh、um）等是否应该视为词？    
同样，这取决于具体的应用。如果我们正在构建一个语音转录系统，我们可能希望最终消除这些不流利的内容。但是有时也会保留，对于语音识别，他们被视为规则词。

## 文本规范化
在对文本进行自然语言处理之前，需要进行文本规范化。

规范化的过程一般分为三个任务：
1. 从行文中分割（segment）/标记（tokenize）单词
2. 规范单词格式
3. 分割行文中的句子

用于粗糙标记和规范化的unix工具：`tr`
```
tr -sc 'A-Za-z' '\n' < sh.txt | tr A-Z a-z | sort | uniq -c | sort -n -r

```

一个常用的标记化标准称为`Penn Treebank Tokenization`标准。

在实践中，由于标记化需要在任何其他语言处理之前运行，所以要求它很快。标记化的标准方法是使用基于正则表达式的确定性算法，编译成非常有效的有限状态自动机。


## 汉语分词：最大匹配算法（the MaxMatch algorithm）
其主要原理都是切分出单字串，然后和词库进行比对，如果是一个词就记录下来， 否则通过增加或者减少一个单字，继续比较，一直还剩下一个单字则终止，如果该单字串无法切分，则作为未登录处理。

该算法在汉语分词上表现很好，但是不适用于英语，因为汉语的词要比英语短很多。

问题：对于处理未知词汇（不在词典中的词）或者是与字典生成器所做的假设相差很大的类型。

最精确的中文分割算法一般使用在手工分割训练集上通过监督机器学习训练的统计序列模型。


## 词形还原和词干化（Lemmatization and Stemming）
词形还原用于确定外表不同但是有相同词根的两个单词。

最复杂的词形还原方法涉及单词的完整形态解析。

### 波特词干器（The Porter Stemmer）
虽然使用有限状态传感器来构建完整的形态解析器是处理单词形式的形态变化的最常用方法，但我们有时会利用更简单但更粗糙的截断来解决词缀。

使用最多的[Poter算法](https://tartarus.org/martin/PorterStemmer/)：
```
=> input:
This was not the map we found in Billy Bones's chest, but
an accurate copy, complete in all things-names and heights
and soundings-with the single exception of the red crosses
and the written notes.

=> output:
Thi wa not the map we found in Billi Bone s chest but an
accur copi complet in all thing name and height and sound
with the singl except of the red cross and the written note

```
该算法基于串联运行的一系列重写规则，作为级联，其中每个传递的输出作为输入馈送到下一个传递，
规则示例：
```
ATIONAL -> ATE (e.g., relational -> relate)
ING -> ∈  if stem contains vowel (e.g., motoring -> motor)
SSES -> SS (e.g., grasses -> grass)
```

## 最小编辑距离（Minimum Edit Distance）
> 用于拼写纠正

编辑距离为我们提供了一种量化这些关于字符串相似性的直觉的方法。更正式地说，两个字符串之间的最小编辑距离被定义为将一个字符串转换为另一个字符串所需的编辑操作（插入，删除，替换等操作）的最小次数。

编辑距离，又称Levenshtein距离，是指两个字串之间，由一个转成另一个所需的最少编辑操作次数。许可的编辑操作包括将一个字符替换成另一个字符，插入一个字符，删除一个字符。一般来说，编辑距离越小，两个串的相似度越大。

最小编辑距离算法，使用动态规划实现。

知道最小编辑距离对于找到潜在的拼写错误更正等算法非常有用。 但编辑距离算法在另一方面也很重要; 通过一个小的改变，它还可以提供两个字符串之间的最小成本对齐。 在语音和语言处理过程中对齐两个字符串非常有用。

在语音识别中，最小编辑距离对齐用于计算字错误率。 对齐在机器翻译中起作用，其中平行语料库中的句子（具有两种语言的文本的语料库）需要彼此匹配。


## 总结
* 正则表达式语言是模式匹配的强大工具。
* 单词标记化和标准化通常通过简单的正则表达式替换或有限自动机的级联来完成。
* Porter算法是一种简单而有效的方法来进行词干分析，去掉词缀。 它没有很高的准确性，但可能对某些任务有用。
* 两个字符串之间的最小编辑距离是将一个字符串编辑到另一个字符串所需的最小操作次数。 可以通
过动态规划来计算最小编辑距离，这也能够对两个字符串进行对齐。

## 练习
* 编码实现最小编辑距离算法
* 编码实现最大匹配算法



## 相关论文
* 波特词干器：Porter, M. F. (1980). An algorithm for suffix stripping. Program,
14(3), 130–127.
* 编辑距离：Levenshtein, V. I. (1966). Binary codes capable of correcting
deletions, insertions, and reversals. Cybernetics and Control
Theory, 10(8), 707–710. Original in Doklady Akademii
Nauk SSSR 163(4): 845–848 (1965).
* 最小编辑距离算法：Wagner, R. A. and Fischer, M. J. (1974). The string-to-string
correction problem. Journal of the Association for Computing
Machinery, 21, 168–173.
* 对齐字符串：Gusfield, D. (1997). Algorithms on Strings, Trees, and Sequences:
Computer Science and Computational Biology.
Cambridge University Press.


## 代码
* 最小距离
```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sys

def min_edit_distance(source, target):
  """
  使用动态规划计算两个字符串的最小编辑距离
    :param source: 源字符
    :param target: 目标字符
  """
  # 定义删除和插入的cost
  DEL_COST = 1
  INS_COST = 1

  # 初始化
  len_s = len(source)
  len_t = len(target)

  # 创建距离矩阵时全部初始化为0
  distance_matrix = [[0 for j in range(len_t + 1)] for i in range(len_s + 1)]

  # 距离矩阵的第0行和第0列是与空字符的距离，distance_matrix[0][0] = 0
  for i in range(1, len_s + 1):
    distance_matrix[i][0] = distance_matrix[i - 1][0] + DEL_COST
  for j in range(1, len_t + 1):
    distance_matrix[0][j] = distance_matrix[0][j - 1] + INS_COST

  # 递推关系
  for i in range(1, len_s + 1):
    for j in range(1, len_t + 1):
      if source[i - 1] == target[j - 1]:
        sub_cost = 0  # 如果相同，替换代价为0
      else:
        sub_cost = 2  # 如果不同，替换代价为2
      distance_matrix[i][j] = min(distance_matrix[i - 1][j] + DEL_COST, distance_matrix[i][j - 1] + INS_COST, distance_matrix[i - 1][j - 1] + sub_cost)

  return distance_matrix[len_s][len_t]

if __name__=='__main__':
  args = sys.argv
  if len(args) == 3:
    print(min_edit_distance(args[1], args[2]))
  else: 
    print("Usage: min_edit_distance {source} {target}")

```