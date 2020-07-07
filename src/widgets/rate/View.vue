<template lang="pug">
.ep-widget(:data-epkey='schema.key')
  template(v-if='mode === "display"')
     Rate(
      v-if='schema.key'
      :count='schema.option.count'
      :allow-half='schema.option.allowHalf'
      :show-text='schema.option.showText'
      :disabled='true'
      :size='schema.size || rootSchema.size'
      v-model='model[schema.key]'
    )

  template(v-else)
    Rate(
      v-if='schema.key'
      :count='schema.option.count'
      :allow-half='schema.option.allowHalf'
      :show-text='schema.option.showText'
      :disabled='schema.disabled'
      :size='schema.size || rootSchema.size'
      v-model='model[schema.key]'
      @on-change="event('on-change', ...arguments)"
    )
</template>
<script>
import viewExtend from '../../extends/view'

export default {
  extends: viewExtend
}
</script>
