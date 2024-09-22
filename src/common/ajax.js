function apiTest() {
    let xhr = ''
    // 1.创建XMLHttpRequest对象 基于不同版本的引擎老创建异步对象
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP")
    }

    // 2.设置响应http请求的状态变化函数
    xhr.onreadystatechange = function () {
        // 5.在回调函数中对不同状态进行处理
        /*
            readyState状态:
                0:请求未初始化
                1:服务器连接已经建立（已经调用open方法，但还未调用send）
                2:请求已经接收（已经调用send方法）
                3:请求处理中（请求已经到达服务端，正在处理）
                4:请求完成，但响应已就绪
            status状态:
                200:正确
                404:未找到页面
                500:错误
        */
        if (xhr.readyState == 4 && xhr.status == 200) {
            let res = xhr.responseText;
            res = JSON.parse(res)
            console.log("res==>", res)
        }
    }

    // 3.创建http请求，并且指定该请求的请求方式、url、请求头等相关信息
    xhr.open("get", "https://api-hmugo-web.itheima.net/api/public/v1/categories")
    // 设置请求头
    xhr.setRequestHeader("Content-type", "applicationx-www-form-urlencided")
    // 异常处理
    xhr.onerror = function () {
        console.log("Network request failed")
    }
    // 跨域携带cookie
    xhr.withCredentials = true

    // 4.发出请求
    xhr.send()

}
export default apiTest