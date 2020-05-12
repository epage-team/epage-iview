<template lang="pug">
.ep-widget
  template(v-if='mode === "display"')
    span {{model[schema.key]}}
  template(v-else)
    AutoComplete(
      v-if='schema.key'
      :size='schema.size || rootSchema.size'
      :placeholder='schema.placeholder'
      :disabled='schema.disabled'
      :clearable='schema.option.clearable'
      v-model.trim='model[schema.key]'
      @on-search="onSearch('on-search', ...arguments)"
      @on-change="event('on-change', ...arguments)"
      @on-select="event('on-select', ...arguments)"
      @on-focus="event('on-focus', ...arguments)"
      @on-blur="event('on-blur', ...arguments)"
    )
      Option(
        v-for='(item, k) in list || []'
        :key='k + "-"'
        :value='item'
      ) {{item}}
</template>
<script>
import Epage from 'epage'
import viewExtend from '../../extends/view'

const { ajax, debounce } = Epage.helper

export default {
  extends: viewExtend,
  data () {
    return {
      list: [], // 备选数据
      searchValue: '', // 过滤筛选的输入值
      worker: null
    }
  },
  mounted () {
    this.worker = new Epage.Worker()
    this.listenerMessage()
  },
  destroyed () {
    this.worker.terminate()
  },
  methods: {
    listenerMessage () {
      this.worker.onmessage = e => {
        const { message, success, data } = e.data

        if (success) {
          // 更新获取到的动态选项
          const { key } = this.schema
          this.store.updateWidgetOption(key, { dynamicData: data })
          this.$emit('success', data)
          this.list = (data || []).filter(item => {
            item = item + ''
            return item && item.indexOf(this.searchValue) > -1
          })
        } else {
          this.$emit('error', message)
        }
      }
    },

    onSearch (type, value) {
      this.searchValue = value
      // this.event(type, value)
      // spf 右侧设置输入项
      const { type: dataType, data, url, adapter } = this.schema.option
      let result = []

      if (dataType === 'static') {
        result = data.filter(item => {
          item = item + ''
          return item && item.indexOf(value) > -1
        })
      } else if (dataType === 'dynamic' && url && value.trim()) {
        this.getDynamicData(url, value, adapter, this)
      }
      this.list = result
    },

    getDynamicData: debounce((url, value, adapter, self) => {
      ajax(`${url}${value}`).then(res => {
        this.worker.postMessage({
          action: 'fetch',
          data: res,
          fn: adapter
        })
      }).catch(err => {
        self.$emit('error', { success: false, message: err })
      })
    }, 1000 * 1)
  }
}
</script>
