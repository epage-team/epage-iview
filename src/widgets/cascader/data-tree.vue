<template lang='pug'>
Tree.epiv-cascader-datatree(:data="rootList", :render="renderContent")
</template>
<script>
import { helper } from 'epage-core'
import { Tooltip } from 'iview'
const { randomStr, isNumberString, include } = helper

export default {
  props: {
    rawData: {
      type: Array,
      required: true
    },
    schemaType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      rootList: [{
        value: 'Root',
        expand: true,
        render: (h, { root, node, data }) => {
          return <div class="epiv-cascader-datatree-root">
            <span>{data.value}</span>
            <i-button
              type="primary"
              size="small"
              title='添加子节点'
              onClick={_ => this.append(data)}>
              <i class='ep-icon ep-icon-plus'></i>
            </i-button>
          </div>
        },
        children: []
      }],
      buttonProps: {
        type: 'ghost',
        size: 'small'
      }
    }
  },
  mounted () {
    // const arrow = document.querySelectorAll('.tree-wrapper .ivu-tree-children .ivu-tree-arrow')
    // if (arrow && arrow[0]) {
    //   arrow[0].style.display = 'none'
    // }
    this.rootList[0].children = this.rawData
  },
  methods: {
    renderContent (h, { root, node, data }) {
      const list = [
        {
          key: 'key',
          placeholder: '请输入key',
          tips: '提交字段'
        }, {
          key: 'value',
          placeholder: '请输入value',
          tips: '显示字段'
        }
      ]
      return (
        <div class="epiv-cascader-datatree-item">
          <div class="epiv-cascader-datatree-content">
            {list.map(item => {
              return (
                <div>
                  <span class="mr5">
                    {item.key}
                    <Tooltip
                      content={item.tips}
                      placement='top'
                      transfer={true}>
                      <i class='ep-icon ep-icon-info-o'></i>
                    </Tooltip>
                  </span>
                  {/* elsint-disable-next-line */}
                  <i-input
                    value={data[item.key]}
                    size="small"
                    onInput={value => { data[item.key] = value.trim() }}
                    placeholder={item.placeholder}
                    class={{
                      'epiv-cascader-datatree-content-input': true,
                      'ivu-form-item-error': item.key === 'key' && this.checkKeyType(data[item.key])
                    }}
                  />
                </div>
              )
            })}
          </div>
          <div class="epiv-cascader-datatree-operat">
            <i-button
              class="mr5"
              type="ghost"
              size="small"
              title='添加子节点'
              onClick={_ => this.append(data)}>
              <i class='ep-icon ep-icon-plus'></i>
            </i-button>
            <i-button
              type="ghost"
              size="small"
              title='删除当前节点'
              onClick={_ => this.remove(root, node, data)}>
              <i class='ep-icon ep-icon-minus'></i>
            </i-button>
          </div>
        </div>
      )
    },

    append (data) {
      const children = data.children || []
      const randomValue = randomStr(7)
      const defaultValue = {
        value: randomValue,
        key: randomValue,
        expand: true
      }
      children.push(defaultValue)
      !data.children && this.$set(data, 'children', children)
    },

    remove (root, node, data) {
      const parentKey = root.find(el => el === node).parent
      const parent = root.find(el => el.nodeKey === parentKey).node
      const index = parent.children.indexOf(data)
      parent.children.splice(index, 1)
      this.$emit('on-remove-child')
    },

    // 校验其他类型是否能成功转 number 类型
    checkKeyType (key) {
      const schemaType = this.schemaType
      // schema.type 中可选的 number 类型
      const numberTypes = ['number', 'array<number>']

      return include(numberTypes, schemaType) && !isNumberString(key)
    }
  }
}
</script>
