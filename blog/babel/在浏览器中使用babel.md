# 在浏览器中使用babel

## 使用方法

### 使用babel-standalone
```html
<div id="output"></div>
<!-- Load Babel -->
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
<!-- Your custom script here -->
<script type="text/babel">
const getMessage = () => "Hello World";
document.getElementById('output').innerHTML = getMessage();
</script>
```