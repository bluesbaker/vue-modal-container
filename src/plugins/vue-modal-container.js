import { createApp, h, reactive, shallowReactive } from "vue"
import ModalContainer from "../components/ModalContainer.vue"

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
  let containerOptions = reactive({
    isShow: false,
    close: () => {
      containerOptions.isShow = false;
    }
  });

  // Modal* reactive options
  let modalOptions = shallowReactive({
    modal: "div",
    props: {}
  });

  // 0. create a root container
  const divContainer = document.createElement("div");
  document.body.appendChild(divContainer);

  // 1. create "App" and render ModalContainer with ~modal component...
  const modalContainer = createApp(
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
  }

  // (Optional) registration the ModalContainer(default) as a global component
  if(pluginOptions.globalComponent) {
    app.component(pluginOptions.componentName, ModalContainer);
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

const component = ModalContainer;
component.install = install;
export default component;