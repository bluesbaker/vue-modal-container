<template>
    <default-modal>
        <template #title>
            <h2> {{ title }} </h2>
        </template>
        <template #default>
            <span>{{ message }}</span>
        </template>
        <template #buttons>
            <button @click="onOk(true)" class="btn flex">Ok!</button>
            <button @click="onOk(false)" class="btn flex">Cancel!</button>
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
.btn {
    border: 0;
    padding: 10px 20px;
    &.flex {
        flex: 1;
    }
}
</style>