<template>
  <div class="hello">
    首页
    <h1>{{ msg }}</h1>
    <template v-for="item in arr" :key="item.id">
      <bar :item="item"></bar>
    </template>

    {{ item }}
  </div>
</template>

<script>
import homeStoreModule from '../store/modules/home'
import bar from '@/components/bar.vue'

export default {
  name: 'home',
  components: {
    bar
  },
  title () {
    return this.title
  },
  asyncData({ store, route }) {
    store.registerModule('home', homeStoreModule)
    return store.dispatch('home/fetchTitle', 'home title 啊啊')
  },
  data () {
    return {
      msg: '老子是 vue ssr',
      arr: [
        { id: 1, value: 1 },
        { id: 2, value: 2 }
      ]
    }
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    title() {
      return this.$store.state.home.title
    }
  },
  mounted () {
    console.log('mounted')
  },
  // 重要信息：当多次访问路由时，
  // 避免在客户端重复注册模块。
  destroyed() {
    this.$store.unregisterModule('home')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
