<template lang="pug">
.ep-widget.epiv-datePicker(:data-epkey='schema.key')
  template(v-if='mode === "display"')
    span {{model[schema.key]}}

  template(v-else)
    DatePicker(
      v-if='schema.key'
      :transfer='true'
      :disabled='schema.disabled'
      :placeholder='schema.placeholder'
      :size='schema.size || rootSchema.size'
      :type='getType()'
      :format='schema.option.format'
      :value="model[schema.key]"
      @on-change="onDateChange"
    )
</template>
<script>
import viewExtend from '../../extends/view'
import Epage from 'epage'

const { include } = Epage.helper
const timeOptions = ['HH:mm:ss', 'HH:mm', 'mm:ss']
const monthOptions = ['yyyy-MM', 'yyyy/MM']

export default {
  extends: viewExtend,
  methods: {
    onDateChange (value) {
      const { key } = this.schema
      const newValue = value
      const oldValue = this.store.getModel(key)
      if (newValue !== oldValue) {
        this.store.updateModel({ [key]: newValue })
        this.event('on-change', ...arguments)
      }
    },

    hasTime (format) {
      return !!timeOptions.filter(t => include(format, t)).length
    },

    isMonth (format) {
      return !!monthOptions.filter(t => include(format, t)).length && !include(format, 'dd')
    },

    getType () {
      const { option } = this.schema
      const { range, format } = option
      let type = 'date'

      if (range) {
        type = this.hasTime(format) ? 'datetimerange' : 'daterange'
      } else {
        if (format === 'yyyy') {
          type = 'year'
        } else if (this.isMonth(format)) {
          type = 'month'
        } else if (this.hasTime(format)) {
          type = 'datetime'
        } else {
          type = 'date'
        }
      }
      return type
    }
  }
}
</script>
