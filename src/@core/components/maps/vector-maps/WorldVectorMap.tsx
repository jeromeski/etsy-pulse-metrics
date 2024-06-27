import 'jsvectormap'
import 'jsvectormap/dist/maps/world.js'
import 'jsvectormap/dist/css/jsvectormap.css'

import BaseVectorMap from './BaseVectorMap'

interface WorldVectorMapProps {
  width?: string
  height?: string
  options?: any
}

const WorldVectorMap = ({ width, height, options }: WorldVectorMapProps) => {
  return <BaseVectorMap width={width} height={height} options={options} type='world' />
}

export default WorldVectorMap
