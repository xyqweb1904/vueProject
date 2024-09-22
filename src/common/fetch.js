import { envNode } from './env'
import Flag from './flag';
console.log("envNode:", envNode)
const FlagType = [
    Flag.SUCCESS,
    '000000'
]

let fetch = async function ({
    url,
    method = 'POST',
    mock = true,
    dataType,
    data = {},  //  入参
    timeout = 6000, // 默认最大请求响应时间
    header = { // 请求头配置
        'content-type': 'application/x-www-form-urlencoded'
    }
}) {
    // 判断平台，环境，添加入参
    let publicData = await getPublicData();
    // 把公共的需要配置的参数合并入参中
    Object.assign(data, publicData)
    if (mock) {
        return new Promise((resolve, reject) => {
            getUrlMock(url, data).then((res, rej) => {
                if (['1', '111111'].includes(res.data.flag) || res.code == '000000') {
                    resolve(res)
                } else {
                    reject(rej)
                }
            })
        })
    } else {
        console.log('线上API')
    }
}
const getPublicData = async function () {
    let publicParam = {}
    // 判断环境
    if (envNode == 'development') {
        publicParam.env = 'development'
    }
    // 判断平台
    // 判断版本

    return publicParam
}
// 获取mock数据
const getUrlMock = function (url, data) {
    let urlArr = url.split('/');
    let urlName = urlArr[urlArr.length - 1];
    console.log(`【mock】数据：接口${urlName}的入参为：${data}`);

    try {
        let json = require(`../mock/${urlName}.json`);
        return new Promise(resolve => {
            setTimeout(() => {
                console.log(`【mock】数据：接口${urlName}的返回数据为:`, json);
                resolve(json)
            }, 500)
        })
    } catch (err) {
        console.log("err:", err);
        console.log(`没有找到${urlName} 的接口`)
        return new Promise(resolve => {
            resolve({
                flag: '2',
                data: {},
                msg: `【mock】数据获取失败，没有找到${urlName} 的接口`
            })
        })
    }
}
export default fetch
//  cross-env VUE_APP_ENV=development 