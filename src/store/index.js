// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

import foo from './modules/foo'
import home from './modules/home'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export function createStore () {
  return new Vuex.Store({
    actions,
    getters,
    modules: {
      foo,
      home
    },
    strict: debug
    // plugins: debug ? [createLogger()] : []
  })
}
