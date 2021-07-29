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
import { ref } from "vue"
export default {
    name: "ModalContainer",
    props: {
        close: {
            type: Function,
            default: () => {}
        }
    },
    setup(props) {
        const isActive = ref(false);
        setTimeout(() => {
            isActive.value = true;
        }, 100);
        let handleClose = (self) => {
            if(self.target.id == "modalContainer") {
                isActive.value = false;
                setTimeout(() => {
                    props.close();                  
                }, 300);
            }
        };
        return {
            isActive,
            handleClose
        }
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