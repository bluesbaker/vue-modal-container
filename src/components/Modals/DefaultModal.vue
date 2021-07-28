<template>
    <div class="modal__template">
        <div class="title">
            <slot name="title"></slot>
        </div>
        <div class="content">
            <slot class="content"></slot>
        </div>
        <div class="buttons">
            <slot name="buttons"></slot>
        </div>     
    </div>
</template>

<style lang="scss" scoped>
.modal__template {
    display: flex;
    flex-direction: column;
    box-shadow: 0px 8px 8px 0px rgba(30, 60, 80, 0.2);
    .title {
        background: linear-gradient(45deg, #f3f3f3,#ececec);
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        padding: 5px 20px;
    }  
    .content {
        display: flex;
        flex-direction: column;
        background: #fff;
        padding: 30px;
    }
    .buttons {
        display: flex;
        background: linear-gradient(45deg, #f3f3f3,#ececec);
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        overflow: hidden;
    }
}
</style>