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
      const { type, data, dynamicData, dict: dictop } = this.schema.option // data 静态选项 dynamicData 动态选项
      let result = []

      if (type === 'static') {
        result = data
      }
      if (type === 'dynamic') {
        result = dynamicData
      }
      if (type === 'dict') {
        const st = this.store.getStore()
        const { type, api, dict, dictAPI } = dictop || {}

        if (type === 'api') {
          const apiIns = st.apis.filter(item => item.name === api)[0]
          result = (apiIns || {}).data || []
        } else if (type === 'dict') {
          const dictIns = st.dicts.filter(item => item.name === dict)[0]
          if (dictIns && dictIns.data) {
            const apiIns = dictIns.data.filter(item => item.name === dictAPI)[0]
            result = (apiIns || {}).data || []
          }
        }
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
          const dictIns = (dic instanceof Dict) ? dic : new Dict(dic)

          if (dictIns.data.length === 0) {
            dictIns.getData().then(() => {
              this.fetchAPI(dictIns, dict.dictAPI)
            })
          } else {
            this.fetchAPI(dictIns, dict.dictAPI)
          }
        } else if (dict.type === 'api') {
          const api = storeData.apis.filter(item => item.name === dict.api)[0]
          if (!api) return

          const apiIns = (api instanceof API) ? api : new API(api)
          apiIns.getData()
        }
      }
    },

    fetchAPI (dictIns, dictAPI) {
      const curAPI = dictIns.data.filter(item => item.name === dictAPI)[0]

      if (!curAPI) return
      const apiIns = (curAPI instanceof API) ? curAPI : new API(curAPI)

      if (apiIns.data.length === 0) {
        apiIns.getData()
      }
    }
  }
}
