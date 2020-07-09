<template lang="pug">
.demo-container
  .demo-header
    span.demo-title Epage演示示例
    span.demo-btns
      Button.demo-btn(type='primary' size='small' @click='validateForm') 校验表单
      Button.demo-btn(type='warning' size='small' @click='resetForm') 重置表单
      Button.demo-btn(type='info' size='small' @click='getFormData') 获取表单值

  .demo-epage
    div(ref='form')

</template>
<script>
import widgets, { Render, Epage } from 'epage-iview'
// import * as richText from './widgets/richText'
import * as myRules from './rules'
import rootSchema from './schema.json'

const { Rule, helper } = Epage

// 扩展自定义rule
Rule.set(myRules)
// 自定义widget 的validators
helper.setValidators(widgets, { input: ['phone'] })
// const myWidgets = helper.mergeWidget(widgets, richText)

export default {
  data () {
    return {
      form: null,
      epage: null
    }
  },
  mounted () {
    // 基于dom渲染表单
    // this.formRender()
    // this.formDesign()
    this.getRootSchema().then(schema => {
      // 用于 调试 编辑和设计模式
      this.epage = this.formDesign(schema)
      this.getModel().then(model => {
        this.epage.store.updateModel(model)
      })

      // // 用于 调试 渲染模式
      // const form = this.formRender(schema)
      // this.form = form
      // this.getModel()
      //   .then(model => {
      //     console.log(423, model)
      //     form.store.updateModel(model)
      //   })
      // this.listenerForm(form)
    })
  },
  methods: {
    checkPreview (action) {
      const text = {
        reset: '请在预览视图重置表单',
        validate: '请在预览视图校验表单',
        formdata: '请在预览视查看表单值'
      }
      const tab = this.epage.store.getTab()
      if (tab !== 'preview') {
        this.$Message.warning(text[action])
        return false
      }
      return true
    },
    validateForm (args) {
      if (!this.checkPreview('validate')) return
      this.epage.$render.validateFields().then(args => {
        console.log('validate: ', args)
      })
    },
    resetForm (args) {
      if (!this.checkPreview('reset')) return
      this.epage.$render.resetFields()
    },
    getFormData () {
      if (!this.checkPreview('formdata')) return
      const formData = this.epage.$render.store.getFormData()
      this.$Notice.open({
        title: '提醒',
        desc: '请打开开发者工具查看form data值',
        duration: 2
      })
      console.log('form data: ', formData)
    },
    getRootSchema () {
      return Promise.resolve(rootSchema)
    },
    formRender (schema) {
      const el = this.$refs.form
      return new Render({ el, schema, widgets, mode: 'display' })
    },
    formDesign (schema) {
      const el = this.$refs.form
      // return new Epage({ el, Render })
      return new Epage({ el, widgets, schema, Render })
    },
    getSchema (schema) {
      console.log(1, schema)
    },
    getModel () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const model = {
            k2xzhr4ry: 'Karen Davis',
            kGZLAx3Vx: '讷讷呢',
            kZwV49N9y: 2,
            kdNpYtQt5: ['A'],
            kFTWtRmbd: 'A',
            k4Yvnwqbl: '12',
            kb82OHIBH: ''
          }
          resolve(model)
        }, 1000)
      })
    },
    listenerForm (form) {
      form
        .on('k17U0aTQ4', 'change', e => {
          console.log(e.target.value, 9999)
        })
        .on('k17U0aTQ4', 'enter', e => {
          console.log(e.target.value, 'enter')
        })
        .on('w1552011657389', 'change', e => {
          console.log('chagne: ', e.target.value)
        })
        .off('w1552011619728', 'change')
    }
  }
}
</script>
<style lang="less">
.demo-container {
  .demo-header {
    height: 50px;
    width: 100%;
    border-bottom: 1px solid #ddd;
    padding: 10px 16px;
    box-sizing: border-box;
    .demo-title {
      font-size: 18px;
      font-weight: bold;
    }
    .demo-btns {
      margin-left: 32px;
      vertical-align: bottom;
    }
    .demo-btn{
      margin-left: 16px;
    }
  }
  .demo-epage{
    position: fixed;
    top: 50px;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
</style>
