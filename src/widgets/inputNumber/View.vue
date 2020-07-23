<template lang="pug">
.ep-widget.epiv-inputNumber(:data-epkey='schema.key')
  template(v-if='mode === "display"')
    span {{model[schema.key]}}

  template(v-else)
    InputNumber(
      v-if='schema.key'
      :min='schema.option.min'
      :max='schema.option.max'
      :step='schema.option.step'
      :precision='schema.option.precision'
      :placeholder='schema.placeholder'
      :disabled='schema.disabled'
      :size='schema.size || rootSchema.size'
      v-model='model[schema.key]'
      @on-change="event('on-change', ...arguments)"
      @on-focus="event('on-focus', ...arguments)"
      @on-blur="event('on-blur', ...arguments)"
    )
</template>
<script>
import viewExtend from '../../extends/view'

export default {
  extends: viewExtend
}
</script>
