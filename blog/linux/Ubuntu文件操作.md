# Ubuntu 文件操作
> 记录时间：2016-11-10


## 文件操作命令

### 文件及目录移动：
```bash
  # 将file1的文件名改为file2
  mv file1  file2

  # 将file1文件移动到目录dir1下，文件名仍为file1
  mv file1 dir1

  # 若目录dir2存在，则将目录dir1及其所有文件和子目录，移动到目录dir2下，新目录名仍为dir1。若目录dir2 不存在，则将dir1的目录名改为dir2
  mv dir1 dir2
```

### 创建一个空文件及目录：
```bash
  # 创建一个空文件，名为filename
  touch filename

  # 创建一个目录，名为dirname
  mkdir dirname
```

### 删除文件及目录：
```bash
  # 删除一个空目录
  rmdir emptydir

  # 删除一个或多个文件
  rm file1 file2

  # 强制删除一个文件
  rm -f file

  # 删除一个非空目录下的所有文件
  rm -r dir

  # 强制删除非空目录下的所有文件，不提醒
  rm -rf dir
```

### 文件重命名：
```bash
  # //将file1.txt的文件名改为file2.txt
  rename 's/file1/file2' *.txt
```
> 详细信息见博客：http://cssor.com/linux-rename-files.html

