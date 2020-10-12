<template lang="pug">
.ep-widget-item(
  :class='cls'
  :style='getStyle()'
  @click='onOriginViewSelect($event, schema)'
)
  .ep-widget-item-name {{schema.name}}
  div(v-if='tab === "design"')
    Icon.ep-widget-btn.ep-widget-btn-delete(
      title='删除'
      :type='icons.remove'
      @click.native='onOriginViewDelete($event, schema)'
    )
    Icon.ep-widget-btn.ep-widget-btn-clone(
      title='复制'
      :type='icons.copy'
      @click.native='onOriginViewCopy($event, schema)'
    )

  template(v-if='schema.container')
    template(v-if='!schema.dynamic || tab === "design"')
      Row(
        v-if='schema.option'
        type='flex'
        :gutter='schema.option.gutter'
        :align='schema.option.align'
        :justify='schema.option.justify'
      )
        Col(
          v-for='(item, k) in schema.children'
          :key='k'
          :span='item.span'
          :offset='item.offset'
        )
          template(v-if='Array.isArray(item.list)')
            template(v-if='tab !== "design"')
              ep-widget-item(
                v-for='(child, j) in item.list'
                :key='child.key'
                :schema='child'
                :flat-widgets='flatWidgets'
                :flat-schemas='flatSchemas'
                :root-schema='rootSchema'
                v-show='!child.hidden'
                @on-add='onViewAdd'
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
              :list='item.list'
              :animation='200'
            )
              transition-group(mode='fade')
                .ep-widget-item(
                  v-if='item.list.length === 0'
                  key='placeholder'
                  :class='getPlaceholderCls()'
                )
                template(v-else)
                  ep-widget-item(
                    v-for='(child, j) in item.list'
                    :key='child.key'
                    :schema='child'
                    :flat-widgets='flatWidgets'
                    :flat-schemas='flatSchemas'
                    :selected-schema='selectedSchema'
                    :root-schema='rootSchema'
                    :class='{"ep-widget-selected": child.key === selectedSchema.key}'
                    @on-select='onViewSelect'
                    @on-delete='onViewDelete'
                    @on-copy='onViewCopy'
                    @on-add='onViewAdd'
                    @on-event='onEvent'
                  )
      .ep-widget-description(v-if='schema.description') {{schema.description}}
    template(v-else)
      div(v-for='(sub, s) in schema.list' style='position: relative;')
        Row(
          v-if='sub.option'
          type='flex'
          :gutter='sub.option.gutter'
          :align='sub.option.align'
          :justify='sub.option.justify'
          :class='tab !== "design" ? "ep-widget-dynamic-container" : ""'
        )
          Col(
            v-for='(item, k) in sub.children'
            :key='k'
            :span='item.span'
            :offset='item.offset'
          )
            template(v-if='Array.isArray(item.list) && tab !== "design"')
              ep-widget-item(
                v-for='(child, j) in item.list'
                :key='child.key'
                :schema='child'
                :flat-widgets='flatWidgets'
                :flat-schemas='flatSchemas'
                :root-schema='rootSchema'
                @on-add='onViewAdd'
                @on-event='onEvent'
                @on-dynamic-add='onDynamicAdd'
                @on-dynamic-remove='onDynamicRemove'
              )
        .ep-widget-description(v-if='sub.description') {{sub.description}}
        Icon.ep-widget-dynamic-remove(
          title='删除'
          :type='icons.remove'
          @click.native='onOriginDynamicRemove($event, schema, s)'
        )

    Button(
      v-show='schema.dynamic'
      type='dashed'
      style='margin-top: 5px;'
      :size='schema.size || rootSchema.size'
      @click='onOriginDynamicAdd($event, schema)'
    ) 添加

  //- not container
  template(v-else)
    //- not dynamic widget
    FormItem(
      v-if='!schema.dynamic || tab === "design"'
      :class='{"ep-widget-item-fullcol": !schema.label}'
      :label='schema.label'
      :prop='schema.key'
    )
      span(v-if='schema.help' slot='label') {{schema.label}}
        Tooltip(:content='schema.help' :transfer="true")
          Icon(type='ios-information-outline')
      component.ep-widget-control(
        :is='flatWidgets[schema.widget].View'
        :schema='schema'
        @on-event='onEvent'
      )
      .ep-widget-description(v-if='schema.description') {{schema.description}}
      Button(
        v-if='schema.dynamic'
        style='margin-top: 5px;'
        :size='schema.size || rootSchema.size'
        type='dashed'
      ) 添加
    //- dynamic widget
    template(v-else)
      FormItem(
        v-if='schema.list.length === 0'
        :class='{"ep-widget-item-fullcol": !schema.label}'
        :label='schema.label'
      )
        Button(
          style='margin-top: 5px;'
          :size='schema.size || rootSchema.size'
          type='dashed'
          @click='onOriginDynamicAdd($event, schema)'
        ) 添加
      FormItem(
        v-for='(sc, index) in schema.list'
        :key='sc.key'
        :class='{"ep-widget-item-fullcol": !sc.label}'
        :label='index === 0 ? schema.label : undefined'
        :prop='sc.key'
      )
        span(v-if='sc.help' slot='label') {{sc.label}}
          Tooltip(:content='sc.help' :transfer="true")
            Icon(type='ios-information-outline')
        component.ep-widget-control(
          :is='flatWidgets[sc.widget].View'
          :schema='schema.list[index]'
          @on-event='onEvent'
        )
        .ep-widget-description(v-if='sc.description') {{sc.description}}
        Icon.ep-widget-dynamic-remove(
          title='删除'
          :type='icons.remove'
          @click.native='onOriginDynamicRemove($event, schema, index)'
        )
      FormItem(
        v-if='schema.list.length!==0'
        :class='{"ep-widget-item-fullcol": !schema.label}'
        label=' '
      )
        Button(
          type='dashed'
          style='margin-top: 5px;'
          :size='schema.size || rootSchema.size'
          @click='onOriginDynamicAdd($event, schema)'
        ) 添加

