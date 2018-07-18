# Speech and Language Processing
> 记录时间：2018-07-07    
> 参考网址：https://web.stanford.edu/~jurafsky/slp3/

## 语言模型
将概率分配给单词序列的模型称为语言模型。


## N-Grams
无论是估计下一个词或整个序列的概率，Ngram模型都是语音和语言处理中最重要的工具之一。

N-Gram（有时也称为N元模型）是自然语言处理中一个非常重要的概念，通常在NLP中，人们基于一定的语料库，可以利用N-Gram来预计或者评估一个句子是否合理。

该模型基于这样一种假设，第`N`个词的出现只与前面`N-1`个词相关，而与其它任何词都不相关，整句的概率就是各个词出现概率的乘积。这些概率可以通过直接从语料中统计`N`个词同时出现的次数得到。常用的是二元的Bi-Gram和三元的Tri-Gram。

对于一个由次序列`w1, w2, w3, ..., wn`组成的句子`S`，那么`P(S) = P(w1w2w3...wn) = P(w1)P(w2|w1)P(w3|w2w1)...P(wn|wn-1...w2w1)`。

但是这种方法存在两个致命的缺陷：
* 一个缺陷是参数空间过大，不可能实用化；
* 另外一个缺陷是数据稀疏严重。

为了解决该问题，我们引入马尔科夫假设：随机过程中各个状态St的概率分布，只与它的前面的有限个状态（一个或几个）相关，即`P(St|S1,S2,S3,...,St-1) = P(St|St-1)`。符合该假设的随机过程被称为马尔科夫过程，也叫马尔科夫链。

此处，如果一个词的出现只依赖于它前面的一个词，那么我们就称之为`bigram`。即`P(S) = P(w1w2w3...wn) = P(w1)p(w2|w1)P(w3|w2)...P(wn|wn-1)`；如果一个词的出现只依赖于它前面的两个词，那么我们就称之为`trigram`。

在实践中用的最多的就是bigram和trigram了，而且效果很不错。高于四元的用的很少，因为训练它需要更庞大的语料，而且数据稀疏严重，时间复杂度高，精度却提高的不多。

我们如何估计这些二元或N-gram概率？ 估计概率的直观方式称为最大似然估计或MLE。

我们通过从标准化语料库中获取计数并对计数进行标准化以使它们位于0和1之间来获得N-gram模型参数的MLE估计值。

例如，为了计算给定前一个词x的单词y的特定双字母概率，我们将计算双字母C（xy）的计数，并通过共享相同第一个单词x的所有双字母的总和进行归一化：`P(wn|wn-1) = C(wn-1wn)/sum(C(wn-1w))`。

此处可以简单理解为，在语料库中，找到wn和wn-1同时出现的次数`C(wn-1wn)`，和wn-1出现的次数`C(wn-1)`，我们就可以得到`P(wn|wn-1) = C(wn-1wn)/C(wn-1)`。

此时，我们就可以计算句子出现的概率啦，如：

已知`P(i|<s>) = 0.25, P(english|want) = 0.0011, P(food|english) = 0.5, P(</s>|food) = 0.68`，则句子*`I want English food`*的概率为:
```
  P(<s> i want english food </s>)
= P(i|<s>)P(want|i)P(english|want)P(food|english)P(</s>|food)
= 0.25 * 0.33 * 0.0011 * 0.5 * 0.68
= 0.000031
```

一个需要注意的问题是稀疏矩阵问题，假设词表中有20000个词，如果是bigram那么可能的N-gram就有400000000个，如果是trigram，那么可能的N-gram就有8000000000000个！那么对于其中的很多词对的组合，在语料库中都没有出现，根据最大似然估计得到的概率将会是0，这会造成很大的麻烦，在算句子的概率时一旦其中的某项为0，那么整个句子的概率就会为0，最后的结果是，我们的模型只能算可怜兮兮的几个句子，而大部分的句子算得的概率是0. 因此，我们要进行数据平滑（data Smoothing），数据平滑的目的有两个：一个是使所有的N-gram概率之和为1，使所有的N-gram概率都不为0。

在实际应用中，我们为了便于数学处理，一般使用`log`形式来表示概率。因为概率小于等于1，我们进行概率乘积计算时，其结果越来越小，可能会导致数值下溢(numerical underflow)。
`P1 * P2 * P3 * P4 = exp(logP1 + logP2 + logP3 + logP4)`。

## 评估语言模型
外部评估（extrinsic evaluation）：评估语言模型性能的最好方法是将其嵌入到一个应用中然后测量这个应用程序的改进程度。这种端对端的评估方法就叫外部评估。

但是，端对端的运行一个大型自然语言处理系统代价非常大。最好是能拥有一个可用于快速评估语言模型中潜在改进的度量标准。

内部评估（intrinsic evaluation）：内部评估指标是衡量独立于任何应用程序的模型质量的指标。

对于内部评估，需要测试集。如果要评估两个N-gram模型，首先将数据分成训练集和测试集，使用训练集对两个模型进行参数的训练，然后比较训练后的模型哪个更适合测试集。

适合训练集如何判定：哪个模型对于训练集给出更高的概率，表示预测的测试集更准确，也就是模型更好。

一般，我们将数据划分成80%训练集（training），10%开发集（development），10%测试集（test）。

## 困惑度（Perplexity）
在实践中，我们不使用原始概率作为评估语言模型的度量标准，而是使用称为困惑度（Perplexity）的变体。

语言模型在测试集上的困惑度（有时简称PP）是测试集的逆概率，由单词数量（句子长度）归一化。

对于测试集`W = w1w2w3...wN`：`PP(W) = P(w1w2w3...wN)^(-1/N)`。

