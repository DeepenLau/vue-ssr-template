import { fetchTitle } from '../api'

export default {
  namespaced: true,
  // 重要信息：state 必须是一个函数，
  // 因此可以创建多个实例化该模块
  state: () => ({
    title: ''
  }),
  actions: {
    fetchTitle ({ commit }, title) {
      // `store.dispatch()` 会返回 Promise，
      // 以便我们能够知道数据在何时更新
      return fetchTitle(title).then(data => {
        commit('setTitle', data)
      })
    }
  },
  mutations: {
    setTitle (state, data) {
      state.title = data
    }
  }
}
