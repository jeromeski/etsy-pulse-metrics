import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'

interface ControlledChartAxisTickType {
  x?: number
  y?: number
  payload?: {
    value: string
  }
  rotation?: number
}

const ControlledChartAxisTick = ({
  x = 0,
  y = 0,
  payload = { value: '' },
  rotation = 0
}: ControlledChartAxisTickType) => {
  const { isMobileXs, isMobileS, isMobileM, isMobileL, isTablet, isLaptop, isLaptopL, isDesktop } =
    useDeviceSizesMediaQuery()

  // Determine the rotation angle (e.g., 270 degrees for vertical labels)
  const cx = x
  const cy = y

  return (
    <text
      style={{ fontSize: isMobileXs ? '.8rem' : isMobileS ? '.8rem' : '1rem' }}
      x={cx}
      y={cy}
      transform={`rotate(${rotation} ${cx} ${cy} )`}
      textAnchor='middle'
    >
      {payload.value}
    </text>
  )
}

export default ControlledChartAxisTick
