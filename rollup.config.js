import commonjs from "@rollup/plugin-commonjs"
import vuePlugin from "rollup-plugin-vue"
import scss from "rollup-plugin-scss"
import pkg from "./package.json"

export default {
  input: "src/plugins/vue-modal-container.js",
  output: [
    {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
        globals: {
          vue: "Vue",
        }
    },
    {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
        globals: {
          vue: "Vue",
        }
    },
    {
        file: pkg.unpkg,
        format: "umd",
        name: "VueModalContainer",
        sourcemap: true,
        globals: {
          vue: "Vue",
        }
    }
  ],
  plugins: [
    scss(),
    vuePlugin({
      css: true,
      compileTemplate: true,
    }),
    commonjs(),
  ],
  external: ["vue"]
}
