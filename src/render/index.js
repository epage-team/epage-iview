import Vue from 'vue'
import Epage from 'epage'
import FormRender from './index.vue'

const { Store, Rule, helper } = Epage
const { isArray, isFunction, isPlainObject } = helper

export default class Render {
  constructor (option) {
    const { el, store, widgets = [], mode, schema, Rule: CustomRule } = option

    this.el = el
    this.mode = mode || 'edit'
    this.$$origin = null
    this.store = null
    // 设计模式下，状态共享epage设计器内store
    if (store) {
      this.store = store
      this.$$origin = this.render()
    } else {
      this.store = new Store({ Rule: CustomRule || Rule })
      if (isArray(widgets)) {
        this.store.initWidgets(widgets)
        if (isPlainObject(schema)) {
          this.store.initRootSchema(schema)
        }
        this.$$origin = this.render()
      } else {
        console.error('widgets must be an array')
      }
    }
    this.on = FormRender.on
    this.off = FormRender.off
  }

  render (option = {}) {
    const { el, store, mode } = this
    const extension = { store, mode: option.mode || mode }
    const root = document.createElement('div')

    root.setAttribute('style', 'display:block;height: 100%;')
    el.appendChild(root)

    return new Vue({
      extension,
      el: root,
      render: h => h(FormRender)
    })
  }

  validateFields () {
    const { $children } = this.$$origin

    if (isArray($children) && $children[0]) {
      return $children[0].validateFields()
    }
  }

  resetFields () {
    const { $children } = this.$$origin

    if (isArray($children) && $children[0]) {
      return $children[0].resetFields()
    }
  }

  destroy () {
    if (this.$$origin && isFunction(this.$$origin.$destroy)) {
      this.$$origin.$destroy()
      this.$$origin.$off()
      this.el.removeChild(this.$$origin.$el)
    }
  }
}