两种语言模型的困惑只有在使用相同的词汇表时才具有可比性。困惑度PP(W)越小，P(W)越大，我们期望的句子出现的概率越高。PP越小，模型越好。


## 泛化和零（Generalization and Zeros）
N-gram模型与许多其他统计学模型一样，依赖于训练语料库。

N-gram模型对于出现了很多次的词，可能对它的概率有一个比较好的估计，但是对于语料库中没有的词，可能会出现零概率情况，但它们本身不一定是零概率。
例如：
```
# 语料库中对以下词汇的计数统计：
denied the allegations: 5
denied the speculation: 2
denied the rumors: 1
denied the report: 1

# 测试集
denied the offer
denied the loan
```
此时，模型会错误地估算`P(offer | denied the) = 0`。

这些零，也就是没有在训练集中出现，但是在测试集中出现，会带来问题：
* 它们的出现意味着我们低估了可能出现的各种单词的概率，这将损害我们想要在这些数据上运行的任何应用的性能。
* 如果测试集中任何单词的概率为0，则测试集的整个概率为0。根据困惑度的定义，如果某些词的概率为0，将无法计算困惑度，因为分母不能为0。

## 未知词汇

对于某些系统，这种情况不会发生，因为我们知道所有可能出现的词汇。这种封闭词汇系统（closed vocabulary system）中，测试集只能包含词库中的词。

这在某些领域是合理的假设，例如语音识别或机器翻译，其中我们有预先固定好的发音词典或短语表，因此语言模型只能使用该词典或短语表中的单词。

其他情况下，我们需要处理未知词汇（unknown words,），或者叫`out of vocabulary` (OOV) words。测试集中OOV词汇出现的比率叫做`OOV rate`。

一个开放词汇系统就是我们通过在前面加一个伪词`<UNK>`来建模这些测试集中可能出现的未知词汇。

训练未知词汇模型`<UNK>`概率的两种常用方式是：
* 第一种，通过提前选择一个固定的词汇表将该问题转换为封闭词汇：
  1. 提前选择一个固定的词汇表，
  2. 在文本规范化时，将任何不在训练集中的（OOV）词汇转换成未知词汇标记`<UNK>`，
  3. 根据`<UNK>`的计数来估计它的概率，就像训练集中的其他常规词汇一样。

* 第二种，在没有现有词汇表的情况下，隐式地创建一个词汇表，根据频率用`<UNK>`替换训练集中的词汇。如：
  * 可以把训练集中出现次数小于`n`的词汇替换成`<UNK>`，其中`n`是一个很小的数
  * 或者，提前选择一个等效的大小为`V`（如50000）的词汇表，并根据频率选择前`V`个词汇，将剩余的用`<UNK>`替换。


## 数据平滑处理（smoothing or discounting）
为了防止语言模型为看不见的事件（例如：训练集中的一些词汇出现在测试集中的未知上下文里，如，出现在训练后从未出现过的词汇后面）分配零概率，我们不得不从一些更频繁的事件中削减一些概率，将其分配给未知事件，这种修正方法就叫数据平滑处理。

常见的数据平滑处理方法：
add-1 smoothing, add-k smoothing, Stupid backoff, Kneser-Ney

### 拉普拉斯平滑（Laplace Smoothing）
最简单的数据平滑处理方式就是在进行概率归一化处理之前，给所有的二元语法出现的次数加一，这样，所有计数为0的二元语法的计数都变为1，以此类推，这种方法就叫拉普拉斯平滑，又叫加一平滑（add-1 smoothing）。

尽管拉普拉斯平滑不能很好地用于现代N-gram模型，但在介绍其他平滑算法中的很多概念很有用，给出了基线，并且对于像文本分类的任务，也是一个很实用的平滑算法。

拉普拉斯平滑在`unigram`概率中的应用：   
词`wi`与它的数量`ci`由词标记的总数`N`进行归一化，`P(wi) = ci / N`，

拉普拉斯平滑处理：词汇表中词汇的个数`V`    
`PLaplace(wi) = ci + 1 / N + V`

相对折扣（relative discount）：dc = c* / c = (c + 1)N / c(N + V)

### add-k smoothing
与加一平滑类似，只是把`1`改成了一个小数`k`（0.5，0.05，0.01），该算法需要我们有一个选择`k`的方法。该方法也不太适用于语言模型。

### 退避和插值（Backoff and Interpolation）
* Katz backoff：




## 相关论文
* Russell, S. and Norvig, P. (2002). Artificial Intelligence: A Modern Approach (2nd Ed.). Prentice Hall.
* 辅助沟通（augmentative communication）：Newell, A., Langer, S., and Hickey, M. (1998). The rˆole of natural language processing in alternative and augmentative communication. Natural Language Engineering, 4(1), 1–16.
* 伯克利餐厅项目：Jurafsky, D., Wooters, C., Tajchman, G., Segal, J., Stolcke, A., Fosler, E., and Morgan, N. (1994). The Berkeley restaurant project. In ICSLP-94, Yokohama, Japan, pp. 2139–2142.
* Shannon, C. E. (1951). Prediction and entropy of printed English. Bell System Technical Journal, 30, 50–64.
* Miller, G. A. and Selfridge, J. A. (1950). Verbal context and the recall of meaningful material. American Journal of Psychology, 63, 176–185.
* Buck, C., Heafield, K., and Van Ooyen, B. (2014). N-gram counts and language models from the common crawl. In Proceedings of LREC.
* Gale, W. A. and Church, K. W. (1994). What is wrong with adding one?. In Oostdijk, N. and de Haan, P. (Eds.), Corpus-Based Research into Language, pp. 189–198. Rodopi.