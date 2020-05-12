<template lang="pug">
.ep-widget
  template(v-if='mode === "display"')
    span {{displayValue}}

  template(v-else)
    Cascader(
      v-if='schema.key'
      :data='options'
      :placeholder='schema.placeholder'
      :disabled='schema.disabled'
      clearable
      transfer
      :size='size'
      v-model.trim='model[schema.key]'
      :render-format='renderFormat'
      @on-change="event('on-change', ...arguments)"
    )
</template>
<script>
import viewExtend from '../../extends/view'
import dynamicMixins from '../../mixins/dynamicMixins'

export default {
  extends: viewExtend,
  mixins: [dynamicMixins],
  computed: {
    size () {
      const size = this.schema.size || this.rootSchema.size

      return size === 'default' ? undefined : size
    },
    displayValue () {
      const label = []
      const { delimiter = '/' } = this.schema.option
      const rawValue = this.model[this.schema.key]

      this.findFinalValue(rawValue, label, this.options)
      return label.join(delimiter)
    },
    options () {
      // data 静态选项 dynamicData 动态选项
      const { type, data, dynamicData } = this.schema.option
      let result = []

      if (type === 'static') {
        result = data || []
      }
      if (type === 'dynamic') {
        result = dynamicData || []
      }
      return this.formatData(JSON.parse(JSON.stringify(result)))
    }
  },
  methods: {
    renderFormat (label) {
      const delimiter = this.schema.option.delimiter || '/'

      return label.join(delimiter)
    },
    /**
     * 递归找出符合值得label
     * @param {array} val=[] 组件的值
     * @param {array} label=[] 和组件值对应的label值
     * @param {array} array=[] 选项
     *
     */
    findFinalValue (val = [], label = [], array = []) {
      if (val.length === 0) return
      for (const item of array) {
        if (item.value === val[0]) {
          label.push(item.label)
          return this.findFinalValue(val.slice(1), label, item.children)
        }
      }
    },
    /**
     * 将数据形式kv转化为lv形式
     */
    formatData (source = []) {
      const labelAlias = 'value'
      const valueAlias = 'key'
      const keyMap = { [labelAlias]: 'label', [valueAlias]: 'value' }
      for (const item of source) {
        for (const key in keyMap) {
          item[keyMap[key]] = item[key]
        }
        if (Array.isArray(item.children)) {
          this.formatData(item.children)
        } else {
          item.children = []
        }
      }
      return source
    }
  }
}
</script>
