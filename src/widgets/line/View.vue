<template lang="pug">
.ep-widget(style='position: relative;height: 100%;min-height: 16px;')
  .ep-widget-line(v-if='schema.key' :style='style')

</template>
<script>
import viewExtend from '../../extends/view'

export default {
  extends: viewExtend,
  computed: {
    style () {
      const { direction, hposition, vposition, length, thickness, type, color } = this.schema.option
      const style = 'position: absolute;'
      const borderValue = `${thickness}px ${type} ${color};`
      let borderSide = ''
      let len = ''

      if (direction === 'horizontal') {
        borderSide = 'border-top'
        len = `width: ${length}%;`
      } else {
        borderSide = 'border-left'
        len = `height: ${length}%;`
      }
      const positionMap = {
        top: 'top: 0;',
        middle: `top: 50%;transform: translate${vposition === 'center' ? '' : 'Y'}(-50%);`,
        bottom: 'bottom: 0;',
        left: 'left: 1px;',
        center: `left: 50%;transform: translate${hposition === 'middle' ? '' : 'X'}(-50%);`,
        right: 'right: 1px;'
      }
      const border = borderSide + ':' + borderValue

      return style + positionMap[hposition] + positionMap[vposition] + len + border
    }
  }
}
</script>