</template>
<script>
import { Context, Script } from 'epage-core'
import Draggable from 'vuedraggable'
import { version } from 'iview'

// 兼容iview@2及iview@3图标不一致问题
const MAIN_VERSION = parseInt(version || 2)
const IVIEW_V3 = 3
const mapIcon2To3 = {
  'arrow-move': 'md-move',
  'trash-a': 'ios-trash',
  'ios-copy-outline': 'md-copy'
}

export default {
  name: 'EpWidgetItem',
  components: {
    Draggable
  },
  props: {
    schema: {
      type: Object,
      default: () => ({})
    },
    flatWidgets: {
      type: Object,
      default: () => ({})
    },
    flatSchemas: {
      type: Object,
      default: () => ({})
    },
    selectedSchema: {
      type: Object,
      default: () => ({
        key: '',
        schema: {}
      })
    },
    rootSchema: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      icons: {
        move: 'arrow-move',
        remove: 'trash-a',
        copy: 'ios-copy-outline'
      }
    }
  },
  computed: {
    store () {
      return this.$root.$options.extension.store
    },
    widgetType () {
      return this.schema.widget
    },
    cls () {
      return {
        'ep-widget-selected': this.schema.key === this.selectedSchema.key,
        'ep-widget-container': this.schema.container,
        'ep-widget-item-handle': this.tab === 'design'
      }
    },
    logics () {
      return this.rootSchema.logics
    },
    tab () {
      return this.store.getTab()
    }
  },
  beforeMount () {
    this.setIcons()
  },
  methods: {
    getPlaceholderCls () {
      const placeholder = !Object.keys(this.$slots).length && this.tab === 'design'
      return placeholder ? 'ep-widget-grid-placeholder' : ''
    },
    onOriginDynamicAdd (e, schema) {
      if (this.tab === 'design') return
      e.stopPropagation()
      this.$emit('on-dynamic-add', schema)
    },
    onDynamicAdd (schema) {
      this.$emit('on-dynamic-add', schema)
    },
    onOriginDynamicRemove (e, schema, index) {
      e.stopPropagation()
      this.$emit('on-dynamic-remove', schema, index)
    },
    onDynamicRemove (schema, index) {
      this.$emit('on-dynamic-remove', schema, index)
    },
    onViewAdd (schema) {
      console.log(schema, 9)
      this.$emit('on-add', schema)
    },
    getStyle () {
      const { style, hidden } = this.schema
      let result = ''
      if (style) result = Object.keys(style).filter(_ => style[_]).map(attr => `${attr}: ${style[attr]};`).join('')
      if (this.store.getTab() === 'design' && hidden) result += 'opacity: 0.7;'
      return result
    },
    setIcons () {
      const icons = {}
      if (MAIN_VERSION < IVIEW_V3) return
      if (this.icons.move in mapIcon2To3) icons.move = mapIcon2To3[this.icons.move]
      if (this.icons.copy in mapIcon2To3) icons.copy = mapIcon2To3[this.icons.copy]
      if (this.icons.remove in mapIcon2To3) icons.remove = mapIcon2To3[this.icons.remove]
      Object.assign(this.icons, icons)
    },
    onOriginViewSelect (e, schema) {
      // 预览模式下，为了级联、下拉框菜单点击空白处收起，需要事件冒泡到document
      this.store.getTab() === 'design' && e.stopPropagation()
      this.$emit('on-select', schema)
    },
    onViewSelect (schema) {
      this.$emit('on-select', schema)
    },
    onOriginViewDelete (e, schema) {
      e.stopPropagation()
      this.$emit('on-delete', schema)
    },
    onOriginViewCopy (e, schema) {
      e.stopPropagation()
      this.$emit('on-copy', schema)
    },
    onViewDelete (schema) {
      this.$emit('on-delete', schema)
    },
    onViewCopy (schema) {
      this.$emit('on-copy', schema)
    },
    onEvent (key, eventType, ...args) {
      this.dispatchEvent(key, eventType)
      this.$emit('on-event', ...arguments)
    },
    dispatchEvent (key, eventType) {
      const valueLogics = this.rootSchema.logics.filter(
        logic => (logic.key &&
        logic.key === this.schema.key &&
        logic.type === 'event'))
      const { store, $el } = this
      const ctx = new Context({
        $el,
        $render: this.$root.$options.extension.$render,
        store,
        instance: this,
        state: {}
      })
      function callback (scripts) {
        scripts.forEach(script => {
          const sc = new Script(ctx)
          sc.exec(script)
        })
      }
      if (valueLogics.length) {
        this.store.updateWidgetByEvent(this.schema.key, eventType, callback)
      }
    }
  }
}
</script>
