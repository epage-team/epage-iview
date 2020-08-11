# Change Log

### 0.3.4（2020/08/11）

- [feat] : 替换`Button`自定义脚本实现，使用`epage`的`Context`及`Script`

### 0.3.3（2020/08/01）

- [feat] : 增加基础widget默认值
- [feat] : button增加自定义脚本

### 0.3.2（2020/07/23）

- [fix] : 修复`inputNumber`、`timePicker`、`datePicker`宽度未通栏自适应问题


### 0.3.1（2020/07/22）

- [feat] : 设计时增加有页面配置属性
- [fix] : 修复级联、下拉、复选等widget设计是key输入失焦问题

### 0.3.0（2020/07/09）

- [feat] : 重构设计器工具栏，分类方式展示
- [feat] : 重构底层依赖，由原先`epage`拆分成`epage`（设计器管理界面）、`epage-core`(设计器及渲染器核心模块)
- [feat] : 依赖项变更，安装本库时自动安装`epage`、`epage-core`、`vue`、`vuex`、`iview`等
- [feat] : 基础widget原生dom添加`data-epkey`属性，值为`schema.key`，用于特定场景下操作dom需求

### 0.2.7（2020/06/20）

- [fix] : 修复helper模块下formatDate格式化时间HH未替换问题
- [fix] : 修复autoComplete模糊查询时，接口地址拼接错误问题

### 0.2.6（2020/06/11）

- [feat] : `worker`支持`custom`类型脚本，不对结果进行校验
- [chore] : 更新打包脚本

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
