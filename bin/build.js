export default async () => {
  console.log('=======> Start Build')
  await require('./clean')()
  await require('./copy')()
  await require('./bundle')()
  console.log('Build End <=======')
}

