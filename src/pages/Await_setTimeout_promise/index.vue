<template>
    <div>
        <h2>Await_setTimeout_promise1111111111111111</h2>
        <h4>在同一个事件循环里面微队列永远在宏队列前面执行</h4>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      /*
        为什么明明有await阻塞，two_fun函数中的setTimeout还是执行比one_fun函数中的setTimeout块呢?
            答：await会起到阻塞的作用，但是，setTimeout不会阻塞流程，setTimeout属于宏函数，他会在宏队列中执行。主流程会继续执行，
            所以他会执行two_fun函数，同样原理，也会把two_fun函数中的setTimeout放入宏队列中，这时宏队列有2个函数了
            由于one_fun函数中的setTimeout等待时间大于two_fun函数中的setTimeout，所以two_fun函数中的setTimeout会先执行
      */

      await this.one_fun();
      await this.two_fun();
      this.three_fun();
      await this.four_fun().then(res => {
        console.log("four_fun-Promise:", res);
      });
      await this.five_fun().then(res => {
        console.log("five_fun-Promise:", res);
      });
      console.log("my init");
    },
    async one_fun() {
      setTimeout(() => {
        console.log("one_fun is setTimeout");
      }, 300);
      console.log("my is one_fun");
    },
    async two_fun() {
      setTimeout(() => {
        console.log("two_fun is setTimeout");
      }, 200);
      console.log("my is two_fun");
    },
    three_fun() {
      setTimeout(() => {
        console.log("three_fun is setTimeout");
      }, 100);
      console.log("my is three_fun");
    },
    four_fun() {
      console.log("my is four_fun");
      return new Promise((resolve, reject) => {
        let obj = {
          name: "小米",
          age: 18
        };
        setTimeout(() => {
          resolve(obj);
        }, 500);
      });
    },
    five_fun() {
      console.log("my is five_fun");
      return new Promise((resolve, reject) => {
        let obj = {
          name: "小华",
          age: 18
        };
        resolve(obj);
      });
    }
  }
};
</script>
