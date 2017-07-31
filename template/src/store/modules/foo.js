import Vue from 'vue'
import { fetchItem } from '../api'

export default {
  namespaced: true,
  // 重要信息：state 必须是一个函数，
  // 因此可以创建多个实例化该模块
  state: () => ({
    items: {}
  }),
  actions: {
    fetchItem ({ commit }, id) {
      // `store.dispatch()` 会返回 Promise，
      // 以便我们能够知道数据在何时更新
      return fetchItem(id).then(item => {
        commit('setItem', { id, item })
      })
    }
  },
  mutations: {
    setItem (state, { id, item }) {
      Vue.set(state.items, id, item)
    }
  }
}
