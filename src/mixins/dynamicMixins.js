import Epage from 'epage'
const { ajax } = Epage.helper
const { Dict, API } = Epage

export default {
  data () {
    return {
      worker: null
    }
  },
  computed: {
    options () {
      const { type, data, dynamicData } = this.schema.option // data 静态选项 dynamicData 动态选项
      let result = []

      if (type === 'static') {
        result = data
      }
      if (type === 'dynamic' || type === 'dict') {
        result = dynamicData
      }
      return result
    }
  },
  mounted () {
    const { type } = this.schema.option

    if (type !== 'static') {
      this.worker = new Epage.Worker()
      this.listenerMessage()
      this.getDynamicData()
    }
  },
  methods: {
    listenerMessage () {
      this.worker.onmessage = e => {
        // 存放临时数据
        const { message, success, data } = e.data

        if (success) {
          // 更新option中的值
          const { key } = this.schema

          this.store.updateWidgetOption(key, { dynamicData: data })
          this.$emit('success', data)
        } else {
          this.$emit('error', message)
        }
        this.worker.terminate()
      }
    },

    /**
     * 获取下拉组件动态选项
     */
    getDynamicData () {
      const storeData = this.rootSchema.store || { dicts: [], apis: [] }
      const { key } = this.schema.option
      const { url, adapter, type, dict } = this.schema.option
      if (type === 'dynamic') {
        if (!url) {
          return
        }
        ajax(url).then(res => {
          this.worker.postMessage({
            action: 'fetch',
            data: res,
            fn: adapter
          })
        }).catch(err => {
          this.$emit('error', {
            success: false,
            message: err
          })
        })
      } else if (type === 'dict') {
        if (dict.type === 'dict') {
          const dic = storeData.dicts.filter(item => item.name === dict.dict)[0]
          if (!dic) return
          const dictIns = new Dict(dic)

          dictIns.getData().then(() => {
            if (!Array.isArray(dictIns.data)) return

            const dictAPI = dic.data.filter(item => item.name === dictIns.dictAPI)[0]
            if (!dictAPI) return

            const apiIns = new API(dictAPI)
            apiIns.getData().then(() => {
              if (!Array.isArray(apiIns.data)) return
              this.store.updateWidgetOption(key, { dynamicData: [...apiIns.data] })
            })
          })
        } else if (dict.type === 'api') {
          const api = storeData.apis.filter(item => item.name === dict.api)[0]
          if (!api) return

          const apiIns = new API(api)
          apiIns.getData().then(() => {
            if (!Array.isArray(apiIns.data)) return
            this.store.updateWidgetOption(key, { dynamicData: [...apiIns.data] })
          })
        }
      }
    }
  }
}
