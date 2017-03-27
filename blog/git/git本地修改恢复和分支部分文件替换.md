# git本地修改恢复（尚未本地commit）
```git
git checkout file1      //恢复file1文件的修改
git checkout *.html     //恢复所有的.html文件

```


# git分支文件替换

//替换分支：branch1 中 test1/test2目录下的所有文件为 分支：branch2 中的test1/test2目录下的所有文件
```git
git checkout branch1

git checkout branch2 -- test1/test2
```