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
import * as myRules from './rules'
import schema from './schema.json'

const { Rule, helper } = Epage

// 扩展自定义rule
Rule.set(myRules)
// 自定义widget 的validators
helper.setValidators(widgets, { input: ['phone'] })
// const myWidgets = helper.mergeWidget(widgets, richText)

export default {
  data () {
    return {
      epage: null,
      render: null,
      model: {
        k17U0aTQ4: '这是关键字'
      }
    }
  },
  mounted () {
    const el = this.$refs.form
    // 设计器
    this.epage = new Epage({ el, widgets, schema, Render })
    this.epage.$render.store.updateModel(this.model)
    // 渲染默认编辑模式
    // this.render = new Render({ el, widgets, schema })
    // this.render.store.updateModel(this.model)
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
    listenerForm (form) {
      // 添加监听
      form
        .on('k17U0aTQ4', 'change', e => {
          console.log(e.target.value, 9999)
        })
        // .off('k17U0aTQ4', 'change')
    },
    saveForm (schema) {
      console.log('schema: ', schema)
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
