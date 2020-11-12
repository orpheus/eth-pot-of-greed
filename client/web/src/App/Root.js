import React, { Suspense } from 'react'
import { createBrowserHistory } from 'history'
import { Router } from 'react-router-dom'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'

import Routes from './Routes'
import AppThemeProvider from '../components/providers/AppThemeProvider'
import DrizzleProvider from '../components/providers/DrizzleProvider'

const queryCache = new QueryCache()
const history = createBrowserHistory()
// export routes, theme provider, redux provider etc.
const Root = () => {
  return <ReactQueryCacheProvider queryCache={queryCache}>
    <AppThemeProvider>
      <Suspense fallback={null}>
        <DrizzleProvider>
          <Router history={history}>
            <Routes />
          </Router>
        </DrizzleProvider>
      </Suspense>
    </AppThemeProvider>
  </ReactQueryCacheProvider>
}

export default Root
