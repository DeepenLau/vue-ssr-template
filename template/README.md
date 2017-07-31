# vue-ssr-template

> 一个根据官方文档配置的的 vue ssr 模板

## 坑
- 组件缓存，需要对每个组件的确定是否缓存，否则进入服务器流量过大会跪的，也就是需要投入对控制缓存的成本
- 慎用第三方库，主要表现为在 node 黄金下没有 window、document 等对象，需要自己封装方法，暴露统一的 api，例如 axios ，对客户端以及 node 暴露了相同的 api
- 对于 client-only 的 vue 应用, 完全改写成适合 ssr 和 client-only，大型应用兼容复杂度也高(尤其 dom 操作多的)，
- 对于 vue ssr 应用，不太适合强 dom 操作的的应用，因为 node 环境和客户端环境的全局对象 api 不同（个人看法）
- 手动配置 ssr ，需要处理的细节多，看着文档配都会头疼