const withPWA = require("next-pwa")
const runtimeCaching = require("next-pwa/cache")

const isProd = process.env.NEXT_PUBLIC_ENV === 'production'
const config = {
  pwa: {
    dest: "public",
    runtimeCaching,
    disable: isProd ? false : true,
  }
}

module.exports = withPWA(config)