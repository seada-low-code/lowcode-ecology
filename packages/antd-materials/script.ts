import { uploadCdn } from '../../scripts/cdn'
import pkg from './package.json'

const pckName = `${pkg.name.replace('@seada/', '')}@${pkg.version}`

uploadCdn('./build', pckName).then((cdnUrls) => {
  // eslint-disable-next-line no-console
  console.log(cdnUrls)
})
