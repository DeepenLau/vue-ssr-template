const express = require('express')
const fs = require('fs')
const path = require('path')
const compression = require('compression')
const LRU = require('lru-cache')
// const favicon = require('serve-favicon')
const resolve = file => path.resolve(__dirname, file)

const { createBundleRenderer } = require('vue-server-renderer')

const app = express()

const template = fs.readFileSync(resolve('./src/index.template.html'), 'utf-8')
const serverBundle = require('./www/vue-ssr-server-bundle.json')
const clientManifest = require('./www/vue-ssr-client-manifest.json')
const isProd = process.env.NODE_ENV === 'production'

const renderer = createBundleRenderer(serverBundle, {
  basedir: resolve('./www'),
  runInNewContext: false, // 推荐
  template, // （可选）页面模板
  clientManifest, // （可选）客户端构建 manifest
  cache: LRU({
    max: 1000,
    maxAge: 1000 * 60 * 15
  })
})

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})
app.use(compression({ threshold: 0 }))
app.use('/www', serve('./www', true))

const microCache = LRU({
  max: 100,
  maxAge: 1000 // 重要提示：条目在 1 秒后过期。
})

const isCacheable = req => {
  // 实现逻辑为，检查请求是否是用户特定(user-specific)。
  // 只有非用户特定(non-user-specific)页面才会缓存
  return false
}

// app.use(favicon('./src/favicon.ico'))
// 在服务器处理函数中……
app.get('*', (req, res) => {
  // res.setHeader("Content-Type", "text/html")

  const cacheable = isCacheable(req)
  if (cacheable) {
    const hit = microCache.get(req.url)
    if (hit) {
      return res.end(hit)
    }
  }

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if(err.code === 404) {
      res.status(404).end('404 | Page Not Found')
    } else {
      // Render Error Page or Redirect
      res.status(500).end('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }

  const context = { title: '默认title', url: req.url }

  // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦！
  renderer.renderToString(context, (err, html) => {
    console.log(1)
    if (err) handleError(err)
    // 处理异常……
    console.log(222)
    res.end(html)
  })


  // 流式渲染
  // const stream = renderer.renderToStream()

  // let html = ''
  // stream.on('data', data => {
  //   html += data.toString()
  //   res.end(html)
  // })
  // stream.on('end', () => {
  //   console.log(html) // 渲染完成
  //   res.end(html)
  // })
  // stream.on('error', err => {
  //   // handle error...
  //   handleError(err)
  // })
})

app.listen(3000)
