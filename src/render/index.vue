<template lang="pug">
Form.ep-widget-form(
  ref='epForm'
  :rules='rules'
  :model='model'
  :label-width='rootSchema.label.width'
  :label-position='rootSchema.label.position'
  :class='`ep-mode-${mode}`'
)
  template(v-if='state.tab !== "design"')
    ep-widget-item(
      v-for='(item, k) in childrenSchema'
      v-show='!item.hidden'
      :key='item.key'
      :schema='item'
      :flat-widgets='flatWidgets'
      :flat-schemas='flatSchemas'
      :root-schema='rootSchema'
      @on-add='onWidgetAdd'
      @on-event='onEvent'
      @on-dynamic-add='onDynamicAdd'
      @on-dynamic-remove='onDynamicRemove'
    )
  draggable(
    v-else
    handle='.ep-widget-item-handle'
    draggable='.ep-widget-item'
    ghost-class='ep-widget-ghost'
    v-bind='{ group: { name: "g1"}}'
    :list='childrenSchema'
    :disabled='state.tab !== "design"'
    :animation='200'
  )
    transition-group
      ep-widget-item(
        v-for='(item, k) in childrenSchema'
        v-show='!item.hidden'
        :key='item.key'
        :schema='item'
        :flat-widgets='flatWidgets'
        :flat-schemas='flatSchemas'
        :selected-schema='selectedSchema'
        :root-schema='rootSchema'
        @on-select='onWidgetSelect'
        @on-delete='onWidgetDelete'
        @on-copy='onWidgetCopy'
        @on-add='onWidgetAdd'
        @on-event='onEvent'
      )
</template>
<script>
import EpWidgetItem from './item'
import Epage from 'epage'
import Draggable from 'vuedraggable'

const { helper } = Epage
const evt = new Epage.Event()
export default {
  on: evt.on.bind(evt),
  off: evt.off.bind(evt),
  components: {
    EpWidgetItem,
    Draggable
  },
  data () {
    return {
      oldModel: {},
      oldDiffs: {},
      // 当前渲染状态
      mode: 'edit'
    }
  },
  computed: {
    childrenSchema () {
      const { store } = this.$root.$options.extension
      return helper.getRootSchemaChildren(store.getRootSchema()) || []
    },
    store () {
      return this.$root.$options.extension.store
    },
    $$store () {
      return this.$root.$options.extension.store.$$store
    },
    state () {
      return this.$$store.state
    },
    flatWidgets () {
      return this.store.getFlatWidgets()
    },
    flatSchemas () {
      return this.store.getFlatSchemas()
    },
    rootSchema () {
      return this.store.getRootSchema()
    },
    selectedSchema () {
      return this.store.getSelectedSchema()
    },
    rules () {
      return this.store.getFlatRules()
    },
    model () {
      return this.store.getModel()
    }
  },
  watch: {
    model: {
      handler: function (newModel, oldModel) {
        // 需要先设置schema，然后设置model，否则设置的model可能不生效
        const diffs = this.diffModel(newModel, this.oldModel)
        if (this.shouldChangeModel(diffs, this.oldDiffs)) {
          this.oldDiffs = Object.assign({}, diffs)
          this.oldModel = Object.assign({}, newModel)
          this.changeWithModel(diffs)
        }
      },
      deep: true
    }
  },
  created () {
    const { mode } = this.$root.$options.extension
    if (mode) {
      this.mode = mode
      this.changeMode(mode)
    }
  },
  methods: {
    validateFields () {
      return new Promise((resolve, reject) => {
        this.$refs.epForm.validate(valid => {
          if (valid) {
            resolve(valid)
          } else {
            reject(new Error('check error'))
          }
        })
      })
    },
    resetFields () {
      this.$refs.epForm.resetFields()
      this.store.resetModel()
    },
    shouldChangeModel (newDiffs, oldDiffs) {
      let result = false
      if (Object.keys(newDiffs).length) {
        for (const i in newDiffs) {
          if (!(i in oldDiffs) || newDiffs[i] !== oldDiffs[i]) {
            result = true
          }
        }
      }
      return result
    },

    diffModel (newModel, oldModel) {
      const diffs = {}
      for (const k in newModel) {
        if (k in this.flatSchemas && newModel[k] !== oldModel[k]) {
          diffs[k] = newModel[k]
        }
      }
      return diffs
    },

    changeWithModel (modelDiffs) {
      const valueLogics = this.rootSchema.logics.filter(logic => logic.key && logic.type === 'value')
      if (valueLogics.length) {
        this.store.updateWidgetByModel(modelDiffs)
      }
    },

    checkEffect (effect, key) {
      return effect.key && key !== effect.key && Array.isArray(effect.properties)
    },

    onEvent (key, onType, ...args) {
      this.$emit('on-event', ...arguments)
      const type = onType.indexOf('on-') === 0 ? onType.split('on-')[1] : onType
      if (key in evt.$events && type in evt.$events[key]) {
        const callbacks = evt.$events[key][type] || []
        callbacks.forEach(callback => {
          /* eslint standard/no-callback-literal: 0 */
          callback(...args)
        })
      }
    },

    onDynamicAdd (schema) {
      this.store.dynamicAddWidget(schema.key)
    },

    onDynamicRemove (schema, index) {
      this.store.dynamicRemoveWidget(schema.key, index)
    },
    changeMode (mode) {
      this.store.updateMode(mode)
    },

    onWidgetSelect (currentSchema) {
      const { tab, selectedSchema } = this.store.getState()
      if (tab === 'design' && selectedSchema && selectedSchema.key !== currentSchema.key) {
        this.store.selectWidget(currentSchema.key)
        this.$emit('on-select', currentSchema)
      }
    },

    onWidgetDelete (selectedSchema) {
      this.store.removeWidget(selectedSchema.key)
      this.$emit('on-delete', selectedSchema)
    },

    onWidgetCopy (selectedSchema) {
      this.store.copyWidget(selectedSchema.key)
      this.$emit('on-copy', selectedSchema)
    },

    onWidgetAdd (schema) {
      // console.log(323, schema)
      // this.store.addWidgetChild(schema.key, 0, schema)
      this.store.addWidgetChild(schema.key, schema.children.length, schema.children[0])
      this.$emit('on-add', schema)
    }
  }
}
</script>
