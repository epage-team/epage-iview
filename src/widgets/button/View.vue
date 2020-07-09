<template lang="pug">
.ep-widget(:data-epkey='schema.key')
  Button(
    v-if='schema.key'
    :icon='schema.option.icon'
    :type='getButtonType(schema)'
    :disabled='schema.disabled'
    :size='schema.size || rootSchema.size'
    :long='schema.option.long'
    :ghost='isGhost(schema)'
    :shape='schema.option.shape !== "circle" ? undefined : schema.option.shape'
    @click="event('on-click', ...arguments)"
  ) {{schema.option.text}}
</template>
<script>
import viewExtend from '../../extends/view'
import { version } from 'iview'

const IVIEW_V3 = 3
const mainVersion = parseInt(version || 2)

export default {
  extends: viewExtend,
  data () {
    return {
      mainVersion,
      IVIEW_V3
    }
  },
  methods: {
    // 兼容iview@3 按钮ghost类型
    getButtonType (schema) {
      const { type } = schema.option
      let result = type

      if (mainVersion >= IVIEW_V3) {
        if (type === 'ghost') {
          result = 'default'
        }
      }
      return result
    },
    // 兼容iview@3 按钮ghost类型
    isGhost (schema) {
      const { type, ghost } = schema.option

      return type === 'ghost' || Boolean(ghost)
    }
  }
}
</script>
