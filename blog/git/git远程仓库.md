# git远程仓库
> 记录时间：2018-07-03

在本地创建了一个Git仓库后，想要在GitHub创建一个Git仓库，并且让这两个仓库进行远程同步，这样，GitHub上的仓库既可以作为备份，又可以让其他人通过该仓库来协作，真是一举多得。


在github上创建了空仓库之后，可以从该仓库克隆出新的仓库，也可以把一个已有的本地仓库与之关联，然后，把本地仓库的内容推送到GitHub仓库。

1. 关联

```
  git remote add origin git@github.com:{username}/{repositoryname}.git
```
注意：上面的`username`和`repositoryname`分别是你的用户名和新创建的仓库名。

2. 推送

下一步，就可以把本地仓库的所有内容推送到远程仓库上

```
  git push -u origin master
```

把本地库的内容推送到远程，用git push命令，实际上是把当前分支master推送到远程。

由于远程仓库是空的，我们第一次推送时，加上了`-u`参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。

推送成功后，可以立刻在GitHub页面中看到远程库的内容已经和本地一模一样。

从现在起，只要本地做了提交，就可以使用命令`git push origin master`把本地`master`分支的最新修改推送至GitHub。

