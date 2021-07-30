<template>
    <default-modal>
        <template #title>
            <h2> {{ title }} </h2>
        </template>
        <template #default>
            <span>{{ message }}</span>
        </template>
        <template #buttons>
            <button @click="onOk(true)" class="modal-button accept">ok</button>
            <button @click="onOk(false)" class="modal-button reject">cancel</button>
        </template>
    </default-modal>
</template>

<script>
import DefaultModal from "./DefaultModal.vue"
export default {
    name: "ConfirmModal",
    props: ["title", "message", "onOk"],
    components: {
        DefaultModal
    }
}
</script>

<style lang="scss" scoped>
.modal-button {
    flex: 1;
}
</style>