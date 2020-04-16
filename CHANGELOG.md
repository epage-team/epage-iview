# Change Log


### 0.2.5

- [fix] : 修复隐藏widget依然进行表单规则校验问题，增加`getFormRules`

### 0.2.4

- [fix] : 升级Epage，去除非表单widget的Schema部分静态属性（`validators`和`type`）

### 0.2.3

- [fix] : 升级Epage，优化部分基础widget datePicker、timePicker、cascader、inputNumber设置表单不准确问题

### 0.2.2

- [fix] : 升级Epage，优化默认widget的Schema字段，删除冗余，更新默认字段
- [fix] : 优化View组件内mode值获取逻辑

### 0.2.1

- [fix] : 升级Epage，修复逻辑面板widget名展示不准确问题
- [fix] : 修复`store.getFormData()`存在多余字段问题

### 0.2.0

- [feat] : 升级Epage，替换 `Epage.Schema` 为 `Epage.schema`，其中  `Epage.schema`为如下：

```js
Epage.schema.BaseSchema // 基础Schema，所有Schema都将继承，只包含schema必须字段
Epage.schema.FormSchema // 针对表单提供的特定场景Schema，
Epage.schema.RootSchema // 根Schema，继承至grid widget的Schema
```
- [feat] : 替换 `schema.title` 为 `schema.label`

### 0.1.0

- [feat] : 正式开源第一版
