# vue-modal-container

## Install
```
npm install vue-modal-container
```
## How to use
### main.js
```js
//...
import vueModalContainer from "vue-modal-container"
//...
Vue.use(vueModalContainer, {
    // name of global function | "$modal" is default
    propertyName: "$modal",
    // name of global component | "ModalContainer" is default
    componentName: "ModalContainer",
})
//...
```

### Component in *.vue
```vue
<template>
    <div>
        <modal-container>
            <div class="modal">
                <span>Hello dialog modal!</span>
                <button @click="onOk(true)">Ok</button>
                <button @click="onOk(false)">Cancel</button>
            </div>
        </modal-container>
    </div>
</template>

<script>
export default {
    //...
}
</script>

<style>
.modal {
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 200px;
    background: #fff;
    border: 1px solid #000;
}
</style>
```

### Compiles and hot-reloads for development(demo)
```
npm run serve
```

### Compiles and minifies for production(demo)
```
npm run build-dev
```