import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query-devtools'
import LazyLoad from 'Components/util/LazyLoad'

const Home = LazyLoad(() => import('./pages/Home'))

const Routes = () => {
  return <div id='app-container' style={{ height: '100%' }}>
    <Switch>
      <Route exact path='/' component={Home} />
    </Switch>
    {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools initialIsOpen={false} />}
  </div>
}

export default Routes
