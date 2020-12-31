<template lang="pug">
.ep-widget(:data-epkey='schema.key')
  div {{parseContent(schema.option.content)}}

</template>
<script>
import viewExtend from '../../extends/view'

export default {
  extends: viewExtend,
  computed: {
    content () {
      return this.parseContent(this.schema.option.content)
    }
  },
  methods: {
    parseContent (content) {
      const reg = /{{([^{}]*)}}/g
      const matched = content.match(reg)
      let result = content
      if (matched) {
        result = matched.reduce((c, m) => c.replace(m, this.calculateExp(m)), content)
      }
      return result
    },
    calculateExp (exp) {
      const matched = exp.match(/{{([\s\S]*)}}/)
      if (!Array.isArray(matched)) return exp
      const code = matched[1]
      let result = exp
      try {
        /* eslint-disable no-new-func */
        const value = new Function('$f', 'return ' + code.trim())(this.store.getFormData())
        if (value !== undefined) {
          if (typeof value === 'number') {
            result = Number(value.toFixed(4))
          } else {
            result = value
          }
        }
      } catch (e) {
      }
      return result
    }
  }
}
</script>
