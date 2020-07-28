<template>
  <div class="hello">
    <van-button type="primary" @click="gotoNextPage">去另一页</van-button>
    <van-button @click="testAxios">发起axios请求</van-button>
    <h1>名称：{{state.name}}</h1>
    <h3 @click="increment">点击数：{{count}}</h3>
    <div v-for="user of state.userArray" :key="user.id">
      <span>{{user.name}}</span>
    </div>
    <div>
      <van-field v-model="state.value" @input="numFilter" label="文本" placeholder="请输入用户名" />
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  onMounted,
  ref,
  watchEffect,
} from '@vue/composition-api';
import { Field } from 'vant';
export default defineComponent({
  name: 'MainPage',
  components: {
    'van-field': Field,
  },
  setup(props, context) {
    const state = reactive({
      name: 'test',
      userArray: [],
      value: '666'
    });

    function numFilter() {
      state.value = state.value.replace(/[^\d]/g, '')
    }

    const count = ref(0); // ref 和 reactive 的区别在此

    watchEffect(() => {
      console.log('count被改变：');
      console.log(count.value);
    });

    onMounted(() => {
      // getData();
    });

    function increment() {
      console.log('increment');
      count.value++;
    }

    function testAxios() {
      context.root.$axios
        .post('/activity/interactionPoint/getPointData', {
          data: {
            watermarkId: this.watermarkId,
          },
        })
        .then((res) => {
          console.log(res);
        });
    }

    function gotoNextPage() {
      console.log('gotoNextPage');
      this.$router.push({
        name: 'SubPage',
      });
    }

    return {
      state,
      increment,
      gotoNextPage,
      testAxios,
      count,
      numFilter
    };
  },
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
