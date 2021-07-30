import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import vuePlugin from 'rollup-plugin-vue'
import scss from 'rollup-plugin-scss'
import pkg from './package.json'

export default {
  input: 'src/plugins/vue-modal-container.js',
  output: [
    {
        file: pkg.module,
        format: 'esm',
        sourcemap: true
    },
    {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true
    },
    {
        file: pkg.unpkg,
        format: 'umd',
        name: 'VueModalContainer',
        sourcemap: true,
        globals: {
          vue: 'Vue',
        }
    }
  ],
  plugins: [
    vuePlugin(),
    scss(),
    nodeResolve(),
    commonjs(),
  ],
  external: ['vue']
}
