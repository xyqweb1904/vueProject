import Vue from 'vue'
let ui = {
    dialog(config) {
        console.log(config);
        Vue.$dialog(config)
    }
};

export default ui