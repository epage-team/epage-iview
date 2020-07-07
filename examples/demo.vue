<template lang="pug">
.form-demo
  div.demo-container(ref='form')
  Button(type='default' @click='validateForm') 校验
  Button(type='default' @click='resetForm') 重置
  Button(type='default' @click='getFormData') getFormData
  //- Button(type='default' @click='getSchema') getSchema

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
      form: null
    }
  },
  mounted () {
    // 基于dom渲染表单
    // this.formRender()
    // this.formDesign()
    this.getRootSchema().then(schema => {
      // 用于 调试 编辑和设计模式
      const epage = this.formDesign(schema)
      this.getModel().then(model => {
        epage.store.updateModel(model)
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
    validateForm (args) {
      this.form.validateFields().then(args => {
        console.log('validate: ', args)
      })
    },
    resetForm (args) {
      this.form.resetFields()
    },
    getRootSchema () {
      return Promise.resolve(rootSchema)
    },
    formRender (schema) {
      const el = this.$refs.form
      // return new Render({ el, schema, widgets: myWidgets})
      return new Render({ el, schema, widgets, mode: 'display' })
      // return this.render(el, { mode: 'edit' })
    },
    formDesign (schema) {
      const el = this.$refs.form
      // return new Epage({ el, Render })
      const { getSchema, getFormData } = this
      return new Epage({ el, widgets, schema, Render, getSchema, getFormData })
    },
    getSchema (schema) {
      console.log(1, schema)
    },
    getFormData (formData) {
      console.log(2, formData)
      // console.log(this.form.store.getFormData())
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
.form-demo{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
