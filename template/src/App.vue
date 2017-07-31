<template>
  <div id="app">
    <router-link :to="{ name: 'home' }">Go to home</router-link>
    <router-link :to="{ name: 'foo', params: { id: 1 } }">Go to foo</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
