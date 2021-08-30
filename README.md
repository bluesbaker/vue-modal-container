# vue-modal-container

## How to use
### 0. Install package
```
npm install vue-modal-container
```

### 1. Add vue-modal-container plugin to app
```js
import { createApp } from "vue"
import App from "./App.vue"
import vueModalContainer from "vue-modal-container"
// ...
createApp(App).use(vueModalContainer, {
  // default properties
  propertyName: "$modal",
  componentName: "ModalContainer"
}).mount("#app")
//...
```

### 2. Create a dialog modal component
```vue
<template>
  <div>
    <span> {{ message }} </span>
    <button @click="onOk(true)">ok</button>
    <button @click="onOk(false)">cancel</button>
  </div>
</template>

<script>
export default {
    name: "DialogModal",
    props: ["onOk", "message"]
}
</script>
```

### 3. Use the $modal global function in component methods
```vue
<template>
  <button @click="showDialog">show dialog</button>
</template>

<script>
import DialogModal from "./components/Modals/DialogModal.vue"
// ...
export default {
  name: "Component",
  data() {
    return {
      result: null
    }
  },
  components: {
    DialogModal
  },
  methods: {
    showDialog() {
      this.$modal(DialogModal, {
        title: "The title of dialog",
        message: "Hello dialog modal!",
        onOk: (confirm) => {
          this.result = confirm;
        }
      })
    }
  }
}
</script>
```

## Demonstration
Follow the [link](https://bluesbaker.github.io/vue-modal-container) to watch the demo.