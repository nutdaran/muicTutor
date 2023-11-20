import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'

const app = createApp(App)

app
  .use(vuetify)
  .use(router)
  .use(axios)
  .use(createPinia())
  .mount('#app')