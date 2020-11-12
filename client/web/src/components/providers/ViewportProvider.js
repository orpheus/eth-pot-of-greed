import React from 'react'

export const viewportContext = React.createContext({})

const DEBOUNCE_DELAY = 250

const ViewportProvider = ({ children }) => {
  const isClient = typeof window === 'object'

  function getSize () {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    }
  }

  const [windowSize, setWindowSize] = React.useState(getSize)

  React.useEffect(() => {
    if (!isClient) {
      return false
    }
    let timeout = false

    function resizeWindow () {
      setWindowSize(getSize())
    }

    function handleResize () {
      clearTimeout(timeout)
      timeout = setTimeout(resizeWindow, DEBOUNCE_DELAY)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return (
    <viewportContext.Provider value={windowSize}>
      {children}
    </viewportContext.Provider>
  )
}

export default ViewportProvider
