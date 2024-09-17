import { resolve } from 'node:path'
import type { ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import { vitePluginForArco } from '@arco-plugins/vite-vue'
import { viteMockServe } from 'vite-plugin-mock'
import requireTransform from 'vite-plugin-require-transform'

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: './',
    plugins: [
      vue({
        // 默认开启响应性语法糖
        reactivityTransform: true,
      }),
      requireTransform({
        fileRegex: /.ts$|.tsx$|.vue$/,
      }),
      AutoImport({
        include: [
          /\.[jt]sx/,
          /\.vue$/,
          /\.vue\?vue/, // vue
          /\.md/,
        ],
        resolvers: [ArcoResolver()],
        // 调整自动引入的文件位置
        dts: 'src/type/auto-import.d.ts',
        // 解决自动引入eslint报错问题 需要在eslintrc的extend选项中引入
        eslintrc: {
          enabled: true,
          // 配置文件的位置
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
      }),
      Components({
        resolvers: [
          ArcoResolver({
            sideEffect: true,
          }),
        ],
        dts: 'src/type/components.d.ts',
      }),
      vitePluginForArco({
        style: 'css',
        // theme: '@arco-design/vue-webs',
      }),
      // 配置mock
      viteMockServe({
        mockPath: '/mock',
        localEnabled: true,
      }),
    ],
    server: {
      https: false, // 是否开启 https
      port: 3100, // 端口号
      host: '0.0.0.0', // 监听所有地址
      cors: true, // 允许跨域
      proxy: { // 自定义代理规则
        // 使用 proxy 实例
        '/api': {
          target: env.VITE_APP_API_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '/cpns': resolve(__dirname, 'src/components'),
      },
      extensions: ['.js', '.json', '.ts', '.vue'], // 使用路径别名时想要省略的后缀名，可以自己 增减
    },
    build: {
      // 设置最终构建的浏览器兼容目标
      target: 'es2015',
      // 构建后是否生成 source map 文件
      sourcemap: false,
      //  chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 2000,
      // 启用/禁用 gzip 压缩大小报告
      reportCompressedSize: false,
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true @import (reference) "${resolve('src/style/variables.less')}"`,
          },
          math: 'strict',
          javascriptEnabled: true,
        },
      },
    },
  }
})
