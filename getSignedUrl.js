const cfsign = require('aws-cloudfront-sign')
const fs = require('fs')

const SIGNED_URL_PUBLIC_KEY_ID = 'K3RC7OO5HU8M9U'
const SIGNED_URL_PRIVATE_KEY = fs.readFileSync('./private_key.pem')
const CLOUDFRONT_DOMAIN = 'd2m1ftnms9v6gf.cloudfront.net'
const SIGNED_URL_EXPIRY_MILLISECONDS = 7 * 24 * 60 * 60 * 1000

async function getSignedUrl(filename) {
  const url = `https://${CLOUDFRONT_DOMAIN}/${filename}`

  const signingParams = {
    keypairId: SIGNED_URL_PUBLIC_KEY_ID,
    privateKeyString: SIGNED_URL_PRIVATE_KEY,
    expireTime: Date.now() + SIGNED_URL_EXPIRY_MILLISECONDS,
  }
  
  return cfsign.getSignedUrl(url, signingParams)
}

module.exports = getSignedUrl

// If this JS file gets run from the command line (like `node getSignedUrl`) then call the function and see what we get.
if (require.main === module) {
  getSignedUrl('private-video.mp4')
  .then(result => console.log(result))
  .catch(err => console.error(err))
}