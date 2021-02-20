import { constant } from 'epage-core'

const { defaultSchema } = constant

export default {
  props: {
    schema: {
      type: Object,
      default: () => defaultSchema()
    }
  },
  computed: {
    store () {
      return this.$root.$options.extension.store
    },
    rootSchema: {
      get () {
        return this.store.getRootSchema()
      },
      set (rootSchema) {
        this.store.initRootSchema(rootSchema)
      }
    },
    mode () {
      return this.store.getState().mode
    },
    model: {
      get () {
        return this.store.getModel()
      },
      set (model) {
        this.store.setModel(model)
      }
    }
  },
  methods: {
    event (type, ...options) {
      this.$emit('on-event', this.schema.key, type, ...options)
    }
  }
}
