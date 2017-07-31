import Vue from 'vue'
import Router from 'vue-router'

const home = r => require.ensure([], () => r(require('../views/home.vue')), 'home')
const foo = r => require.ensure([], () => r(require('../views/foo.vue')), 'foo')

Vue.use(Router)

export function createRouter () {
  const router = new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'home',
        // component: () => import('../views/home.vue')
        component: home
      },
      {
        path: '/foo/:id',
        name: 'foo',
        // component: () => import('../views/foo.vue')
        component: foo
      }
    ]
  })
  return router
}
