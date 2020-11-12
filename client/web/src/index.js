import React from 'react'
import ReactDOM from 'react-dom'
import initTranslation from './i18n'
import Root from './App/Root'

initTranslation()
ReactDOM.render(
  <Root />,
  document.getElementById('root')
)
