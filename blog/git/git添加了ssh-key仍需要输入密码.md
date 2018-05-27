# git 添加了ssh-key仍然需要输入密码

* 原因：更换机器或者重新克隆仓库时，使用的是`https`的方式，这时，在`git push`时就会要求输入用户名和密码
```bash
  git clone https://github.com/{username}/{projectname}.git
```

* 解决方法：使用`ssh`的方式进行仓库的克隆
* 另： 如果已经使用`https`的方式克隆了，不需要删除本地项目重新克隆，只需要 **修改`.git/config`文件中的`url`，将`https://github.com/{username}/{projectname}.git`改为`git@github.com:{username}/{projectname}.git`**即可。
