import { format } from 'date-fns'

interface ControlledChartAxisTickType {
  x?: number
  y?: number
  payload?: {
    value: string
  }
  rotation?: number
  isSmallScreen?: boolean
}

const ControlledChartAxisTick = ({
  x = 0,
  y = 0,
  payload = { value: '' },
  rotation = 0,
  isSmallScreen,
}: ControlledChartAxisTickType) => {
  const formattedDate = format(new Date(payload.value), 'MMM d')
  // Determine the rotation angle (e.g., 270 degrees for vertical labels)
  const cx = x
  const cy = y  

  return (
    <text
      style={{ fontSize: isSmallScreen ? '10px' : '12px' }}
      x={cx}
      y={cy}
      transform={`rotate(${rotation} ${cx} ${cy} )`}
      textAnchor='middle'
    >
      {formattedDate}
    </text>
  )
}

export default ControlledChartAxisTick
