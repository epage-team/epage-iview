import Vue from 'vue'
import iView from 'iview'
import Demo from './demo'
import DemoRender from './demo-render'
import './style.less'

Vue.use(iView)
const el = document.getElementById('epage')

/* eslint-disable no-new */
new Vue({
  el,
  render: h => h(Demo)
})
