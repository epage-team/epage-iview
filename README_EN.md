# EpageIview

iview based [epage](https://github.com/didichuxing/epage) rendering package

English Introduction | [中文介绍](./README.md)

## Documents

Official website：[http://epage.didichuxing.com](http://epage.didichuxing.com)

- [Quick Start](http://epage.didichuxing.com/usage/#快速起步)
- [Development Documentation](http://epage.didichuxing.com/developer/)
- [Epage API](http://epage.didichuxing.com/developer/epage.html)
- [How to develop widget?](http://epage.didichuxing.com/developer/widget.html)
- [Online Demos](http://epage.didichuxing.com/examples/)

## Demo

**[Demo](http://epage.didichuxing.com/examples/render.html)**

## Install

```sh
npm install epage-iview -S
# or yarn add epage-iview
```

## Usage

-  `npm` (recommend)

```js
import widgets, { Render, Epage } from 'epage-iview'
import schema from './schema.json'
import 'epage-iview/src/style/main.less'

const el = document.getElementById('root')
// Instantiate Designer
new Epage({ el, widgets, schema, Render })
// or create Render
new Render({ el, widgets, schema })
```

-  `script`

```html
<!-- third-party style -->
<link href='https://cdn.bootcss.com/iview/3.5.1/styles/iview.css' rel='stylesheet'></link>
<link href='./epage-iview.css' rel='stylesheet'></link>

<!-- third lib -->
<script src='https://cdn.bootcss.com/vue/2.6.10/vue.min.js' ></script>
<script src='https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js' ></script>
<script src='https://cdn.bootcss.com/iview/3.5.1/iview.min.js' ></script>
<!-- The following two scripts are only needed for new Epage, not for new Render -->
<script src='//cdn.jsdelivr.net/npm/sortablejs@1.8.4/Sortable.min.js' ></script>
<script src='//cdnjs.cloudflare.com/ajax/libs/Vue.Draggable/2.20.0/vuedraggable.umd.min.js' ></script>

<script src="./epage.min.js"></script>
<script src="./epage-iview.min.js"></script>

<script>

const el = document.getElementById('root')
const { default: widgets, Render } = EpageIview

// Instantiate Designer
new Epage({ el, widgets, Render })
// or create Render
new Render({ el, widgets, schema })
</script>

```

## Communication Group

Wechat group

![](https://github.com/didi/epage/raw/master/public/imgs/epage-qrcode.png)

## License

[MIT](http://opensource.org/licenses/MIT)
