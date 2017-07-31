// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'
import titleMixin from './util/title'

Vue.mixin(titleMixin)
Vue.config.devtools = true

Vue.config.productionTip = false

export function createApp () {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    // 根实例简单的渲染应用程序组件。
    store,
    router,
    render: h => h(App)
  })
  return { app, router, store }
}

