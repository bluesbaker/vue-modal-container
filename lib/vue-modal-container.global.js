(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
    typeof define === 'function' && define.amd ? define(['vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VueModalContainer = factory(global.Vue));
}(this, (function (vue) { 'use strict';

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

    const _withId = /*#__PURE__*/vue.withScopeId("data-v-2e4d6884");

    vue.pushScopeId("data-v-2e4d6884");
    const _hoisted_1 = { class: "modal" };
    vue.popScopeId();

    const render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
      return (vue.openBlock(), vue.createBlock(vue.Transition, {
        name: "fade",
        mode: "out-in"
      }, {
        default: _withId(() => [
          vue.withDirectives(vue.createVNode("div", {
            class: "modal-container__template",
            onClick: _cache[1] || (_cache[1] = (...args) => ($options.handleClose && $options.handleClose(...args))),
            id: "modalContainer"
          }, [
            vue.createVNode("div", _hoisted_1, [
              vue.renderSlot(_ctx.$slots, "default")
            ])
          ], 512 /* NEED_PATCH */), [
            [vue.vShow, $data.isActive]
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
            const modalContainer = vue.createApp({
              render() {
                return vue.h(
                  script,
                  {
                    close: () => modalContainer.unmount()
                  },
                  {
                    default: () => vue.h(dialogModal, 
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

    return vueModalContainer;

})));
//# sourceMappingURL=vue-modal-container.global.js.map
