import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import CanvasJSChart from '@canvasjs/vue-charts';

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

app
  .use(vuetify)
  .use(router)
  .use(CanvasJSChart)
  .use(createPinia())
  .mount('#app')