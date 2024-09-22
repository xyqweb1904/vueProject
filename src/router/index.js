import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import obj from './path.js'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: obj.home,
      children: [
        {
          path: '/JS',
          name: 'JS',
          component: obj.JS
        }, {
          path: '/Canvas',
          name: 'Canvas',
          component: obj.Canvas
        }, {
          path: '/basics',
          name: 'basics',
          component: obj.basics
        }, {
          path: '/vueRouter',
          name: 'vueRouter',
          component: obj.vueRouter
        }, {
          path: '/grandpa',
          name: 'grandpa',
          component: obj.grandpa
        }, {
          path: '/vueRouterInfo',
          name: 'vueRouterInfo',
          component: obj.vueRouterInfo
        }, {
          path: '/hash',
          name: 'hash',
          component: obj.hash
        }, {
          path: '/History',
          name: 'History',
          component: obj.History
        }, {
          path: '/plugInField',
          name: 'plugInField',
          component: obj.plugInField
        }, {
          path: '/userDefinedField',
          name: 'userDefinedField',
          component: obj.userDefinedField
        }, {
          path: '/Esignature',
          name: 'Esignature',
          component: obj.Esignature
        }, {
          path: '/canvasType',
          name: 'canvasType',
          component: obj.canvasType
        }, {
          path: '/Await_setTimeout_promise',
          name: 'Await_setTimeout_promise',
          component: obj.Await_setTimeout_promise
        }, {
          path: '/rountLink',
          name: 'rountLink',
          component: obj.rountLink
        }, {
          path: '/routerPush',
          name: 'routerPush',
          component: obj.routerPush
        },
        {
          path: '/login',
          name: 'login',
          component: obj.login
        },
        {
          path: '/routerhook',
          name: 'routerhook',
          component: obj.routerhook
        }, {
          path: '/trend',
          name: 'trend',
          component: obj.trend
        }, {
          path: '/WebSocket',
          name: 'WebSocket',
          component: obj.WebSocket
        }, {
          path: '/interView',
          name: 'interView',
          component: obj.interView
        }, {
          path: '/base64',
          name: 'base64',
          component: obj.base64
        }, {
          path: '/VuexPages',
          name: 'VuexPages',
          component: obj.VuexPages
        },
        {
          path: '/TS',
          name: 'TS',
          component: obj.TS
        },
        {
          path: '/keepAlivePage',
          name: 'keepAlivePage',
          component: obj.keepAlivePage,
          children: [
            {
              path: '/pages1',
              name: 'pages1',
              component: obj.pages1
            },
            {
              path: '/pages2',
              name: 'pages2',
              component: obj.pages2
            }
          ]
        },
        {
          path: '/elementDome',
          name: 'elementDome',
          component: obj.elementDome
        },
        {
          path: '/IFramdom',
          name: 'IFramdom',
          component: obj.iFramdom
        },
        {
          path: '/vueApiAll',
          name: 'vueApiAll',
          component: obj.vueApiAll
        },
      ]
    }
  ]
})
