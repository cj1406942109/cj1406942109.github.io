# latex文档的基本构成
> 记录时间：2018-07-04

一篇LATEX 文档, 由三个部分组成: 文档类声明, 导言区, 正文。
  ```tex
    \documentclass{article}
    \usepackage{hyperref}
    \begin{document}
      Hello World!
    \end{document}
  ```

* 文档类：`\documentclass{...}`，里面声明你要书写什么样式的文档，常用的有：`article`，`book`，`report`。可以自己定义一个新的文档类， 对文章的总体样式和各个细节进行声明， 或者定义自己的命令。
* 正文：即`\begin{document}`和`\end{document}`之间的部分。
* 导言区： 夹在`\documentclass{...}`和`\begin{document}`之间的部分，放置需要使用的宏包，或者自己规定一些新的命令。如：
  ```tex
    \documentclass{article}
    \newcommand{\wuda}{中国湖北省武汉市武汉大学}
    \begin{document}
      你好，我来自\wuda。
    \end{document}
  ```
  定义了一个新命令`\wuda`，得到的正文内容就是`你好，我来自中国湖北省武汉市武汉大学。`

  可能你需要定义的东西太多，这时，可以将它们写在一个文档里，这种文档就是宏包，使用时，只需要在导言区用`\usepackage{...}`，即可插入该文档的内容。

  例如，我们想书写一个数学符号⊵，该数学符号已经由宏包amssymb 定义过了， 这样只需要在导言区写上\usepackage{amssymb}， 加载该宏包即可。
  ```tex
    \documentclass{ctexart}
    \usepackage{amssymb}
    \begin{document}
      $\unrhd$
    \end{document}
  ```
