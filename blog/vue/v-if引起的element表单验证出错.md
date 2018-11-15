# v-if引起的element表单验证出错
> 记录时间：2018-11-16

## 问题描述

使用`v-if`进行表单切换，结合element-ui的表单验证使用时，可能会出现表单验证失效的问题：

```html
<script src="//unpkg.com/vue/dist/vue.js"></script>
<script src="//unpkg.com/element-ui@2.4.9/lib/index.js"></script>
<div id="app">
<el-button @click="change=!change">切换表单</el-button>

<el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-width="100px" class="demo-ruleForm" v-if="change">
  <h2>表单1</h2>
  <el-form-item label="活动名称" prop="name">
    <el-input v-model="ruleForm1.name"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm1')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm1')">重置</el-button>
  </el-form-item>
</el-form>

<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" v-if="!change">
  <h2>表单2</h2>
  <el-form-item label="活动名称" prop="name">
    <el-input v-model="ruleForm2.name"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm2')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
  </el-form-item>
</el-form>
</div>
```

```js
var Main = {
    data() {
      return {
        ruleForm1: {
          name: ''
        },
        ruleForm2: {
          name: ''
        },
        rules1: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        },
        rules2: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        },
        change: false
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
var Ctor = Vue.extend(Main)
new Ctor().$mount('#app')
```

## 解决办法

在表单元素`el-form`添加`key`属性进行区分

```html
<el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-width="100px" class="demo-ruleForm" v-if="change" key="ruleForm1">

....

<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" v-if="!change" key="ruleForm2">
```

具体原因参考：

- [表单切换验证规则不生效](https://blog.csdn.net/liangxhblog/article/details/81144860)
- [v-if案例解析](https://www.cnblogs.com/teamblog/p/9566415.html)
- 