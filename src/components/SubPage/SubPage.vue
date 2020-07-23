<template>
  <div class="hello">
    <h1>名称：{{state.name}}</h1>
    <h3 @click="increment">点击数：{{count}}</h3>
    <div v-for="user of state.userArray" :key="user.id">
      <span>{{user.name}}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted, ref, watchEffect } from '@vue/composition-api';
import axios from 'axios';
export default defineComponent({
  name: 'SubPage',
  setup() {
    const state = reactive({
      name: 'SubPage',
      userArray: []
    });

    const count = ref(0) // ref 和 reactive 的区别在此

    function getData() {
      axios.get('https://jsonplaceholder.typicode.com/users', {}).then(res => {
        console.log(res);
        state.userArray = res.data;
      });
    }

    watchEffect(()=> {
      console.log('count被改变：')
      console.log(count.value)
    })

    onMounted(() => {
      getData();
    });

    function increment() {
      console.log('increment')
      count.value++;
    }

    return {
      state,
      increment,
      count
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
