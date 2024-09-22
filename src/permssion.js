import router from './router'
import UI from './common/ui'

// 全局前置守卫 ，在路由跳转前触发，它在 每次导航 时都会触发
router.beforeEach(async (to, from, next) => {
    // console.log("to:", to);
    // console.log("from:", from);
    // console.log("next:", next);

    if (to.path == '/login') {
        next()
    } else {
        console.log("window.localStorage.getItem('token'):", window.sessionStorage.token);
        if (!window.sessionStorage.getItem('token')) {
            console.log("触发路由重定向", this);
            UI.dialog({
                title: "温馨提示",
                content: "请登录后，再进行后续操作",
                leftBtnShow: false,
                rightBtn: '确定 '
            })
            router.push('/login')
            return
        } else {
            next()
        }
    }
})
// 全局后置钩子: 它发生在路由跳转完成后，beforeEach 和 beforeResolve 之后，beforeRouteEnter（组件内守卫）之前。它同样在 每次导航 时都会触发
router.afterEach((to, from) => {
    // console.log("afterEach-to", to); //到达的路由
    // console.log("afterEach-from:", from); //离开的路由
});
// 全局解析守卫: 在路由跳转前，所有 组件内守卫 和 异步路由组件 被解析之后触发，它同样在 每次导航 时都会触发 beforeResolve
/*
    1、常用于登录验证；
    2、使用 router.beforeEach 可注册一个全局前置守卫；
    3、每当一个导航被触发时，首先被调用的总是全局前置守卫 ;
    4、该守卫接受三个参数：to、from、next，三个参数意思分别是：
        to —— 即将要进入的目标路由对象（路由对象）；
        from —— 当前导航正要离开的路由（路由对象）；
        next —— 此方法，必须调用，如果想跳转的话，否则路由将不会跳转（function）

    to ：正是跳转后的目标路有对象play；
        to.path 和to.fullPath的区别：
        to.path - 当前的路径，始终解析为绝对路径；to.fullPath - 完整的解析URL包含查询参数和哈希。
    from：是之前的路由对象 first。
    next：则是一个函数，next函数决定路由是否跳转；
    next( ) 参数问题：
        next（ false） 可传false，当用户点击浏览器后退按钮时，url地址会重置到from路由对象的地址（通俗说，就是路由不会跳转了！！！）
        next（ "/"）或者 next（{path："/"}）可以传路径,它会跳转到不同地址。例如：下边当用户访问路由名为play对应的页面时候，它会被终止，直接会被重定向到路径为 “ /news ” 的页面。
*/