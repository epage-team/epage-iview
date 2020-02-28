<template lang="pug">
.ep-widget
  template(v-if='mode === "display"')
    span {{model[schema.key]}}

  template(v-else)
    i-switch(
      v-if='schema.key'
      :disabled='schema.disabled'
      :size='schema.size || rootSchema.size'
      v-model.trim='model[schema.key]'
      @on-change="event('on-change', ...arguments)"
    )
      span(v-if='schema.option.open' slot='open') {{schema.option.open}}
      span(v-if='schema.option.close' slot='close') {{schema.option.close}}
</template>
<script>
import viewExtend from '../../extends/view'

export default {
  extends: viewExtend
}
</script>
