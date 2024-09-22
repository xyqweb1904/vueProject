<template>
    <div style="padding:10px">vuexPages

        <my-addition></my-addition>
        <p>------------------------------</p>
        <my-subtraction></my-subtraction>
        <p>------------------------------</p>
        <little-demo></little-demo>
    </div>
</template>
<script>
import Addition from './components/Addition'
import Subtraction from './components/Subtraction'
import littleDemo from './components/littleDemo/index'
export default {
  name: 'VuexPages',
  components: {
    'my-addition': Addition,
    'my-subtraction': Subtraction,
    'little-demo': littleDemo
  },
  data() {
    return {}
  }
}
</script>
