<template>
    <div class="pages_padding_12">
        <h2>钩子函数详解</h2>
        <ul>
          <li>
            <h3>beforeRouteEnter:</h3>
            1.beforeRouteEnter 函数内部 this 是undefined.这是因为在执行路由钩子函数beforRouteEnter时候，组件还没有被创建出来<br/>
            2.先执行beforRouteEnter，再执行组件周期钩子函数beforeCreate。我们可以通过 next 获取组件的实例对象，如：next( (vm)=>{} )，参数vm就是组件的实例化对象。<br/>
            3.路由进入组件之前调用，该钩子在全局守卫 beforeEach 和路由守卫 beforeEnter 之后，全局 beforeResolve 和全局 afterEach 之前调用
          </li>
          <li>
            <h3>beforeRouteUpdate</h3>
            对于 beforeRouteUpdate 来说，this 已经可用了，所以给 next 传递回调就没有必要了
          </li>
          <li>
            <h3>beforeRouteLeave</h3>
            对于 beforeRouteLeave 来说，this 已经可用了，所以给 next 传递回调就没有必要了
          </li>
          <li>
            <h3>总结：</h3>
            导航被触发。<br/>
            在失活的组件里调用 beforeRouteLeave 守卫。<br/>
            调用全局的 beforeEach 守卫。<br/>
            在重用的组件里调用 beforeRouteUpdate 守卫。<br/>
            在路由配置里调用 beforeEnter。<br/>
            解析异步路由组件。<br/>
            在被激活的组件里调用 beforeRouteEnter。<br/>
            调用全局的 beforeResolve 守卫。<br/>
            导航被确认。<br/>
            调用全局的 afterEach 钩子。<br/>
            触发 DOM 更新。<br/>
            调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。
          </li>
        </ul>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },

  beforeRouteEnter(to, from, next) {
    console.log("============= beforeRouteEnter =============");
    /*
      1.页面还未被创建，所有不能用this
      2.支持回调函数
    */
    next(vm => {
      console.log("vm:", vm); // 实例
      vm.text = "回调函数";
    });
  },
  created() {
    console.log("============= created =============");
    console.log("text:", this);
    this.$nextTick(() => {
      console.log(this.text);
    });
    this.getText();
  },
  beforeRouteUpdate(to, from, next) {
    console.log("============= beforeRouteUpdate =============");
    //在当前路由改变，但是该组件本地被复用是调用
    //举例来说，对于一个带有动态参数的路径/foo/:id,在/foo1和foo2之间跳转的时候
    //由于会渲染同样的Foo组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    //可以访问组件实例的`this`
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log("============= beforeRouteLeave =============");
    //导航离开该组件的对应路由时调用
    //可以访问组件实例的`this`
    next();
  },

  methods: {
    getText() {
      setTimeout(() => {
        console.log("text2:", this.text);
      }, 200);
    }
  }
};
</script>