<template>
<transition name="fade" mode="out-in">
    <div class="modal-container__template" :style="containerClass" @click="handleClose" id="modalContainer" v-show="options.isShow">
        <div class="modal">
            <slot></slot>
        </div>
    </div>
</transition>
</template>

<script>
export default {
    name: "ModalContainer",
    data() {
        return {
            containerClass: {
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0, 0, 0, 0.5)",
                zIndex: "100"
            }
        }
    },
    props: {
        options: {
            type: Object,
            default: {}
        }
    },
    methods: {
        handleClose(self) {
            if(self.target.id == "modalContainer") {
                this.options.close();
            }
        }
    }
}
</script>

<style lang="scss">
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
.fade-enter-active {
  transition: all 0.3s ease-out;
}
.fade-leave-active {
  transition: all 0.3s ease-in;
}
</style>