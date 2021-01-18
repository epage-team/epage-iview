# Change Log

### 0.6.1（2021/1/18）

- [fix] : 修复widget被二次添加时，widget.Setting生命周期没有再次使用问题

### 0.6.0（2020/12/31）

- [feat] : 开放单一widget样式配置，自定义高级背景配置
- [feat] : 新增`text` widget能力，支持`{{$f[schema.name]]}}`表达式运算

### 0.5.0（2020/11/04）

- [feat] : 实例化支持指定组件渲染
```js
new Render(..., component )
// component 为vue组件
```
- [feat] : 设计时，配置面板支持扩展tab
```js
const settings = [
  { key: 'style', title: '样式设置', component: VueComponent }
]
new Epage({..., settings })
```
- [fix] : 修复全局样式最终渲染时不生效问题

### 0.4.1（2020/10/20）

- [feat] : 逻辑关系中，被控组件存在多值时，增加值的 `或`、`且` 关系
- [feat] : 逻辑关系比较增加值类型条件
- [feat] : 去除工具面板图标，以通用
- [fix] : 修复 `cascader` 值类型转换未递归问题

### 0.4.0（2020/10/12）

- [feat] : 增加widget显隐属性默认值，逻辑配置面板，不符合条件时回退到默认值
- [feat] : 逻辑配置面板，可配置自定义脚本，可直接使用ctx全局变量，关于ctx可参考button的[ctx](http://epage.didichuxing.com/examples/widgets/button.html#schema-option%E5%AE%9A%E4%B9%89)

### 0.3.8（2020/08/19）

- [fix] : 修复`datePicker`、`timePicker`在设计器中，默认值为*使用时日期*时，切换其他组件默认值被修改问题

### 0.3.7（2020/08/18）

- [fix] : 修复上个版本增加`json`类型忽略`undefined`情况导致渲染报错

### 0.3.6（2020/08/17）

- [feat] : 增加`json`表单类型校验


### 0.3.5（2020/08/13）

- [fix] : 修复从设计器实例页跳转到其他页，重新返回设计器页预览视图未显示问题


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
