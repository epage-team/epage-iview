<template lang="pug">
.ep-widget(:data-epkey='schema.key')
  template(v-if='mode === "display"')
    span {{displayValue}}

  template(v-else)
    CheckboxGroup(
      v-if='schema.key'
      v-model='model[schema.key]'
      :size='schema.size || rootSchema.size'
      :class='cls'
      @on-change="event('on-change', ...arguments)"
    )
      Checkbox(
        v-for='(item, k) in options || []'
        :disabled='schema.disabled'
        :key='k'
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
    cls () {
      return {
        'epiv-checkbox-vertical': this.schema.option.direction === 'vertical'
      }
    },
    displayValue () {
      const value = this.model[this.schema.key]
      let result = []

      result = value ? value.map(item => {
        const option = this.options.find(option => option.key === item)

        return !!option && option.value
      }) : []

      return result + ''
    }
  }
}
</script>
