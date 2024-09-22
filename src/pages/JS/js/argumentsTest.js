let argumentsTest = {
  name: '小明',
  sex: '男',
  age: 18,
  like: '健身',
  height: 180,
  weight: 70,
  giveParameter() {
    this.receiveParameter(this.name, this.sex, this.age, this.like, this.height, this.weight)
  },
  receiveParameter() {
    // arguments.callback()
    console.log(arguments);
    // 把arguments转换为数组的几种方法
    // 方法1  
    console.log(Array.prototype.slice.call(arguments))
    // 方法2  
    console.log([].slice.call(arguments))
    // 方法3  
    console.log(Array.from(arguments))
    // 方法4  
    console.log([...arguments])
    // this.callback()
  },
  callback() {
    console.log('11111')
  }
}

export default argumentsTest
