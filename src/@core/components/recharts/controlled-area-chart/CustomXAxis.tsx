// **Vendor Imports
import { XAxis as RechartsXAxis, XAxisProps } from 'recharts'
// ** Custom Component Imports
import ControlledChartAxisTick from 'src/@core/components/recharts/controlled-chart-axis-tick'

interface CustomXAxisProps extends XAxisProps {
  dataKey?: string
  reversed?: boolean
  tickCount?: number
  tick?: (props: any) => JSX.Element
  style?: React.CSSProperties
}

const CustomXAxis: React.FC<CustomXAxisProps> = ({
  dataKey = 'date',
  reversed = false,
  tickCount = 5,
  tick = (props: any) => <ControlledChartAxisTick x={props.x} y={props.y} payload={props.payload} rotation={-45} />,
  style = {},
  ...rest
}) => {
  return (
    <RechartsXAxis dataKey={dataKey} reversed={reversed} tickCount={tickCount} tick={tick} style={style} {...rest} />
  )
}

export default CustomXAxis
