<template lang="pug">
.ep-widget
  template(v-if='mode === "display"')
    span {{model[schema.key]}}

  template(v-else)
    DatePicker(
      v-if='schema.key'
      :transfer='true'
      :class='cls'
      :disabled='schema.disabled'
      :placeholder='schema.placeholder'
      :size='schema.size || rootSchema.size'
      :type='schema.option.type'
      :format='schema.option.format'
      :value="model[schema.key]"
      @on-change="onDateChange"
    )
</template>
<script>
import viewExtend from '../../extends/view'

export default {
  extends: viewExtend,
  computed: {
    cls () {
      let result = {}
      const { option } = this.schema
      if (option && option.type === 'datetimerange') {
        const size = this.schema.size || this.rootSchema.size || 'default'
        result = `ep-widget-datePicker-${size}`
      }
      return result
    }
  },
  methods: {
    onDateChange (value) {
      const newValue = value
      const oldValue = this.store.getModel(this.schema.key)
      if (newValue !== oldValue) {
        this.store.updateModel({ [this.schema.key]: newValue })
        this.event('on-change', ...arguments)
      }
    }
  }
}
</script>
