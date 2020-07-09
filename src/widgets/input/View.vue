<template lang="pug">
.ep-widget.epiv-input(:data-epkey='schema.key')
  template(v-if='mode === "display"')
    span(v-if='schema.option.prefix') {{schema.option.prefix}}
    span {{model[schema.key]}}
    span(v-if='schema.option.suffix') {{schema.option.suffix}}

  template(v-else)
    Input(
      v-if='schema.key'
      v-model.trim='model[schema.key]'
      :type='schema.option.password ? "password" : "text"'
      :placeholder='schema.placeholder'
      :disabled='schema.disabled'
      :size='schema.size || rootSchema.size'
      :class='{"epiv-input-prefix": schema.option.prefix, "epiv-input-suffix": schema.option.suffix}'
      @on-enter="event('on-enter', ...arguments)"
      @click.native="event('on-click', ...arguments)"
      @on-change="event('on-change', ...arguments)"
      @on-focus="event('on-focus', ...arguments)"
      @on-blur="event('on-blur', ...arguments)"
      @on-keyup="event('on-keyup', ...arguments)"
      @on-keydown="event('on-keydown', ...arguments)"
      @on-keypress="event('on-keypress', ...arguments)"
    )
      span(v-show='schema.option.prefix' slot='prepend') {{schema.option.prefix}}
      span(v-show='schema.option.suffix' slot='append') {{schema.option.suffix}}

</template>
<script>
import viewExtend from '../../extends/view'

export default {
  extends: viewExtend
}
</script>
