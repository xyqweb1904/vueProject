import Utils from '../../../common/utils'
let arr1 = [], arr2 = [], arr3 = [];
let arrTakeoutObj = {
    arrSplit(arr) {
        arr1 = JSON.parse(JSON.stringify(arr))
        arr2 = JSON.parse(JSON.stringify(arr))
        console.log("arr1:", arr1);
        console.log("arr2:", arr2);
    },
    arrTakeoutType1(arr) {
        let obj = {}, newArr = [];
        arr.map(item => {
            obj[item] = item;
        })
        console.log("obj:", obj);
        for (const key in obj) {
            newArr.push(obj[key])
        }
        console.log("newArr:", newArr);
    },
    arrTakeoutType2(arr) {
        console.log("Utils:", Utils);
        const res1 = Array.from(new Set(arr));
        console.log("res1:", res1);
        let test = Utils.isEquaalJson({ a: 1 }, { a: 1 });
        console.log("test:", test);

        res1.map(item => {
            if (typeof item == "object") {
                // Utils.isEquaalObj({ a: 1 }, {})
            }
        })
        return res1
    },
    // arrTakeoutType2(arr) {

    // }
}

export default arrTakeoutObj