// ** React Imports
import React from 'react'

// ** Third Party Imports
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

// **Custom Components
import CustomToolTip from 'src/@core/components/tool-tip-chart'
import ControlledChartAxisTick from 'src/@core/components/recharts/controlled-chart-axis-tick'

// **Utils Import
import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'

import { DailyDataProps, DataProps } from 'src/views/social-media/types'

interface BarKeyProps {
  dataKey: string
  fill: string
}

interface ControlledHorBarChartProps {
  data: DailyDataProps[] | DataProps[]
  // data: any[]
  barKeys: BarKeyProps[]
  formatXAxis: (value: string, index?: number) => string
  direction: string
  isReferenceLine: boolean
}

const ControlledHorBarChart: React.FC<ControlledHorBarChartProps> = ({
  data,
  barKeys,
  formatXAxis,
  direction,
  isReferenceLine
}) => {
  const { isSmallScreen, isTablet } = useDeviceSizesMediaQuery()
  return (
    <ResponsiveContainer height={isSmallScreen ? 150 : 175} width='100%'>
      <BarChart
        data={data}
        barSize={isSmallScreen ? 5 : 20}
        style={{ direction }}
        margin={{ left: isSmallScreen ? -35 : -30, bottom: -9 }}
      >
        <CartesianGrid vertical={false} strokeDasharray='3 3' />
        {isReferenceLine && <ReferenceLine y={80} stroke='#D47F85' strokeWidth={2} />}
        <YAxis
          tickCount={4}
          style={{
            fontSize: isSmallScreen || isTablet ? '10px' : '12px'
          }}
        />
        <Tooltip content={CustomToolTip} />
        {barKeys.map((barKey, index) => (
          <Bar key={index} dataKey={barKey.dataKey} fill={barKey.fill} />
        ))}
        <XAxis
          dataKey='date'
          tickFormatter={formatXAxis}
          reversed={true}
          tick={props => <ControlledChartAxisTick x={props.x} y={props.y} payload={props.payload} rotation={-45} />}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default ControlledHorBarChart
