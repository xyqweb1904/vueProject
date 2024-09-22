import Vue from 'vue'
import App from './App'
import router from './router'
import './public/style_css/pages_default_style.css'
import UI from './common/ui'
import Dialog from './components/Dialog'
import ElementUI from '../node_modules/element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import Fetch from './common/fetch.js'
import API from './common/api'
import Echarts from 'echarts'
import utils from './common/utils'
import PagesTitle from './components/pagesTitle'
// import store from './store/vuex'
import store from './pages/vuexPages/store'
import ajax from "./common/ajax"
// 导入ant-design-vue组件
// import Antd from '../node_modules/ant-design-vue'
// 导入组件的样式表
// import "ant-design-vue/dist/antd.css"

import './permssion'

// import locale from '../node_modules/element-ui/lib/locale/ lang/en'

// 全局引用
Vue.use(ElementUI)
Vue.use(Dialog)
// Vue.use(Antd)

// 注册全局组件
Vue.component('PagesTitle', PagesTitle)

// 挂载Vue原型对象上
Vue.prototype.$UI = UI;
Vue.prototype.$fetch = Fetch
Vue.prototype.$API = API
Vue.prototype.$Utils = utils

// Vue.prototype.$routes = router.routes
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router, // 注册路由器
  components: { App }, // 映射组件标签
  template: '<App/>', // 指定需要渲染到页面的模板
  render: h => h(App)
})
