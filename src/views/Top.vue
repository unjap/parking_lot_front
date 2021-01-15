<template>
  <div class="Top">
    <SelectBox
      :label="state.regionLabel"
      :items="state.regionList"
      @regionSelect="value => { state.selectRegion = value }"
    ></SelectBox>
    <button
      class="button"
      v-on:click="searchBtn"
    >검색하기</button>
  </div>
</template>

<script>
import {
  inject, reactive, watch, ref,
} from 'vue';
import { FILEDS, REGIONS } from '../utils/constants';
import SelectBox from './components/SelectBox.vue';

export default {
  name: 'Top',
  components: {
    SelectBox,
  },
  setup() {
    const mainStore = inject('mainStore');
    const state = reactive({
      totalData: ref(null),
      fileds: ref(null),
      regionList: ref([]),
      selectRegion: ref(''),
      regionLabel: ref('행정 구역 선택'),
    });

    state.fileds = FILEDS;
    state.regionList = REGIONS;

    watch(
      () => state.selectRegion,
      (selectValue) => {
        state.selectRegion = selectValue;
      },
    );

    const searchBtn = () => {
      console.log('searchBtn selectRegion : ', state.selectRegion);
      if (!state.selectRegion) state.selectRegion = state.regionList[0];
      mainStore.getList(state.selectRegion);
    };

    return {
      state,
      searchBtn,
    };
  },
};
</script>
<style lang="scss" scoped>
.Top {
  display: flex;
  color: #fff;
  text-align: left;
  padding-top: 10px;

  .button {
    position: relative;
    border-radius: 2px;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #444;
    margin: 0;
    background-color: #fff;
  }
}
</style>
