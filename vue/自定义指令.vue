<template>
  <div class="hello">
    <ul @click="handleClick">
      <li v-for="(index, key) in 5" :key="key" :data-index="index">
        {{index}}
      </li>
    </ul>
    <div v-zyh.a.b="msg"></div>
     <div class="box" v-color="color"></div>
     <div id="app2" v-demo:foo.a.b="message"></div>
     <div v-color-swatch="color">qwerty</div>
  </div>
</template>

<script>
import Vue from 'vue'

Vue.directive("zyh",(el,{modifiers,value})=>{
    let {a,b} = modifiers;
    el.innerText = value;
    if(a){
        el.style.color="#c33";
    }
    if(b){
        el.style.fontWeight="900"
    }
})
Vue.directive('demo', {
  bind: function (el, binding, vnode) {
    var s = JSON.stringify
    el.innerHTML =
      'name: '       + s(binding.name) + '<br>' +
      'value: '      + s(binding.value) + '<br>' +
      'expression: ' + s(binding.expression) + '<br>' +
      'argument: '   + s(binding.arg) + '<br>' +
      'modifiers: '  + s(binding.modifiers) + '<br>' +
      'vnode keys: ' + Object.keys(vnode).join(', ')
  }
})
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg:'1905',
      color:"#c33",
      message: 'hello!'
    }
  },
  methods:{
    handleClick(e) {
      if (e.target.nodeName.toLowerCase() === 'li') {
            const index = parseInt(e.target.dataset.index)
            // 获得引索后，只需要修改data数据就能改变UI了
            console.log(index)
          }
    }
  },
  directives:{
    "color"(el,{modifiers,value}){
        value  =  value || '#000';
        el.style.background= value
    }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
    width: 100px;
    height: 100px;
}
</style>
