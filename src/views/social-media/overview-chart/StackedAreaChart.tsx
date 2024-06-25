// ** Mui Imports
import { Box } from '@mui/material'

// ** Third Party Imports
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// ** Custom Component Imports
import ControlledChartAxisTick from 'src/@core/components/controlled-chart-axis-tick'
import ToolTipChart from 'src/@core/components/tool-tip-chart'

// ** Hooks
import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'

interface StackedAreaChartProps {
  chartData: string[]
  direction: boolean
  dataKeyXaxis: string
  dataKeyArea1: string
  dataKeyArea2: string
  dataKeyArea3: string
  stackId1: string
  stackId2: string
  stackId3: string
  type?: any
  tickCount?: any
  stroke1?: string
  stroke2?: string
  stroke3?: string
  fill1?: string
  fill2?: string
  fill3?: string
  orientation?: 'right' | 'left'
  strokeWidth?: string | number
  reversed?: boolean
}

const StackedAreaChart: React.FC<StackedAreaChartProps> = ({
  chartData,
  direction,
  dataKeyXaxis,
  dataKeyArea1,
  dataKeyArea2,
  dataKeyArea3,
  stackId1,
  stackId2,
  stackId3,
  type,
  tickCount,
  stroke1,
  stroke2,
  stroke3,
  fill1,
  fill2,
  fill3,
  orientation,
  strokeWidth,
  reversed,
  ...props
}) => {
  const { isMobileXs, isMobileS, isMobileM, isMobileL, isTablet, isLaptop } = useDeviceSizesMediaQuery()
  return (
    <Box sx={{ height: '250px', width: '100%' }}>
      <ResponsiveContainer height='100%' width='100%'>
        <AreaChart height={350} data={chartData} style={{ direction }} margin={{ left: -20 }}>
          <CartesianGrid />
          <XAxis
            dataKey='date'
            reversed={reversed}
            tickCount={isLaptop ? 9 : isTablet ? 7 : 3}
            tick={props => {
              return <ControlledChartAxisTick x={props.x} y={props.y} payload={props.payload} rotation={-45} />
            }}
            style={{
              fontSize: isMobileXs || isMobileS || isMobileM || isMobileL ? '.9rem' : '1rem'
            }}
          />
          <YAxis
            tickCount={4}
            orientation={orientation}
            style={{
              fontSize: isMobileXs || isMobileS || isMobileM || isMobileL ? '.9rem' : '1rem'
            }}
          />
          <Tooltip content={ToolTipChart} />
          <Area
            type={type}
            dataKey={dataKeyArea1}
            stackId={stackId1}
            stroke={stroke1}
            strokeWidth={strokeWidth}
            fill={fill1}
          />
          <Area
            type={type}
            dataKey={dataKeyArea2}
            stackId={stackId2}
            stroke={stroke2}
            strokeWidth={strokeWidth}
            fill={fill1}
          />
          <Area
            type={type}
            dataKey={dataKeyArea3}
            stackId={stackId3}
            stroke={stroke3}
            strokeWidth={strokeWidth}
            fill={fill1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default StackedAreaChart
