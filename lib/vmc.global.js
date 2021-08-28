(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue'), require('js-scroll-lock')) :
    typeof define === 'function' && define.amd ? define(['vue', 'js-scroll-lock'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VueModalContainer = factory(global.Vue, global.scroll));
}(this, (function (vue, scroll) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var scroll__default = /*#__PURE__*/_interopDefaultLegacy(scroll);

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
          vue.withDirectives(vue.createElementVNode("div", {
            class: "modal-container__template",
            style: vue.normalizeStyle($data.containerClass),
            onClick: _cache[0] || (_cache[0] = (...args) => ($options.handleClose && $options.handleClose(...args))),
            id: "modalContainer"
          }, [
            vue.createElementVNode("div", _hoisted_1, [
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
      let pluginOptions = {
        propertyName: "$modal",           // this.$modal
        componentName: "ModalContainer",  // <modal-container .../>
        globalComponent: true,            // ...as a global component
        ...options
      };

      // ModalContainer reactive options
      let containerOptions = vue.reactive({
        isShow: false,
        close: () => {
          containerOptions.isShow = false;
          scroll__default['default'].unlock();
        }
      });

      // Modal* reactive options
      let modalOptions = vue.shallowReactive({
        modal: "div",
        props: {}
      });

      // mixins the app and modal container component
      const appRender = app._component.render;
      app._component.render = (_ctx, _cache) => {
        return vue.h("div", [
          appRender(_ctx, _cache), 
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
                    scroll__default['default'].unlock();
                  }
                });
              }
            })
        ]);
      };

      // add the $modal(default) function to the global properties 
      app.config.globalProperties[pluginOptions.propertyName] = (dialogModal, props) => {    
        scroll__default['default'].lock();   
        modalOptions.modal = dialogModal;
        modalOptions.props = props;
        containerOptions.isShow = true;  
      };

      // (optional) registration the ModalContainer(default) as a global component
      if(pluginOptions.globalComponent) {
        app.component(pluginOptions.componentName, script);
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

    const component = script;
    component.install = install;

    return component;

})));
//# sourceMappingURL=vmc.global.js.map
