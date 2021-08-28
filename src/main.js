import { createApp } from "vue"
import Documentation from "./Documentation.vue"
// plugins
import vueModalContainer from "./plugins/vue-modal-container"
// styles
import "./assets/scss/main.scss"

createApp(Documentation)
.use(vueModalContainer)
.mount("#app");
