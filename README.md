# epage-iview

> 基于iview组件库的epage渲染包

## 演示地址

**[epage-iview](http://epage.didichuxing.com/examples/render.html)**

## 安装

```sh
npm install vue@2.x vuex@3.x iview@2.x epage-iview -S
```

## 设计器及渲染器示例

-  `npm` 方式引入（推荐）

```js
import Vue from 'vue'
import Vuex from 'vuex'
import iview from 'iview'
import widgets, { Render, Epage } from 'epage-iview'
import schema from './schema.json'
import 'epage-iview/src/style/main.less'

// 项目中已经use后不需要再次use
Vue.use(Vuex)
Vue.use(iview)

const el = document.getElementById('root')
// 设计器
new Epage({ el, widgets, schema, Render })
// 渲染器
new Render({ el, widgets, schema })
```

-  `script` 方式引入

```html
<!-- style lib -->
<link href='https://cdn.bootcss.com/iview/3.5.1/styles/iview.css' rel='stylesheet'></link>
<link href='./epage.css' rel='stylesheet'></link>
<link href='./epage-iview.css' rel='stylesheet'></link>

<!-- third lib -->
<script src='https://cdn.bootcss.com/vue/2.6.10/vue.min.js' ></script>
<script src='https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js' ></script>
<script src='https://cdn.bootcss.com/iview/3.5.1/iview.min.js' ></script>
<script src='//cdn.jsdelivr.net/npm/sortablejs@1.8.4/Sortable.min.js' ></script>
<script src='//cdnjs.cloudflare.com/ajax/libs/Vue.Draggable/2.20.0/vuedraggable.umd.min.js' ></script>

<script src="./epage.min.js"></script>
<script src="./epage-iview.min.js"></script>

<script>
Vue.use(Vuex)
Vue.use(iview)
const el = document.getElementById('root')
const { default: widgets, Render } = EpageIview

// 设计器
new Epage({ el, widgets, Render })
// 渲染器
new Render({ el, widgets, schema })
</script>

```

## 文档

关于`schema`定义、使用文档及开发者文档， [epage文档](http://epage.didichuxing.com/)

## License

[MIT](http://opensource.org/licenses/MIT)
