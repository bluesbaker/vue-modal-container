import { h, reactive, shallowReactive } from "vue"
import ModalContainer from "../components/ModalContainer.vue"
import scroll from "js-scroll-lock"

function install(app, options) {
  // just in case ;)
  if(install.installed) return;
  install.installed = true;

  // setup or default plugin options
  let pluginOptions = {
    propertyName: "$modal",           // this.$modal
    componentName: "ModalContainer",  // <modal-container .../>
    globalComponent: true,            // ...as a global component
    ...options
  };

  // ModalContainer reactive options
  let containerOptions = reactive({
    isShow: false,
    close: () => {
      containerOptions.isShow = false;
      scroll.unlock();
    }
  });

  // Modal* reactive options
  let modalOptions = shallowReactive({
    modal: "div",
    props: {}
  });

  // mixins the app and modal container component
  const appRender = app._component.render;
  app._component.render = (_ctx, _cache) => {
    return h("div", [
      appRender(_ctx, _cache), 
      h(ModalContainer,
        {
          options: containerOptions
        },
        {
          default() {
            return h(modalOptions.modal,
            {
              ...modalOptions.props,
              onOk(payload) {
                if(modalOptions.props.onOk) {
                  modalOptions.props.onOk(payload);
                }
                containerOptions.isShow = false;
                scroll.unlock();
              }
            });
          }
        })
    ]);
  }

  // add the $modal(default) function to the global properties 
  app.config.globalProperties[pluginOptions.propertyName] = (dialogModal, props) => {    
    scroll.lock();   
    modalOptions.modal = dialogModal;
    modalOptions.props = props;
    containerOptions.isShow = true;  
  }

  // (optional) registration the ModalContainer(default) as a global component
  if(pluginOptions.globalComponent) {
    app.component(pluginOptions.componentName, ModalContainer);
  }
}

let globalVue = null;
if (typeof window !== "undefined") {
  globalVue = window.Vue;
} 
else if (typeof global !== "undefined") {
  globalVue = global.Vue;
}
if (globalVue) {
  globalVue.use({install});
}

const component = ModalContainer;
component.install = install;
export default component;