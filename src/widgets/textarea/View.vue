<template lang="pug">
.ep-widget(:data-epkey='schema.key')
  template(v-if='mode === "display"')
    span {{model[schema.key]}}

  template(v-else)
    Input(
      v-if='schema.key'
      type='textarea'
      :rows='schema.option.rows'
      :placeholder='schema.placeholder'
      :disabled='schema.disabled'
      :size='schema.size || rootSchema.size'
      v-model.trim='model[schema.key]'
      @on-enter="event('on-enter', ...arguments)"
      @click.native="event('on-click', ...arguments)"
      @on-change="event('on-change', ...arguments)"
      @on-focus="event('on-focus', ...arguments)"
      @on-blur="event('on-blur', ...arguments)"
      @on-keyup="event('on-keyup', ...arguments)"
      @on-keydown="event('on-keydown', ...arguments)"
      @on-keypress="event('on-keypress', ...arguments)"
    )
</template>
<script>
import viewExtend from '../../extends/view'

export default {
  extends: viewExtend
}
</script>
