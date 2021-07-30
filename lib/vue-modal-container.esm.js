import { pushScopeId, popScopeId, openBlock, createBlock, Transition, withDirectives, createVNode, renderSlot, vShow, withScopeId, createApp, h } from 'vue';

var script = {
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
                isActive.value = false;
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
};

const _withId = /*#__PURE__*/withScopeId("data-v-2e4d6884");

pushScopeId("data-v-2e4d6884");
const _hoisted_1 = { class: "modal" };
popScopeId();

const render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  return (openBlock(), createBlock(Transition, {
    name: "fade",
    mode: "out-in"
  }, {
    default: _withId(() => [
      withDirectives(createVNode("div", {
        class: "modal-container__template",
        onClick: _cache[1] || (_cache[1] = (...args) => ($options.handleClose && $options.handleClose(...args))),
        id: "modalContainer"
      }, [
        createVNode("div", _hoisted_1, [
          renderSlot(_ctx.$slots, "default")
        ])
      ], 512 /* NEED_PATCH */), [
        [vShow, $data.isActive]
      ])
    ]),
    _: 3 /* FORWARDED */
  }))
});

script.render = render;
script.__scopeId = "data-v-2e4d6884";
script.__file = "src/components/ModalContainer.vue";

var vueModalContainer = {
    install: (app, options = {}) => {
      // setup or default options
      const defaultOptions = {
        propertyName: options.propertyName ?? "$modal",           // -> this.$modal
        componentName: options.componentName ?? "ModalContainer"  // -> <modal-container .../>
      };

      // add ModalContainer(default) to the global components
      app.component(defaultOptions.componentName, script);

      // create a root container
      const divContainer = document.createElement("div");
      document.body.appendChild(divContainer);

      // add $modal(default) function to the global properties 
      app.config.globalProperties[defaultOptions.propertyName] = (dialogModal, props) => {
        // 1. create "App" and render ModalContainer with dialogModal component...
        const modalContainer = createApp({
          render() {
            return h(
              script,
              {
                close: () => modalContainer.unmount()
              },
              {
                default: () => h(dialogModal, 
                {
                  ...props,
                  onOk: (payload) => {
                    if(props.onOk) {
                      props.onOk(payload);
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
      };
    }
  };

export { vueModalContainer as default };
//# sourceMappingURL=vue-modal-container.esm.js.map
