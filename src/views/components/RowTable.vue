<template>
  <div>
    <table>
      <thead>
        <!-- <slot name="header"></slot> -->
        <tr>
          <template v-for="(value, key) in Object.values(headers)" :key="key">
            <th>{{ value }}</th>
          </template>
        </tr>
      </thead>
      <tbody>
        <template v-for="(list, key) in state.pageList" :key="key">
          <tr>
            <template v-for="(value, key) in list" :key="key">
              <td>{{ value }}</td>
            </template>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  reactive, ref, watch,
} from 'vue';

export default {
  name: 'RowTable',
  props: {
    headers: Object,
    items: Object,
  },
  setup(props) {
    const state = reactive({
      headers: ref(props.headers),
      pageList: ref(props.items),
    });

    watch(
      () => props.items,
      (newVal) => {
        state.pageList = props.items;
      },
    );

    return {
      state,
    };
  },
};
</script>
<style lang="scss" scoped>
table {
  border: 1px solid #444444;
  border-collapse: collapse;
  border-left: 1px solid #ccc;
  line-height: 1.5;
  margin: 20px 10px;
}
th {
  border: 1px solid #444444;
  padding: 10px;
  font-weight: bold;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #444444;
  border-bottom: 2px solid #c00;
  color: black;
  background: #dcdcd1;
  white-space: nowrap;
}
td {
  width: 100%;
  padding: 10px;
  vertical-align: top;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  color: white;
  white-space: nowrap;
}

</style>
