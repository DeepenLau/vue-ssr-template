<template>
  <div id="foo">
    foo {{ msg }}<br>
    {{ item }}
  </div>
</template>

<script>
// 在这里导入模块，而不是在 `store/index.js` 中
import fooStoreModule from '../store/modules/foo'

export default {
  name: 'foo',
  data() {
    return {
      msg: '这个是 foo 的页面'
    }
  },
  title() {
    return this.item
  },
  asyncData({ store, route }) {
    store.registerModule('foo', fooStoreModule)
    return store.dispatch('foo/fetchItem', route.params.id)
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    item() {
      return this.$store.state.foo.items[this.$route.params.id]
    }
  },
  // 重要信息：当多次访问路由时，
  // 避免在客户端重复注册模块。
  destroyed() {
    this.$store.unregisterModule('foo')
  }
}
</script>
