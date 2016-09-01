const path = require('path')
const micro = require('micro')
const config = require('./go-config.js')

module.exports = start

function start (configLocation) {
  const configPath = path.join(__dirname, configLocation)

  config(configPath).then(cfg => {
    const { routes, port } = cfg
    const router = createRouter(routes)
    micro((req, res) => router(req, res)).listen(port)
  })
}

function createRouter (routes) {
  return (req, res) => {
    const key = req.url.replace('/', '') || '/'
    const signpost = routes[key] || routes['?'] || 'Oops'

    if (isURL(signpost)) {
      res.writeHead(301, { 'Location': signpost })
    } else {
      const httpCode = routes[key] ? 200 : 404
      micro.send(res, httpCode, signpost)
    }
  }
}

function isURL (text) {
  return /\w{2,6}:\/\/\w/.test(text)
}
