import { useContext } from 'react'
import { viewportContext } from '../providers/ViewportProvider'

const useViewport = () => {
  const { width, height } = useContext(viewportContext)
  return { width, height }
}

export default useViewport
