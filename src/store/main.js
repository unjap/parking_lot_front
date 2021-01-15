import { reactive, toRefs } from 'vue';
import axios from 'axios';
import appConfig from '../configs/config';

const mainStore = () => {
  const state = reactive({
    searchResult: null,
    searchRegion: '',
  });

  const getList = (searchRegion) => {
    axios.post(`${appConfig.serverIP}/parkingLot/getList`, {
      searchRegion,
    }).then((response) => {
      state.searchResult = response.data || null;
      state.searchRegion = searchRegion;
    });
  };

  return {
    ...toRefs(state),
    getList,
  };
};

export default mainStore;
