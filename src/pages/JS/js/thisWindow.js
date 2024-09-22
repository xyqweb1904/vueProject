export let thisWindowFun = {
  thisWindowMain() {
    console.log("11111111111111111111111111111111111111111");
    this.thisWindow1()
  },
  thisWindow1() {
    let url = location.href;
    let pages_urlName = url.split('/').reverse()[0]
    // console.log("pages_urlName:", pages_urlName);
    localStorage.setItem('pages_urlName', pages_urlName)
    localStorage.setItem('pagesRedirection', 'Y')
    location.href = 'http://localhost:8080/static/thisWindow.html'
    // console.log("this:", this)
  }
};

export let thisWindow2 = function () {
  console.log(this);
}
