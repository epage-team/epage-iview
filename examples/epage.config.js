import StyleSetting from './settings/style-etting.vue'

export default {
  // panels: {
  //   // design: {
  //   //   title: '设计',
  //   //   key: 'design',
  //   //   index: 0,
  //   //   component: StyleSetting
  //   // },
  //   // preview: {
  //   //   title: '预览',
  //   //   key: 'preview',
  //   //   index: 1,
  //   //   component: StyleSetting
  //   // },
  //   logic: {
  //     title: '逻辑',
  //     key: 'logic',
  //     index: 2,
  //     component: StyleSetting
  //   },
  //   schema: {
  //     title: 'Schema',
  //     key: 'schema',
  //     index: 3,
  //     component: StyleSetting
  //   },
  // },
  settings: [
    {
    //   title: '页面属性',
    //   key: 'global',
    //   component: null
    // }, {
      title: '扩展配置',
      key: 'ext',
      component: StyleSetting
    }
  ]
}
