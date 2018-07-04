# git撤销修改
> 记录时间：2018-07-03

如果在准备提交之前，你使用`git status`查看，发现自己犯了一些错误，这是，你可以很容易地纠正它。

## 撤销工作区的修改
git提供了`git checkout -- file`，可以丢弃工作区的修改。

```bash
  git checkout -- readme.txt
```
命令`git checkout -- readme.txt`的意思是，把`readme.txt`文件在工作区的修改全部撤销，这里有两种情况：
1. `readme.txt`修改了之后还没有使用`git add`命令加到暂存区，则执行该命令之后，就回到和版本库一模一样的状态；
2. `readme.txt`已经添加到暂存区，又做了修改，此时，撤销修改后就回到添加到暂存区的状态。

总之：命令`git checkout -- file`就是让这个文件回到最近一次`git commit`或者`git add`时的状态。

**注意**：*`git checkout -- file`命令中的`--`非常重要，如果不加`--`，就变成了'切换到另一个分支'的命令*

如果你不小心错删了文件`test.txt`，同样可以使用该命令轻松复原
```
  git checkout -- test.txt
```
`git checkout`其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。


## 撤销暂存区的修改
git提供了`git reset HEAD <file>`，可以把暂存区的修改撤销掉（unstage），重新放回工作区。

`git reset`命令既可以回退版本，也可以把暂存区的修改回退到工作区。当我们用`HEAD`时，表示最新的版本。


## 版本回退
如果你不仅改错了东西，还从暂存区提交到了版本库，此时可以使用版本回退，回退到上一个版本。

当然，前提是：你还没有把自己的本地版本库推送到远程。

1. 我们可以使用`git log`查看历史记录
```
$ git log

  commit 08271148d85f9dad8fe555bd886a294a85c52a65 (HEAD -> master)
  Author: cj1406942109 <1406942109@qq.com>
  Date:   Mon Jul 2 14:56:46 2018 +0800

      append GPL

  commit 95c4e6026546252eb925ec3285b9e01c11c3aad7
  Author: cj1406942109 <1406942109@qq.com>
  Date:   Mon Jul 2 14:55:14 2018 +0800

      add distributed

  commit 688ee7bc5196f25af9071d0e109e77695d73e8ef
  Author: cj1406942109 <1406942109@qq.com>
  Date:   Mon Jul 2 14:51:11 2018 +0800

      add the readme file
```

2. `git log`命令显示的是从最近到最远的提交日志，如果嫌输出信息太多，可以加上`--pretty=oneline`参数：
```
$ git log --pretty=oneline

  08271148d85f9dad8fe555bd886a294a85c52a65 (HEAD -> master) append GPL
  95c4e6026546252eb925ec3285b9e01c11c3aad7 add distributed
  688ee7bc5196f25af9071d0e109e77695d73e8ef add the readme file
```

其中看到的一串字符（如`08271148d85f9dad8fe555bd886a294a85c52a65`）是`commit id`（版本号），是一个SHA1计算出来的一个非常大的数字，用十六进制表示。

因为Git是分布式的版本控制系统，为了防止多人在同一个版本库里工作出现冲突，所以不用1，2，3……作为版本号。

每提交一个新版本，实际上Git就会把它们自动串成一条时间线。如果使用可视化工具查看Git历史，就可以更清楚地看到提交历史的时间线。

3. 在git中，用`HEAD`表示当前版本，上一个版本是`HEAD^`，上上一个版本是`HEAD^^`，往上100个版本是`HEAD~100`。所以，要把当前版本回退到上一个版本，可以使用`git reset`命令：
```
  git reset --hard HEAD^
```

如果此时，你后悔进行了版本回退操作，想要回到之前最新的版本，你可以通过找到之前的`commit id`指定回到未来的版本：
```bash
  # commit id可以不填写完整，但是也不能太短，需要git能够唯一识别
  git reset --hard 082711
```

但是，如果你的命令行窗口已经关闭，没办法再看到之前的`commit id`，这时该怎么办呢？

4. 当然，git还是提供了解决办法的，git提供了一个命令`git reflog`用于记录你的每一次命令：
```bash
  $ git reflog
  0827114 (HEAD -> master) HEAD@{0}: reset: moving to 082711
  95c4e60 HEAD@{1}: reset: moving to 95c4e6026546252eb925ec3285b9e01c11c3aad7
  0827114 (HEAD -> master) HEAD@{2}: commit: append GPL
  95c4e60 HEAD@{3}: commit: add distributed
  688ee7b HEAD@{4}: commit (initial): add the readme file
```
使用该命令，又找回了之前的`commit id`，你可以再次使用`git reset`命令确定要跳转到哪个版本了。


## 总结
* 场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git checkout -- file`。

* 场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git reset HEAD <file>`，就回到了场景1，第二步按场景1操作。

* 场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，使用`git reset --hard <commit id>|Head^`，不过前提是没有推送到远程库。
