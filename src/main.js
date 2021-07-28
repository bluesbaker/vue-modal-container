import { createApp } from 'vue'
import vueModalContainer from './plugins/vue-modal-container'
import Demo from './Demo.vue'
// styles
import './assets/scss/main.scss'

createApp(Demo).use(vueModalContainer).mount('#app')
