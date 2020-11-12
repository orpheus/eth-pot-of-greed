import React from 'react'
import { CircularProgress } from '@material-ui/core'

const Loading = ({ style }) => {
  return <div style={{ display: 'grid', ...style }}>
    <CircularProgress style={{ margin: 'auto' }} />
  </div>
}

Loading.defaultProps = {
  style: {
    height: '100%'
  }
}

export default Loading
