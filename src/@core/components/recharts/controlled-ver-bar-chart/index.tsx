// ** React Imports
import React from 'react'

// ** MUI Imports
import {useTheme} from '@mui/material'

// ** Third Party Imports
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

// **Custom Components
import CustomToolTip from 'src/@core/components/tool-tip-chart'

// **Utils Import
import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'

import { DailyDataProps, DataProps } from 'src/views/social-media/types'

interface BarKeyProps {
  dataKey: string
  fill: string
}

interface ControlledVerBarChartProps {
  data: DailyDataProps[] | DataProps[]
  // data: any[]
  barKeys: BarKeyProps[]
  formatXAxis: (value: string, index?: number) => string
  direction: string
  label?: string
}

const ControlledVerBarChart: React.FC<ControlledVerBarChartProps> = ({
  data,
  barKeys,
  formatXAxis,
  direction,
  label = 'Daily Likes'
}) => {
  const { isSmallScreen, isTablet } = useDeviceSizesMediaQuery()
  const theme = useTheme()
  return (
    <ResponsiveContainer height={isSmallScreen ? 150 : 175} width='100%'>
      <BarChart
        data={data.slice(0,7)}
        barSize={isSmallScreen ? 12 : 20}
        style={{ direction }}
        margin={{ left: isSmallScreen ? -35 : -30, bottom: -9 }}
        layout='vertical'
      >
        <CartesianGrid vertical={false} strokeDasharray='3 3' />
        <YAxis
          tickFormatter={formatXAxis}
          type='category'
          dataKey='date'
          style={{
            fontSize: isSmallScreen || isTablet ? '10px' : '12px'
          }}
          reversed={true}
          tick={false}
          label={{ value: `${label}`, angle: -90, position: 'insideRight', offset: 15, dy: -40, fontSize: isSmallScreen || isTablet ? '12px' : '13px', fontWeight: 700 , opacity: .7}}
        />
        <Tooltip content={CustomToolTip} />
        {barKeys.map((barKey, index) => (
          <Bar key={index} dataKey={barKey.dataKey} fill={barKey.fill} />
        ))}
        <XAxis
          type='number'
          style={{
            fontSize: isSmallScreen || isTablet ? '10px' : '12px'
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default ControlledVerBarChart
