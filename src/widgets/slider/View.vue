<template lang="pug">
.ep-widget
  template(v-if='mode === "display"')
    Slider(
      v-if='schema.key'
      :min='schema.option.min'
      :max='schema.option.max'
      :step='schema.option.step'
      :disabled='true'
      :multiple='schema.option.multiple'
      v-model.trim='model[schema.key]'
      @on-change="event('on-change', ...arguments)"
    )

  template(v-else)
    Slider(
      v-if='schema.key'
      :min='schema.option.min'
      :max='schema.option.max'
      :step='schema.option.step'
      :disabled='schema.disabled'
      :multiple='schema.option.multiple'
      v-model.trim='model[schema.key]'
      @on-change="event('on-change', ...arguments)"
    )
</template>
<script>
import viewExtend from '../../extends/view'

export default {
  extends: viewExtend
}
</script>
