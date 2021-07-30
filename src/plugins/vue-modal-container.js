import { createApp, h } from "vue"
import ModalContainer from "../components/ModalContainer.vue"

export default {
    install: (app, options = {}) => {
      // setup or default options
      const defaultOptions = {
        propertyName: options.propertyName ?? "$modal",           // -> this.$modal
        componentName: options.componentName ?? "ModalContainer"  // -> <modal-container .../>
      }

      // add ModalContainer(default) to the global components
      app.component(defaultOptions.componentName, ModalContainer);

      // create a root container
      const divContainer = document.createElement("div");
      document.body.appendChild(divContainer);

      // add $modal(default) function to the global properties 
      app.config.globalProperties[defaultOptions.propertyName] = (dialogModal, props) => {
        // 1. create "App" and render ModalContainer with dialogModal component...
        const modalContainer = createApp({
          render() {
            return h(
              ModalContainer,
              {
                close: () => modalContainer.unmount()
              },
              {
                default: () => h(dialogModal, 
                {
                  ...props,
                  onOk: (payload) => {
                    if(props.onOk) {
                      props.onOk(payload)
                    }
                    modalContainer.unmount();
                  }
                })
              }
            );
          }
        });
        // 2. and mount to the root container
        modalContainer.mount(divContainer);
      }
    }
  }