import dialogComponent from './index.vue'
import Vue from 'vue'
let $vm;

function loop() { }
const defaultConfig = {
    title: '弹窗',
    content: '',
    leftBtn: '取消',
    rightBtn: '确定',
    leftBtnShow: true,
    rightBtnShow: true,
    cancel: loop,
    sure: loop,
    rightIconClick: loop,
    showIcon: false,
    showRightIcon: false,
    mannualClose: false
}
/*
    $on、$off、$once、$emit 是封装nodeJS中的事件
    绑定事件：on(eventName,cb){}
    触发事件：emit(eventName,params){}
    解绑事件：off(eventName,cb){}
    $once函数：监听一个自定义事件，但是只触发一次。一旦触发之后，监听器就会被移除
*/
const dialog = {
    dialogCreate(config) {
        $vm.$off('cancel')
        $vm.$off('sure')
        $vm.$off('rightIconClick')
        let _config = null;
        $vm.config = {}
        if (typeof config === 'string') {
            _config = Object.assign({}, defaultConfig, { content: config })
        } else {
            _config = Object.assign({}, defaultConfig, config)
        }
        $vm.config = _config;
        $vm.$once('cancel', () => {
            $vm.config.cancel()
            $vm.visible = false;
        });
        $vm.$once('sure', () => {
            if (_config.mannualClose) {
                $vm.config.sure(closeDialog)
            } else {
                $vm.config.sure()
                $vm.visible = false
            }
        });
        $vm.$once('rightIconClick', () => {
            _config.rightIconClick()
            $vm.visible = false;
        });
        $vm.visible = true
    }
}
let closeDialog = function () {
    $vm.visible = false;
}

export default {
    install(Vue, UI) {
        if (!$vm) {
            const DialogPlugin = Vue.extend(dialogComponent);
            $vm = new DialogPlugin({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el)
        }
        Vue.$dialog = dialog.dialogCreate;

        Vue.prototype.$dialog = Vue.$dialog;
    }
}