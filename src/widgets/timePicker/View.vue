<template lang="pug">
.ep-widget
  template(v-if='mode === "display"')
    span {{model[schema.key]}}

  template(v-else)
    TimePicker(
       v-if='schema.key'
      :transfer='true'
      :type='type'
      :format='schema.option.format'
      :disabled='schema.disabled'
      :placeholder='schema.placeholder'
      :size='schema.size || rootSchema.size'
      v-model='model[schema.key]'
      @on-change="event('on-change', ...arguments)"
    )
</template>
<script>
import viewExtend from '../../extends/view'

export default {
  extends: viewExtend,
  computed: {
    type () {
      return this.schema.option.range ? 'timerange' : 'time'
    }
  }
}
</script>
