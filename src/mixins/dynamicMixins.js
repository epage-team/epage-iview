import Epage from 'epage'
const { ajax } = Epage.helper

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
        result = this.getDictAPIData(dictop)
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
    getDictAPIData (dictOpt) {
      let result = []
      const st = this.store.getStore()
      const { type, api, dict, dictAPI } = dictOpt || {}

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
      return result
    },
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
      const { url, adapter, type } = this.schema.option
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
        // root schema时以初始化
      }
    }
  }
}
