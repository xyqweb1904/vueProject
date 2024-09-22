<template>
    <div class="pages_div">
      <div class="content_div">
        <div class="catalog">
            <Menu :MenuData="MenuData"/>
        </div>
        <div class="content test">
          <!-- 路由出口 -->
          <router-view/>
        </div>
      </div>
    </div>
</template>
<script>
import Menu from './navMenu/menu_index'
export default {
  data() {
    return {
      MenuData: [
        {
          navId: '1', // 遍历
          navName: '零星dome', // 菜单名称
          navRouter: '/1', // 菜单路由
          icon: 'el-icon-coin',
          children: [
            {
              navId: '1-2',
              navName: '知识点',
              navRouter: '/ADD',
              icon: 'el-icon-reading',
              children: [
                {
                  navId: '1-2-1',
                  navName: 'JS',
                  navRouter: '/JS',
                  icon: 'el-icon-document'
                },
                {
                  navId: '1-2-2',
                  navName: 'canvas',
                  icon: 'el-icon-canvas',
                  navRouter: '/Canvas',
                  children: [
                    {
                      navId: '1-2-2-1',
                      navName: 'canvas概念',
                      navRouter: '/Canvas',
                      icon: 'el-icon-canvas'
                    },
                    {
                      navId: '1-2-2-2',
                      navName: 'basics',
                      navRouter: '/basics',
                      icon: 'el-icon-canvas'
                    },
                    {
                      navId: '1-2-2-3',
                      navName: 'trend',
                      navRouter: '/trend',
                      icon: 'el-icon-canvas'
                    }
                  ]
                },
                {
                  navId: '1-2-3',
                  navName: 'vueRouter',
                  navRouter: '/vueRouter',
                  icon: 'el-icon-router',
                  children: [
                    {
                      navId: '1-2-3-1',
                      navName: 'vueRouter',
                      navRouter: '/vueRouter',
                      icon: 'el-icon-router'
                    },
                    {
                      navId: '1-2-3-2',
                      navName: 'vueRouter-grandpa',
                      navRouter: '/grandpa',
                      icon: 'el-icon-router'
                    },
                    {
                      navId: '1-2-3-3',
                      navName: 'vueRouter详解',
                      navRouter: '/vueRouterInfo',
                      icon: 'el-icon-router'
                    },
                    {
                      navId: '1-2-3-4',
                      navName: '钩子函数详解',
                      navRouter: '/routerhook',
                      icon: 'el-icon-router'
                    }
                  ]
                },
                {
                  navId: '1-2-4',
                  navName: 'Hash/History',
                  navRouter: '/father',
                  icon: 'el-icon-history',
                  children: [
                    {
                      navId: '1-2-4-1',
                      navName: 'hash',
                      navRouter: '/hash',
                      icon: 'el-icon-history'
                    },
                    {
                      navId: '1-2-4-2',
                      navName: 'History',
                      navRouter: '/History',
                      icon: 'el-icon-history'
                    }
                  ]
                },
                {
                  navId: '1-2-5',
                  navName: '富文本',
                  icon: 'el-icon-text',
                  navRouter: '/plugInField',
                  children: [
                    {
                      navId: '1-2-5-1',
                      navName: '富文本/插件',
                      icon: 'el-icon-text',
                      navRouter: '/plugInField'
                    },
                    {
                      navId: '1-2-5-2',
                      navName: '自定义富文本',
                      icon: 'el-icon-text',
                      navRouter: '/userDefinedField'
                    }
                  ]
                },
                {
                  navId: '1-2-6',
                  navName: '电子签名',
                  icon: 'el-icon-esignature',
                  navRouter: '/Esignature'
                },
                {
                  navId: '1-2-7',
                  navName: '截图软件',
                  icon: 'el-icon-screenshot',
                  navRouter: '/canvasType',
                  children: [
                    {
                      navId: '1-2-7-1',
                      navName: '截图软件【canvas】',
                      icon: 'el-icon-screenshot',
                      navRouter: '/canvasType'
                    }
                  ]
                },
                {
                  navId: '1-2-8',
                  navName: 'await_setTimeout_promise执行顺序',
                  icon: 'el-icon-esignature',
                  navRouter: '/Await_setTimeout_promise'
                },
                {
                  navId: '1-2-9',
                  navName: '登录/注册',
                  icon: 'el-icon-esignature',
                  navRouter: '/login'
                },
                {
                  navId: '1-2-10',
                  navName: 'WebSocket',
                  icon: 'el-icon-websocket',
                  navRouter: '/WebSocket'
                },
                {
                  navId: '1-2-11',
                  navName: '面试',
                  icon: 'el-icon-websocket',
                  navRouter: '/interview'
                },
                {
                  navId: '1-2-12',
                  navName: '加密',
                  icon: 'el-icon-encryption',
                  navRouter: '/encryption',
                  children: [
                    {
                      navId: '1-2-12-1',
                      navName: 'base64',
                      navRouter: '/base64',
                      icon: 'el-icon-encryption'
                    }
                  ]
                },
                {
                  navId: '1-2-13',
                  navName: 'Vuex',
                  icon: 'el-icon-websocket',
                  navRouter: '/VuexPages'
                },
                {
                  navId: '1-2-14',
                  navName: 'TS',
                  icon: 'el-icon-websocket',
                  navRouter: '/TS'
                },
                {
                  navId: '1-2-15',
                  navName: 'keepAlivePage/缓存组件',
                  icon: 'el-icon-websocket',
                  navRouter: '/keepAlivePage'
                },
                {
                  navId: '1-2-16',
                  navName: 'element组件',
                  icon: 'el-icon-websocket',
                  navRouter: '/elementDome'
                },
                {
                  navId: '1-2-17',
                  navName: 'IFramdom',
                  icon: 'el-icon-websocket',
                  navRouter: '/IFramdom'
                },
                {
                  navId: '1-2-18',
                  navName: 'vueApiAll',
                  icon: 'el-icon-websocket',
                  navRouter: '/vueApiAll'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  components: {
    Menu
  }
}
</script>
<style lang="less" scoped>
@import url('./css/home.less');
</style>

