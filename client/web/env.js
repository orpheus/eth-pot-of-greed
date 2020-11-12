const dotenv = require('dotenv')
const fs = require('fs')

// All runtime environment variables are already set in process.env
// Get any additional configuration from files

// Load anything from local .env
dotenv.config()

// Load Default configs
dotenv.config({ path: 'config/.env.default' })

// Check for an override env file
if (process.env.ENV_OVERRIDE) {
  // Try to load ENV OVERRIDE VARS from web or web/config
  if (fs.existsSync(process.env.ENV_OVERRIDE)) {
    dotenv.config({ path: 'config/.env.dev' })
  } else if (fs.existsSync('config/' + process.env.ENV_OVERRIDE)) {
    dotenv.config({ path: 'config/' + process.env.ENV_OVERRIDE })
  } else {
    console.error(`file not found ${process.env.ENV_OVERRIDE}`)
  }
}

// Check for a main env file
if (process.env.ENV_MAIN) {
  // Try to load ENV MAIN VARS from web or web/config
  if (fs.existsSync(process.env.ENV_MAIN)) {
    dotenv.config({ path: 'config/.env.dev' })
  } else if (fs.existsSync('config/' + process.env.ENV_MAIN)) {
    dotenv.config({ path: 'config/' + process.env.ENV_MAIN })
  } else {
    console.error(`file not found ${process.env.ENV_MAIN}`)
  }
}

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.
// CHANGE "REACT_APP" TO WHATEVER YOUR APP NAME IS DEFINED IN THE env.js FILE (global search #325)
const APP = /^REACT_APP/i

function getClientEnvironment (publicUrl) {
  const raw = Object.keys(process.env)
    .filter(key => APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key]
        return env
      },
      {
        NODE_ENV: process.env.NODE_ENV || 'development',
        PUBLIC_URL: publicUrl,
        CI_COMMIT_SHORT_SHA: process.env.CI_COMMIT_SHORT_SHA
      }
    )
  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key])
      return env
    }, {})
  }

  return { raw, stringified }
}

module.exports = getClientEnvironment
