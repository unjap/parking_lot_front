<template>
  <div v-if="isSearchResult">
    <div>
      <div class="search_result">검색 결과</div>
      <div class="table-row">
        <RowTable
          :headers="state.headers"
          :items="state.pageList"
        >
        </RowTable>
        <PageNation
          @prevPage="prevPage"
          @nextPage="nextPage"
          @firstPage="firstPage"
          @lastPage="lastPage"
          :currentPage="getPageIndex"
          :totalPage="state.totalPage"
        ></PageNation>
      </div>
    </div>
  </div>
</template>

<script>
import {
  reactive, inject, ref, computed, watch,
} from 'vue';
import { FILEDS } from '../utils/constants';
import RowTable from './components/RowTable.vue';
import PageNation from './components/PageNation.vue';

const PAGE_COUNT = 10;

export default {
  name: 'Body',
  components: {
    RowTable,
    PageNation,
  },
  setup() {
    const mainStore = inject('mainStore');

    const state = reactive({
      searchResult: ref(mainStore.searchResult || null),
      searchRegion: ref(mainStore.selectRegion || null),
      pageIndex: ref(0),
      pageList: ref(null),
      totalPage: ref(0),
    });

    state.headers = FILEDS;

    const isSearchResult = computed(() => state.searchResult || null);
    const getPageIndex = computed(() => state.pageIndex);

    const nextPage = () => {
      state.pageIndex += 1;
    };

    const prevPage = () => {
      state.pageIndex -= 1;
    };

    const firstPage = () => {
      state.pageIndex = 0;
    };

    const lastPage = () => {
      state.pageIndex = state.totalPage - 1;
    };

    const getPageList = (stateObj) => {
      const { searchResult, pageIndex } = stateObj;
      const totalList = Object.values(searchResult);
      return totalList.slice(pageIndex * PAGE_COUNT, (pageIndex + 1) * PAGE_COUNT);
    };

    watch(
      () => state.pageIndex,
      (newVal) => {
        state.pageList = getPageList(state);
      },
    );

    watch(
      () => state.searchResult,
      (newVal) => {
        state.pageIndex = 0;
        const totalList = Object.values(state.searchResult);
        state.totalPage = totalList.length % PAGE_COUNT === 0 ? totalList.length / PAGE_COUNT : Math.ceil(totalList.length / PAGE_COUNT);
        state.pageList = getPageList(state);
      },
    );

    return {
      state,
      isSearchResult,
      getPageIndex,
      prevPage,
      nextPage,
      firstPage,
      lastPage,
    };
  },
};
</script>
<style lang="scss" scoped>
.search_result {
  margin-left: 10px;
  color: #fff;
  text-align: left;
}
.table-row {
  width: 95%;
  overflow-x: scroll;
}
</style>
