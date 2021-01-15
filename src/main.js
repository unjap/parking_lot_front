import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import mainStore from './store/main';

import '@/styles/scss/_reset.scss';

createApp(App)
  .use(router)
  .provide('mainStore', mainStore())
  .mount('#app');
