import { createApp } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from '@/router/index'
import { key, store } from '@/store'
import App from './App.vue'
import contextmenuDirective from '@/common/directive/contextmenu'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/style/element-plus.styl'

if (import.meta.env.MODE === 'production') {
  // @ts-ignore
  import('@/utils/register-sw.ts')
}

const app = createApp(App)
app.directive('contextmenu', contextmenuDirective)

// import element-plus icons
// eslint-disable-next-line no-restricted-syntax
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// @ts-ignore
app.use(router).use(store, key).mount('#app')
