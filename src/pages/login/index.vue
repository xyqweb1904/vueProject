<template>
    <div class="pages-div">
        <div class="login-flex">
            <div class="login-div" v-if="!loginState">
                <div class="login-title">登录</div>
                <div class="login-name">
                    <label>账号：<input v-model="userName"/></label>
                </div>
                <div class="login-password">
                    <label>密码：<input type="password" v-model="userPass" @keyup.enter="login"/></label>
                </div>
                <div class="login-submit">
                    <div class="submit-button" @click="login">登录</div>
                </div>
            </div>
            <div v-else class="login-div">
                <div class="login-type">
                    <div>
                        <span>登录成功</span><br/>
                        <span>{{goTime}}秒后跳转 <label class="a_style" @click="nextPages">跳转</label></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Router from 'vue-router'
export default {
  data() {
    return {
      userName: '',
      userPass: '',
      loginState: false,
      goTime: 10,
      time: ''
    }
  },
  created() {
  },
  methods: {
    login() {
      console.log('点击登录')
      let params = {
        url: this.$API.LOGIN,
        data: {
          userName: this.userName,
          userPass: this.userPass
        }
      }
      this.$fetch(params).then(res => {
        let data = res.data || {}
        let userList = data.userList || []
        this.loginState = userList.some(item => {
          return (
            item.userName == this.userName && item.passWord == this.userPass
          )
        })
        console.log('this.loginState:', this.loginState)
        window.sessionStorage.setItem('token', data.token)
        // 登录失败出弹窗
        this.loginState ? this.computeTime() : this.showUI()
      })
    },
    showUI() {
      this.$UI.dialog({
        content: '账号/密码错误',
        rightBtn: '确定',
        leftBtnShow: false
      })
    },
    computeTime() {
      this.time = setInterval(() => {
        this.goTime = this.goTime - 1
        console.log('this.goTime:', this.goTime)
        if (this.goTime <= 0) {
          clearInterval(this.time)
          this.nextPages()
        }
      }, 1000)
    },
    // 跳转页面
    nextPages() {
      this.time ? clearInterval(this.time) : ''
      this.$router.push({
        path: 'JS'
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import url('./css/index.less');
</style>

