<template lang="pug">
.ep-widget(:data-epkey='schema.key')
  Button(
    v-if='schema.key'
    :loading='loading'
    :icon='schema.option.icon'
    :type='getButtonType(schema)'
    :disabled='schema.disabled'
    :size='schema.size || rootSchema.size'
    :long='schema.option.long'
    :ghost='isGhost(schema)'
    :shape='schema.option.shape !== "circle" ? undefined : schema.option.shape'
    @click="onClick"
  ) {{schema.option.text}}
</template>
<script>
import viewExtend from '../../extends/view'
import { version } from 'iview'
import Context from '../../util/Context'

const IVIEW_V3 = 3
const mainVersion = parseInt(version || 2)

export default {
  extends: viewExtend,
  data () {
    return {
      loading: false,
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
    },
    onClick () {
      const { script } = this.schema.option
      const { store, $el } = this
      const ctx = new Context({
        $el,
        $render: this.$root.$options.extension.$render,
        store,
        instance: this,
        state: {
          loading: this.loading
        }
      })

      try {
        /* eslint-disable no-new-func */
        const fun = new Function('ctx', script)
        fun(ctx)
      } catch (e) {
        console.log(e)
      }
      this.event('on-click', ...arguments)
    }
  }
}
</script>
