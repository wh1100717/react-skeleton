import del from 'del'
import fs from './lib/fs'

export default async () => {
  console.log('Clean Files')
  await del(['.tmp', 'build/*', '!build/.git'], {dot: true})
  await fs.makeDir('build/public')
}
