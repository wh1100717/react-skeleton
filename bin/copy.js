import path from 'path'
import replace from 'replace'
import copy from './lib/copy'
import watch from './lib/watch'

export default async () => {
  console.log('Copy Files to Build Directory')
  await Promise.all([
    // Static files
    copy('src/public', 'build/public'),

    // Files with content (e.g. *.md files)
    copy('src/server/content', 'build/content'),

    // Website and email templates
    copy('src/server/templates', 'build/templates'),

    copy('package.json', 'build/package.json')
  ])

  replace({
    regex: '"start".*',
    replacement: '"start": "node server.js"',
    paths: ['build/package.json'],
    recursive: false,
    silent: false
  })

  if (global.WATCH) {
    const watcher = await watch('src/server/content/**/*.*')
    watcher.on('changed', async (file) => {
      file = file.substr(path.join(__dirname, '../src/server/content/').length)
      await copy(`src/server/content/${file}`, `build/content/${file}`)
    })
  }
}
