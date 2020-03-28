# Change Log

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
