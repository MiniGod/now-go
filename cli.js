const config = require('./go-config.js')
const server = require('./index.js')

const argv = require('minimist')(process.argv.slice(2), {
  alias: {
    'c': 'config'
  }
})

config(argv.config).then(cfg => {
  const { routes, port } = cfg
  server(routes).listen(port)
})
