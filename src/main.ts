import './scss/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import i18n from './i18n';
import { createVuestic } from 'vuestic-ui';
import { createGtm } from '@gtm-support/vue-gtm';

import router from './router';
import vuesticGlobalConfig from './services/vuestic-ui/global-config';

const app = createApp(App);

app.use(router);
app.use(i18n);
app.use(createVuestic({ config: vuesticGlobalConfig }));
app.use(createPinia());

if (import.meta.env.VITE_APP_GTM_ENABLED) {
  app.use(
    createGtm({
      id: import.meta.env.VITE_APP_GTM_KEY,
      debug: false,
      vueRouter: router
    })
  );
}

app.mount('#app');
