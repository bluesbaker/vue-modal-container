<template>
<transition name="fade" mode="out-in">
    <div class="modal-container__template" @click="handleClose" id="modalContainer" v-show="isActive">
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
            isActive: false
        }
    },
    props: {
        close: {
            type: Function,
            default: () => {}
        }
    },
    methods: {
        handleClose(self) {
            if(self.target.id == "modalContainer") {
                this.isActive = false;
                setTimeout(() => {
                    props.close();                  
                }, 300);
            }
        }
    },
    mounted() {
        setTimeout(() => {
            this.isActive = true;
        }, 100);
    }
}
</script>

<style lang="scss" scoped>
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

.modal-container__template {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
}
</style>