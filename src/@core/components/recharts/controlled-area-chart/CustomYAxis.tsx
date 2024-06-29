// **Vendor Imports
import { YAxis as RechartsYAxis, YAxisProps } from 'recharts'

interface CustomYAxisProps extends YAxisProps {
  tickCount?: number
  orientation: 'left' | 'right'
  style?: React.CSSProperties
}

const CustomYAxis: React.FC<CustomYAxisProps> = ({ tickCount = 5, orientation = 'left', style = {}, ...rest }) => {
  return <RechartsYAxis tickCount={tickCount} orientation={orientation} style={style} {...rest} />
}

export default CustomYAxis
