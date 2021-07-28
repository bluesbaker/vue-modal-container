<template>
  <div class="demo">
    <h1>
      <span class="accent"><span class="accept">vue</span>-modal-container</span>
    </h1>
    <h2>Description</h2>
    <div class="block">
      <span>
        The <span class="accent">vue-modal-container</span> is plugin for Vue3 which provides
        the use of global function "$modal" in setup() or commomjs of the vue project;
      </span>
    </div>
    <h2>Install</h2>
    <div class="block">
      <span class="console">
       <span class="light">></span> npm install <span class="accent">vue-modal-container</span>
      </span>
    </div>
    <h2>Demonstration</h2>
    <div class="block">
      <div class="description">
        saasdasd
      </div>
      <div class="demonstration">
        <span>
          <span v-if="result != null">result: </span>
          <span :class="{accept: result, reject: !result}">{{ result }}</span>
        </span>
        <button @click="showConfirmDialog">show</button>
      </div>
    </div>
    <div class="block">
      <div class="description">
        saasdasd
      </div>
      <div class="demonstration">
        <span>
          <span v-if="result != null">result: </span>
          <span :class="{accept: result, reject: !result}">{{ result }}</span>
        </span>
        <button @click="showConfirmDialog">show</button>
      </div>
    </div>      
  </div>
</template>

<script>
import ConfirmModal from "./components/Modals/ConfirmModal.vue"

export default {
  name: 'Demo',
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