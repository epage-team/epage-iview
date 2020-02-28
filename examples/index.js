import Vue from 'vue'
import Vuex from 'vuex'
import iView from 'iview'
import Demo from './demo'
import './style.less'

Vue.use(Vuex)
Vue.use(iView)
const el = document.getElementById('epage')

/* eslint-disable no-new */
new Vue({
  el,
  render: h => h(Demo)
})
