import { render, helper } from 'epage-core'
import mobileWidgets, { entry as mobileEntry } from 'epage-vant'
import pcWidgets, { entry as pcEntry } from 'epage-iview'
// import StyleSetting from './settings/style-etting.vue'
import vant from 'vant'
import schema from './schema.json'
// import Vue from 'vue'

class EpagePlugin{
  constructor(option) {
  }
  apply (hooks, epage) {
    hooks.life.beforeCreate.tap(function ()  {
      console.log(11, this)
    })
    
    hooks.life.beforeCreate.tap(function ()  {
      console.log(13, this)
    })
    hooks.life.created.tap(({ ctx }) => {
      console.log(ctx, this.option, 99)
    })
    hooks.life.beforeDestroy.tap(() => {
      console.log(ctx, this.option, 12)
    })
    hooks.life.destroyed.tap((ctx) => {
      console.log(ctx, 49)
    })

    hooks.schema.copy.tap((str) => {
      return str + '\n\n ====== the end ====='
    })
    hooks.life.beforeCreate.tap(function ()  {
      console.log(12, this)
    })
  }
}

class EpageInitPlugin{
  // constructor(option) {
  // }
  apply (hooks) {
    hooks.render.init.tap(function({ Vue }) {
      helper.usePlugins(Vue, [vant])
    })
  }
}

export default {
  env: 'production',
  // el: document.getElementById('id'),
  // 以下3个属性将移动到 pc | mobile属性中
  // widgets: pcWidgets,
  // Render: render.VueRender,
  // component: pcEntry,
  
  schema,
  plugins: [
    new EpageInitPlugin(),
    // new EpagePlugin()
  ],
  panels: {
  //   // 自定义顶栏面板
  // header: false
    header: {
      // render: function ({ el, store, ctx }) {
      //   console.log(11, el, store)
      //   new Vue({
      //     data () {
      //       return {
      //         title: 'ssss'
      //       }
      //     },
      //     template: '<div style="border-bottom: 1px solid #ddd;"><h2>{{title}}<button @click="click">click</button></h2></div>',
      //     mounted () {
      //       console.log(this.title)
      //     },
      //     methods: {
      //       click () {
      //         ctx.$emit('change-view', 'mobile')
      //         console.log('clicked: ', this.title)
      //       }
      //     }
      //   }).$mount(el)
      // },

      // left: {
      //   // render: function({ el, store, ctx }) {
      //   //   console.log(9999, el)
      //   //   el.innerText = 'Epage演示示例'
      //   // },
      //   // style: 'color:#f00'
      // },
      center: {
        // render: function({ el, store, ctx }) {
        //   return 'PC + H5'
        // },
        // style: 'font-size: 20px;'
      },
      right: {
        // logic: false,
        // schema: false,
        // preview: false,
        // help: false,
        // render: function({ el, store, ctx }) {
        // },
        style: ''
      },
      // style: 'color: red;',
      // render: function(el, store) {
      // }
    },
  },
  // 默认渲染视图，pc还是mobile
  view: 'pc', // pc | mobile,
  // mobile模式下渲染器及widgets
  mobile: {
    component: mobileEntry,
    widgets: mobileWidgets,
    Render: render.VueRender
  },
  // pc模式下渲染器及widgets
  pc: {
    component: pcEntry,
    widgets: pcWidgets,
    Render: render.VueRender
  },
  // 通用的扩展配置
  // settings: [
  //   {
  //     name: '样式',
  //     key: 'style',
  //     // framework: 'vue',
  //     // component: StyleSetting,
  //     component: function({ el, store }) {
  //       console.log(111, el)
  //       el.innerHTML = '<h2>asdfa sdaf</h2>'
  //     }
  //   }
  // ]
}
