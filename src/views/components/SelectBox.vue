<template>
  <div class="region-selectBox">
    <label> {{ label }} </label>
    <select
      v-on:input="updateValue($event.target.value)"
    >
      <option v-for="(item, index) in items" :key="index" :value="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script>
// @ is an alias to /src
import {
  reactive,
} from 'vue';

export default {
  name: 'SelectBox',
  props: {
    label: String,
    items: Array,
  },
  setup(props, { emit }) {
    const updateValue = (value) => {
      emit('regionSelect', value);
    };

    return {
      updateValue,
    };
  },
};
</script>

<style lang="scss" scoped>
label {
  margin: 10px;
  font-size: 20px;
}
select {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  font-family: "Noto Sansf KR", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #444;
  background-color: #fff;
  padding: .6em 1.4em .5em .8em;
  margin: 10px;
  border: 1px solid #aaa;
  border-radius: .2em;
  box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
}
</style>
