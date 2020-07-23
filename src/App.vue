<template>
  <div id="app">
    <keep-alive :include="keepAliveComponents">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { defineComponent, computed, reactive } from '@vue/composition-api';
export default defineComponent({
  name: 'App',
  setup(props, context) {
    const state = reactive({
      name: 'hyn',
      userArray: []
    });
    const keepAliveComponents = computed(() => context.root.$store.state.keepAliveComponents);

    // 暴露给模板
    return {
      state,
      keepAliveComponents
    };
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
