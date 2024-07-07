// ** Mui Imports
import { Box } from '@mui/material'

// ** Third Party Imports
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { CurveType } from 'recharts/types/shape/Curve'

// ** Custom Component Imports
import ControlledChartAxisTick from 'src/@core/components/recharts/controlled-chart-axis-tick'
import ToolTipChart from 'src/@core/components/tool-tip-chart'

// ** Hooks
import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'

// ** Type Imports
import { ControlledAreaChartProps } from 'src/views/social-media/types'

const ControlledAreaChart: React.FC<ControlledAreaChartProps> = ({
  chartData,
  direction = 'ltr',
  dataKeyXaxis,
  areaKeys,
  tickCount = 4,
  orientation = 'left',
  reversed = true,
  isReferenceLine = true
}) => {
  const { isSmallScreen, isLaptop, isTablet } = useDeviceSizesMediaQuery()

  return (
    <ResponsiveContainer height='100%' width='100%'>
      <AreaChart
        height={350}
        data={chartData}
        style={{ direction }}
        margin={{ left: isSmallScreen ? -35 : -30, bottom: -9 }}
      >
        <CartesianGrid vertical={false} strokeDasharray='3 3' />
        {isReferenceLine && <ReferenceLine y={80} stroke='#D47F85' strokeWidth={2} />}

        <XAxis
          dataKey={dataKeyXaxis}
          reversed={reversed}
          tickCount={isLaptop ? 9 : isTablet ? 7 : 3}
          tick={props => <ControlledChartAxisTick x={props.x} y={props.y} payload={props.payload} rotation={-45} />}
          style={{
            fontSize: isSmallScreen || isTablet ? '.9rem' : '1rem'
          }}
        />
        <YAxis
          tickCount={tickCount}
          orientation={orientation}
          style={{
            fontSize: isSmallScreen || isTablet ? '10px' : '12px'
          }}
        />
        <Tooltip content={ToolTipChart} />
        {areaKeys.map((areaKey, index) => (
          <Area
            key={index}
            type={areaKey.type || 'monotone'}
            dataKey={areaKey.dataKey}
            stackId={areaKey.stackId || 'defaultStack'}
            stroke={areaKey.stroke || '#8884d8'}
            strokeWidth={areaKey.strokeWidth || 2}
            fill={areaKey.fill || '#8884d8'}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default ControlledAreaChart
