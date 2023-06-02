
import { resolve } from 'node:path'
import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  return {
    build: {
      lib: {
        entry: resolve(__dirname, 'src/main.ts'),
        name: 'import-repro',
        fileName: 'import-repro',
        formats: ['es']
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ['vue'],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            vue: 'Vue'
          },
        }
      }
    },
    plugins: [
      vue(),
      Components({
        dts: true,
        resolvers: [
          (componentName) => {
            if (componentName.match(/^B[A-Z]/))
              return { componentName, from: './src/components' }
          },
        ]
      }),
      AutoImport({
        imports: ['vue', {
          'lodash-es': [
            // default imports
            ['default', '_'], // import { default as axios } from 'axios',
          ]
        }],
        dts: true,
        vueTemplate: true
      }),
      dts({
        insertTypesEntry: true
      }),
    ],
    resolve: {
      alias: [
        { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
        { find: '@assets', replacement: fileURLToPath(new URL('./src/assets', import.meta.url)) }
      ]
    }
  }
})
