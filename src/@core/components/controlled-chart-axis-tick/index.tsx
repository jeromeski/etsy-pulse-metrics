import withUseMediaQuery from 'src/@core/components/with-use-media-query'

interface ControlledChartAxisTickType {
  x?: number
  y?: number
  payload?: {
    value: string
  }
  rotation?: number
  isXtraSmallScreen?: boolean
  isSmallScreen?: boolean
  isMediumScreen?: boolean
  isTabletScreen?: boolean
  isSmallLaptopScreen?: boolean
  isLaptopScreen?: boolean
  isDesktopScreen?: boolean
}

const ControlledChartAxisTick = ({
  x = 0,
  y = 0,
  payload = { value: '' },
  isXtraSmallScreen,
  rotation = 0,
  isSmallScreen,
  isMediumScreen,
  isTabletScreen,
  isSmallLaptopScreen,
  isLaptopScreen,
  isDesktopScreen
}: ControlledChartAxisTickType) => {
  // Determine the rotation angle (e.g., 270 degrees for vertical labels)
  const cx = x
  const cy = y

  return (
    <text
      style={{ fontSize: isXtraSmallScreen ? '.8rem' : isSmallScreen ? '.8rem' : '1rem' }}
      x={cx}
      y={cy}
      transform={`rotate(${rotation} ${cx} ${cy} )`}
      textAnchor='middle'
    >
      {payload.value}
    </text>
  )
}

export default withUseMediaQuery(ControlledChartAxisTick)
