import Loadable from 'react-loadable'
import Loading from './Loading'

export default function LazyLoad (loader, height) {
  return Loadable({
    loader,
    loading: () => Loading({ style: { height } })
  })
}
