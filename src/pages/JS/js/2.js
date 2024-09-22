let data = [
    { xm: "用量", zj: 14081, zd: 775, zx: 0, pj: 586.71 },
    { xm: "单位实量", zj: 1000.08, zd: 41.67, zx: 41.67, pj: 41.67 },
    { xm: "单位能耗", zj: 337.94, zd: 18.6, zx: 0, pj: 14.08 },
    { xm: "累计单位能耗", zj: 5047.75, zd: 337.94, zx: 16.63, pj: 210.32 },
    { xm: "单耗实量", zj: 1.09, zd: 0.06, zx: 0, pj: 0.05 },
    { xm: "累计单耗实量", zj: 16.1, zd: 1.07, zx: 0.06, pj: 0.67 }
]
let data2 = [
    { 项名: "用量", 总计: 14081, 最大: 775, 最小: 0, 平均: 586.71 },
    { 项名: "单位实量", 总计: 1000.08, 最大: 41.67, 最小: 41.67, 平均: 41.67 },
    { 项名: "单位能耗", 总计: 337.94, 最大: 18.6, 最小: 0, 平均: 14.08 },
    { 项名: "累计单位能耗", 总计: 5047.75, 最大: 337.94, 最小: 16.63, 平均: 210.32 },
    { 项名: "单耗实量", 总计: 1.09, 最大: 0.06, 最小: 0, 平均: 0.05 },
    { 项名: "累计单耗实量", 总计: 16.1, 最大: 1.07, 最小: 0.06, 平均: 0.67 }
]
// {
//     name: '总计',
//     用量: 14081,
//     单位实量: 1000.08,
//     单位能耗: 337.94,
//     累计单位能耗: 5047.75,
//     单耗实量: 1.09,
//     累计单耗实量: 10.9
// }
function dataFun(data) {
    let zjObj = {}, zdObj = {}, zxObj = {}, pjObj = {}
    data.map(item => {
        for (const key in item) {
            // console.log("key", key);
            if (key == 'zj') {
                zjObj[item.xm] = item[key]
            }
            if (key == 'zd') {
                zdObj[item.xm] = item[key]
            }
            if (key == 'zx') {
                zxObj[item.xm] = item[key]
            }
            if (key == 'pj') {
                pjObj[item.pj] = item[key]
            }
        }
    })
    zjObj.name = '总计'
    zdObj.name = '最大'
    zxObj.name = '最小'
    pjObj.name = '平均'
    let newMap = [zjObj, zdObj, zxObj, pjObj]
    // console.log("zjObj:", zjObj);
    // console.log("zdObj:", zdObj);
    // console.log("zxObj:", zxObj);
    // console.log("pjObj:", pjObj);
    console.log("newMap:", newMap);
}
dataFun(data)

function dataFun2(data) {
    let zj = {}, zd = {}, zx = {}, pj = {};
    let newMap = []
    const map = new Map()
    data.map(item => {
        if (item['最大']) {
            map.set('最大', item['最大'])
        }
        if (item['总计']) {
            map.set('总计', item['总计'])
        }
        if (item['最小']) {
            map.set('最小', item['最小'])
        }
        if (item['最大']) {
            map.set('平均', item['平均'])
        }
        map.set('项名', item['项名'])
        console.log("map:", map);

        for (let [key, value] of map) {
            console.log("value:", value)
            console.log("key", key);
            if (key == '总计') {
                console.log("map['项名']:", map['项名']);
            }
            // if (key == 'zd') {
            //     zd['项名'] = value
            // }
            // if (key == 'zx') {
            //     zx['项名'] = value
            // }
            // if (key == 'pj') {
            //     pj['项名'] = value
            // }
        }
        newMap = [zj]
        // newMap = [zj, zd, zx, pj]
        console.log("newMap:", newMap);
    })
}
// dataFun2(data2)