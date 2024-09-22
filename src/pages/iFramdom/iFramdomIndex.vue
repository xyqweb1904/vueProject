<template>
    <div class="page_div">
        <h3 class="center_style">通过ifram标签来调用第三方的微服务</h3>
        <div class="father_dome">
            <div>
                <h3>保存数据展示区</h3>
                <div class="father_show">
                    <div class="left_show">
                        <h3>通过方式一实现子传父</h3>
                        {{iframeValue}}
                    </div>
                    <div class="right_right">
                        <h3>通过方式二实现子传父</h3>
                        {{iframeValue2}}
                    </div>
                </div>
            </div>
            <!-- 
                只能放在static文件夹中
                <iframe src="./sonDom.html" height="400" width="600"></iframe>
            -->
            <iframe id="iframe" ref="iframedom" src="../../../static/Iframe/sonDom.html" height="200" width="600"></iframe>
            <div>
                <h4>功能区</h4>
                <ul class="iframe_ui">
                    <li v-for="item in buttonList">
                        <span>第{{item.key}}项</span>
                        <el-button type="primary" @click="getList(item)">{{item.value}}</el-button>
                        <el-button type="primary" @click="inserTo(item)"> 插入</el-button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            buttonList: [{
                key: 1,
                value: '你好'
            },{
                key: 2,
                value: '我好'
            },{
                key: 3,
                value: '大家好'
            }],
            iframeValue: '', // 子传父的数据/方式一
            iframeValue2: '', // 子传父的数据/方式二
            selectionStart: 0, // 子组件光标位置信息
        }
    },

    mounted() {
        document.domain = 'localhost' // 解决跨域
        let iframedom = this.$refs.iframedom
        // 通过绑定事件触发子组件的blue事件来获取光标信息
        iframedom.addEventListener('load',() => {
            let _document = iframe.contentDocument
            let textAreadom = _document.querySelector('textarea')
            textAreadom.addEventListener('blur', (e) => {
                this.selectionStart = e.target.selectionStart
            })
            let _window = iframe.contentWindow
            let button2 = _document.getElementById('buttonId2');
            button2.addEventListener('click', (e) => {
                // console.log('123123', e);
                _window.parent.postMessage({ type: 'sonDom2', value: textAreadom.value })
                // 获取textarea的值
                console.log("textAreadom:", textAreadom.value)
                this.iframeValue2 = textAreadom.value
            })
        })
        // 方式1：通过在父组件中监听message事件来获取传入的值
        window.addEventListener("message", (e) => {
            // console.log("e==>", e)
            if (e.data.type == 'sonDom1') {
                this.iframeValue = e.data.value
            }
        })
    },
    methods: {
        inserTo(item) {
            console.log("item:", item)
            document.domain = 'localhost'
            let _document = iframe.contentDocument;
            let _window = iframe.contentWindow
            let iframedom = this.$refs.iframedom
            let textAreadom = _document.querySelector("textarea")
            let _oldValue = textAreadom.value;
            // *：代表所有都能接收信息，如果要指定页面/服务才能接收信息，那么需要输入对应页面/服务的具体地址
            _window.postMessage(item, '*')
        },
        getList(item) {
            // console.log(item)
            // console.log(iframe)
            let _window = iframe.contentWindow; // 获取iframe中的window窗口
            let _document = iframe.contentDocument; // 获取iframe中的dom总节点
            _window.postMessage(item, '*')
            console.log(_document)
        }
    },
}
</script>
<style lang="less">
@import url("./index.less");
</style>