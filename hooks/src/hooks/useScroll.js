import { useEffect, useState } from "react"

const useScroll = (domRef) => {
  const [pos, setPos] = useState([0,0])
  useEffect(() => {
    function onScroll(e) {
      setPos([domRef.current.scrollLeft, domRef.current.scrollTop])
    }
    domRef.current.addEventListener('scroll', onScroll)
    return () => {
      domRef.current.removeListener('scroll', onScroll)
    }
  }, [])
  
  return pos
}

export default useScroll
