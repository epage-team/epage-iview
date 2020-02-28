import { Epage } from 'epage-iview'

export default class RichTextSchema extends Epage.Schema {
  constructor (props) {
    super()
    this.title = '富文本'
    this.placeholder = '请输入'
    this.$init(props)
  }
}

// 静态配置，同类widget公有
Object.assign(RichTextSchema, {
  title: '富文本',
  widget: 'richText',
  icon: 'compose',
  type: 'string',
  validators: [],
  logic: {
    value: ['=', '>', '<', '!='],
    // event: ['focus', 'blur', 'change']
    event: []
  }
})
