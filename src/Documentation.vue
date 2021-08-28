<template>
  <div class="documentation__template">
    <div class="header">
      <h1>
        <span class="accent"><span class="accept">vue</span>-modal-container</span>
      </h1>
    </div>
    <h2>Description</h2>
    <div class="block">
      <span>
        The <span class="accent">vue-modal-container</span> is plugin for 
        the Vue3 which provides the use of "$modal" global function and "modal-container" component to show a modal.
      </span>
    </div>
    <h2>Install</h2>
    <div class="block">
      <span class="console">
       <span class="light">></span> npm install <span class="accent">vue-modal-container</span>
      </span>
    </div>
    <h2>How to use</h2>
    <div class="block">
      <h3>1. Add vue-modal-container plugin to app</h3>
      <p><span class="light">./</span>main.js</p>
      <pre class="prettyprint">
<code class="language-js">import { createApp } from "vue"
import App from "./App.vue"
import vueModalContainer from "vue-modal-container"
// ...
createApp(App).use(vueModalContainer, {
  // default properties
  propertyName: "$modal",
  componentName: "ModalContainer"
}).mount("#app")</code></pre>
<h3>2. Create a dialog modal component</h3>
      <p><span class="light">./components/Modals/</span>DialogModal.vue</p>
      <pre class="prettyprint">
<code class="language-html">{{`<template>
  <div>
    <span> \{{ message }\} </span>
    <button @click="onOk(true)">ok</button>
    <button @click="onOk(false)">cancel</button>
  </div>
</template>

<script>`}}<pre class="prettyprint lang-js inside">
  export default {
    name: "DialogModal",
    props: ["onOk", "message"]
  }</pre>{{`</script>`}}
// ...
</code></pre>
      <h3>3. Use the $modal global function in component methods</h3>
      <p><span class="light">./components/</span>Component.vue</p>
      <pre class="prettyprint">
<code class="language-html">{{`<template>
  <button @click="showDialog">show dialog</button>
</template>

<script>`}}<pre class="prettyprint lang-js inside">import DialogModal from "./components/Modals/DialogModal.vue"
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
}</pre>{{`</script>
// ...`}}</code></pre>
    </div>
    <h2>Demonstration</h2>
    <div class="block">
      <div class="description">
        The simple panel in the modal-container component
      </div>
      <div class="demonstration">
        <button @click="showConfirmDialog" :class="{accept: result, reject: (result == false)}">show</button>
      </div>
    </div>      
  </div>
</template>

<script>
import ConfirmModal from "./components/Modals/ConfirmModal.vue"

export default {
  name: "Documentation",
  data() {
    return {
      result: null
    }
  },
  components: {
    ConfirmModal
  },
  methods: {
    showConfirmDialog() {
      this.$modal(ConfirmModal, {
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