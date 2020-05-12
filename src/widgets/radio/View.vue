<template lang="pug">
.ep-widget
  template(v-if='mode === "display"')
    span {{displayValue}}

  template(v-else)
    RadioGroup(
       v-if='schema.key'
      :disabled='schema.disabled'
      :size='schema.size || rootSchema.size'
      :vertical='schema.option.direction === "vertical"'
      v-model='model[schema.key]'
      @on-change="event('on-change', ...arguments)"
    )
      Radio(
        v-for='(item, k) in options || []'
        :key='item.key'
        :label='item.key'
      ) {{item.value}}
</template>
<script>
import viewExtend from '../../extends/view'
import dynamicMixins from '../../mixins/dynamicMixins'

export default {
  extends: viewExtend,
  mixins: [dynamicMixins],
  computed: {
    displayValue () {
      const value = this.model[this.schema.key]
      const result = this.options
        .filter(item => item.key === value)
        .map(item => item.value)

      return result + ''
    }
  }
}
</script>
