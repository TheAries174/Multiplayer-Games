import {useState, useEffect} from "react"

//Custom Hook to get Component Dimension
export const useContainerDimensions = myRef => {
  const getDimensions = () => ({
    width: myRef.current.offsetWidth, //in px
    height: myRef.current.offsetHeight //in px
  })

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions())
    }

    if (myRef.current) {
      setDimensions(getDimensions())
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [myRef])

  return dimensions;
};