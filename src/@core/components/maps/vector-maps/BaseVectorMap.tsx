import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'

interface BaseVectorMapProps {
  width?: string
  height?: string
  options?: any
  type: string
}

const BaseVectorMap = ({ width, height, options, type }: BaseVectorMapProps) => {
  const selectorId = type + new Date().getTime()
  const [map, setMap] = useState()

  useEffect(() => {
    if (!map) {
      const map = new (window as any)['jsVectorMap']({
        selector: '#' + selectorId,
        map: type,
        ...options
      })
      setMap(map)
    }
  }, [selectorId, map, options, type])
  return (
    <>
      <Card sx={{ height: '100%', p: 5 }}>
        <div id={selectorId} style={{ width: width, height: height }}></div>
      </Card>
    </>
  )
}

export default BaseVectorMap
