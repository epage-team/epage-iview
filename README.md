# EpageIview

基于iview组件库的 [epage](https://github.com/didichuxing/epage) 渲染包

[English Introduction](./README_EN.md) | 中文介绍

## 文档

官网：[http://epage.didichuxing.com](http://epage.didichuxing.com)

- [快速起步](http://epage.didichuxing.com/usage/#快速起步)
- [开发文档](http://epage.didichuxing.com/developer/)
- [设计器API](http://epage.didichuxing.com/developer/epage.html)
- [如何开发widget?](http://epage.didichuxing.com/developer/widget.html)
- [在线示例](http://epage.didichuxing.com/examples/)

## 演示地址

**[Demo](http://epage.didichuxing.com/examples/render.html)**

## 安装

```sh
npm install epage-iview -S
# or yarn add epage-iview
```

## 设计器及渲染器示例

-  `npm` 方式引入（推荐）

```js
import { render } from 'epage-core'
import Epage from 'epage'
import widgets, { entry } from 'epage-iview'
import 'iview/src/styles/index.less';
import 'epage/src/style/main.less'
import 'epage-iview/src/style/main.less'
import schema from './schema.json'

const el = document.getElementById('root')
// 设计器
new Epage({
  el,
  schema,
  pc: {
    widgets,
    Render: render.VueRender,
    component: entry
  }
})
// 或者创建渲染器
new render.VueRender({ el, widgets, schema, component: entry })
```

-  `script` 方式引入

```html
<!-- 样式 -->
<link href='https://cdn.bootcss.com/iview/3.5.1/styles/iview.css' rel='stylesheet'></link>
<link href='./epage.css' rel='stylesheet'></link>
<link href='./epage-iview.css' rel='stylesheet'></link>

<!-- 第三方脚本 -->
<script src='https://cdn.bootcss.com/vue/2.6.10/vue.min.js' ></script>
<script src='https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js' ></script>
<script src='https://cdn.bootcss.com/iview/3.5.1/iview.min.js' ></script>
<!-- 以下两个脚本仅在new Epage需要用，new Render不用 -->
<script src='//cdn.jsdelivr.net/npm/sortablejs@1.8.4/Sortable.min.js' ></script>
<script src='//cdnjs.cloudflare.com/ajax/libs/Vue.Draggable/2.20.0/vuedraggable.umd.min.js' ></script>

<script src="./epage-core.min.js"></script>
<script src="./epage.min.js"></script>
<script src="./epage-iview.min.js"></script>

<script>
const el = document.getElementById('root')
const { default: widgets, entry } = EpageIview
const { render } = EpageCore

// 设计器
new Epage({
  el,
  schema,
  pc: {
    widgets,
    Render: render.VueRender,
    component: entry
  }
})
// 或者创建渲染器
new render.VueRender({ el, widgets, schema, component: entry })
</script>

```

## 交流群

QQ群

<img src="https://img-hxy021.didistatic.com/static/star/epage-qrcode-qq.png" width="250">

## License

[MIT](http://opensource.org/licenses/MIT)
