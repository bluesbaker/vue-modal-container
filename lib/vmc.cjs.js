'use strict';

var vue = require('vue');

var script = {
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
};

const _hoisted_1 = { class: "modal" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock(vue.Transition, {
    name: "fade",
    mode: "out-in"
  }, {
    default: vue.withCtx(() => [
      vue.withDirectives(vue.createVNode("div", {
        class: "modal-container__template",
        style: $data.containerClass,
        onClick: _cache[1] || (_cache[1] = (...args) => ($options.handleClose && $options.handleClose(...args))),
        id: "modalContainer"
      }, [
        vue.createVNode("div", _hoisted_1, [
          vue.renderSlot(_ctx.$slots, "default")
        ])
      ], 4 /* STYLE */), [
        [vue.vShow, $props.options.isShow]
      ])
    ]),
    _: 3 /* FORWARDED */
  }))
}

script.render = render;
script.__file = "src/components/ModalContainer.vue";

function install(app, options) {
  // just in case ;)
  if(install.installed) return;
  install.installed = true;

  // setup or default plugin options
  let pluginOptions = {...{
    propertyName: "$modal",           // this.$modal
    componentName: "ModalContainer",  // <modal-container .../>
    globalComponent: true,            // ...as a global component
  }, ...options};

  // ModalContainer reactive options
  let containerOptions = vue.reactive({
    isShow: false,
    close: () => {
      containerOptions.isShow = false;
    }
  });

  // Modal* reactive options
  let modalOptions = vue.shallowReactive({
    modal: "div",
    props: {}
  });

  // 0. create a root container
  const divContainer = document.createElement("div");
  document.body.appendChild(divContainer);

  // 1. create "App" and render ModalContainer with ~modal component...
  const modalContainer = vue.createApp(
    vue.h(script,
        {
          options: containerOptions
        },
        {
          default() {
            return vue.h(modalOptions.modal,
            {
              ...modalOptions.props,
              onOk(payload) {
                if(modalOptions.props.onOk) {
                  modalOptions.props.onOk(payload);
                }
                containerOptions.isShow = false;
              }
            });
          }
        }
      )       
  );

  // 2. and mount to the root container
  modalContainer.mount(divContainer);

  // Add the $modal(default) function to the global properties 
  app.config.globalProperties[pluginOptions.propertyName] = (dialogModal, props) => {       
    modalOptions.modal = dialogModal;
    modalOptions.props = props;
    containerOptions.isShow = true;  
  };

  // (Optional) registration the ModalContainer(default) as a global component
  if(pluginOptions.globalComponent) {
    app.component(pluginOptions.componentName, script);
  }
}

let globalVue = null;
if (typeof window !== 'undefined') {
  globalVue = window.Vue;
} 
else if (typeof global !== 'undefined') {
  globalVue = global.Vue;
}
if (globalVue) {
  globalVue.use({ install });
}

const component = script;
component.install = install;

module.exports = component;
//# sourceMappingURL=vmc.cjs.js.map
