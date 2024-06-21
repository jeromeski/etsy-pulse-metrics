// ** Mui Imports
import { Box } from '@mui/material'

// ** Third Party Imports
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// ** Custom Component Imports
import ControlledChartAxisTick from 'src/@core/components/controlled-chart-axis-tick'
import ToolTipChart from 'src/@core/components/tool-tip-chart'

// ** Hooks
import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'

interface ControlledAreaChartProps {
  chartData: string[]
  direction: boolean
  dataKeyXaxis: string
  dataKeyArea: string
  stackId: string
  type?: any
  tickCount?: any
  stroke?: string
  fill?: string
  orientation?: 'right' | 'left'
  strokeWidth?: string | number
  reversed?: boolean
}

const ControlledAreaChart: React.FC<ControlledAreaChartProps> = ({
  chartData,
  direction,
  dataKeyXaxis,
  dataKeyArea,
  stackId,
  type,
  tickCount,
  stroke,
  fill,
  orientation,
  strokeWidth,
  reversed,
  ...props
}) => {
  const { isMobileXs, isMobileS, isMobileM, isTablet, isLaptopS } = useDeviceSizesMediaQuery()
  return (
    <Box sx={{ height: '250px', width: '100%' }}>
      <ResponsiveContainer height='100%' width='100%'>
        <AreaChart height={350} data={chartData} style={{ direction }} margin={{ left: -20 }}>
          <CartesianGrid />
          <XAxis
            dataKey='date'
            reversed={reversed}
            tickCount={isLaptopS ? 9 : isTablet ? 7 : 3}
            tick={props => {
              return <ControlledChartAxisTick x={props.x} y={props.y} payload={props.payload} rotation={-45} />
            }}
            style={{
              fontSize: isMobileXs || isMobileS || isMobileM || isTablet ? '.9rem' : '1rem'
            }}
          />
          <YAxis
            tickCount={4}
            orientation={orientation}
            style={{
              fontSize: isMobileXs || isMobileS || isMobileM || isTablet ? '.9rem' : '1rem'
            }}
          />
          <Tooltip content={ToolTipChart} />
          <Area
            type={type}
            dataKey={dataKeyArea}
            stackId={stackId}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default ControlledAreaChart
