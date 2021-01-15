<template>
  <div
    :class="{
      'browser_resize': state.browserHeight > 0
    }"
  >
    <h1>전국 주차장 위치 확인</h1>
    <Top></Top>
    <Body></Body>
  </div>
</template>

<script>
import { reactive, ref, onUnmounted } from 'vue';
import Top from './Top.vue';
import Body from './Body.vue';

export default {
  name: 'Home',
  components: {
    Top,
    Body,
  },
  setup() {
    const state = reactive({
      browserHeight: ref(0),
    });

    window.addEventListener('resize', (event) => {
      console.log(event);
      state.browserHeight = window.innerHeight;
    });

    onUnmounted(() => window.removeEventListener('resize'));

    return {
      state,
    };
  },
};
</script>
<style scoped>
h1 {
  margin: 10px 10px;
  font-size: 20px;
  color: #fff;
  text-align: left;
}
.browser_resize {
  height: 100%;
  min-height: 750px;
  overflow-y: auto;
}
</style>
