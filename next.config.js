const path = require('path')

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features
const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/react',
  '@fullcalendar/daygrid',
  '@fullcalendar/list',
  '@fullcalendar/timegrid',
  '@mui/x-charts'
])

module.exports = withTM({
  trailingSlash: true,
  reactStrictMode: false,
  experimental: {
    esmExternals: false,
    jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    consoleUrl: process.env.CONSOLE_URL,
    websiteBuilderUrl: process.env.WEBSITEBUILDER_URL,
    backendUrl: process.env.BACKEND_URL,
    appVersion: process.env.APP_VERSION,
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    bookingUrl: process.env.BOOKING_URL,
    mediaEditorUrl: process.env.MEDIA_EDITOR_URL,
    googleAuthClientId: process.env.GOOGLE_AUTH_CLIENT_ID,
    splitIOKey: process.env.SPLIT_IO_KEY,
    facebookAppId: process.env.FACEBOOK_APP_ID,
    facebookConfigId: process.env.FACEBOOK_CONFIG_ID,
    unsplashClientID: process.env.UNSPLASH_CLIENT_ID,
    region: process.env.AWS_REGION,
    OrganizationId: process.env.ORGANIZATION_ID,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    googleAnalyticsMeasurementId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }
    return config
  },
  eslint: {
    ignoreDuringBuilds: true
  }
})
