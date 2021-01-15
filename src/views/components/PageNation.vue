<template>
  <div class="btn-cover">
    <button @click="clickFirstPage">
      맨 앞으로
    </button>
    <button @click="clickPrevPage">
      이전
    </button>
    <span class="page-count">{{ props.currentPage + 1 }} / {{ props.totalPage }} 페이지</span>
    <button @click="clickNextPage">
      다음
    </button>
    <button @click="clickLastPage">
      맨 뒤로
    </button>
  </div>
</template>

<script>
import {
  reactive, inject, ref,
} from 'vue';

export default {
  name: 'PageNation',
  components: {
  },
  props: {
    currentPage: Number,
    totalPage: Number,
  },
  setup(props, { emit }) {
    const clickFirstPage = () => {
      emit('firstPage');
    };
    const clickPrevPage = () => {
      if (props.currentPage === 0) return;
      emit('prevPage');
    };
    const clickNextPage = () => {
      if (props.currentPage === props.totalPage - 1) return;
      emit('nextPage');
    };
    const clickLastPage = () => {
      emit('lastPage');
    };

    return {
      props,
      clickFirstPage,
      clickPrevPage,
      clickNextPage,
      clickLastPage,
    };
  },
};
</script>
<style lang="scss" scoped>
button {
  width: 5rem;
  height: 2rem;
  letter-spacing: 0.5px;
  border-radius: 2px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #444;
  margin: 5px;
  background-color: #fff;
}

.btn-cover {
  margin: 1.5rem 1.5rem;
  text-align: center;
  .page-count {
    color: #fff;
    padding: 0 1rem;
  }
}
</style>
