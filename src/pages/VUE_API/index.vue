<template>
    <div class="pageDiv">
        <h2>VUE 的 API</h2>
        <div class="FJ_div">
            <div class="itemDiv">
                <div>自定义指令Vue.directive</div>
                <div>
                    Vue.directive('指定名', {<br/>
                        钩子函数(el, binding, vnode){}<br/>
                    });                                                                             
                </div>
            </div>
            <div class="itemDiv"></div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.pageDiv {
    padding: 10px 20px
}
.FJ_div {
    display: flex;
    justify-content: center;
    >div {
        width: 50%;
        border: 1px solid #000;
        min-height: 100px;
    }
}
    
</style>