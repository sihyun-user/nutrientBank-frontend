import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from '@/App.vue'
import router from '@/router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '@/assets/sass/main.scss'

import BaseSpinner from '@/components/ui/BaseSpinner.vue'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(VueAxios, axios)

app.component('BaseSpinner', BaseSpinner)

app.mount('#app')
