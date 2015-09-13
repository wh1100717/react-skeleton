import webpack from 'webpack'
import config from './webpack.config'

export default async () => new Promise((resolve, reject) => {
  console.log('Generate App and Server bundle files')
  const bundler = webpack(config)
  let bundlerRunCount = 0

  function bundle(err, stats) {
    if (err) {
      return reject(err)
    }

    console.log(stats.toString(config[0].stats))

    if (++bundlerRunCount === (global.watch ? config.length : 1)) {
      return resolve()
    }
  }

  if (global.WATCH) {
    bundler.watch(200, bundle)
  } else {
    bundler.run(bundle)
  }
})
