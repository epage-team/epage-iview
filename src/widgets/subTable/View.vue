<template lang="pug">
.ep-widget
  template(v-if='mode === "display"')
    span {{model[schema.key]}}

  template(v-else)
    Table(
      :data='tableData()'
      :stripe='schema.option.stripe'
      :show-header='schema.option.showHeader'
      :size='schema.size || rootSchema.size'
      :no-data-text='schema.placeholder'
      :columns='schema.option.columns'
    )
    .ep-widget-subTable-page
      Page(
        v-if='schema.option.page'
        :class='pageClass'
        :total='schema.option.page.total'
        :current='schema.option.page.current'
        :page-size='schema.option.page.size'
        :show-total='schema.option.page.showTotal'
        :transfer='true'
      )
</template>
<script>
import Epage from 'epage'
import viewExtend from '../../extends/view'

const { ajax } = Epage.helper

export default {
  extends: viewExtend,
  data () {
    return {
      worker: null
    }
  },
  computed: {
    pageClass () {
      let pos = 'left'
      const positions = 'left|center|right'.split('|')
      const { position } = this.schema.option.page

      if (positions.indexOf(position) > -1) {
        pos = position
      }
      return `ep-widget-subTable-page-${pos}`
    }
  },
  mounted () {
    this.worker = new Epage.Worker()
    this.listenerMessage()
    this.getDynamicData()
  },
  methods: {
    tableData () {
      const { page = {}, dynamicData } = this.schema.option

      return dynamicData.slice(0, page.size)
    },

    listenerMessage () {
      this.worker.onmessage = e => {
        const { message, success, data } = e.data

        if (success) {
          const { key } = this.schema
          const option = { page: data.page, dynamicData: data.data }

          this.store.updateWidgetOption(key, option)
        } else {
          console.log('error: ', message)
        }
        this.worker.terminate()
      }
    },

    /**
     * 获取下拉组件动态选项
     */
    getDynamicData () {
      const { url, adapter } = this.schema.option
      // const { tab } = this.store.state
      const tab = this.store.getTab()

      if (!url || tab === 'design') {
        return
      }
      ajax(url).then(res => {
        this.worker.postMessage({
          action: 'tableFetch',
          data: res,
          fn: adapter
        })
      }).catch(err => {
        console.log('get table data error: ', err)
        // this.$emit('error', { success: false, message: err })
      })
    }
  }
}
</script>
