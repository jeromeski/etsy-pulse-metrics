import React from 'react'
import { Card, CardHeader, CardContent, Box, IconButton } from '@mui/material'
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import MetricTotalHeading from 'src/@core/components/typography/metric-total-heading'
import TitleCardHeader from 'src/@core/components/typography/title-card-header'
import TrendPercentageIndicator from 'src/@core/components/typography/trend-percentage-indicator'
//**Icon Imports
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp'
import AddCommentSharpIcon from '@mui/icons-material/AddCommentSharp'
import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'
import CustomDescLabel from 'src/@core/components/typography/custom-desc-label'

const data = [
  {
    name: '7/12',
    Sales: 20,
    Clicks: 60,
    Visits: 100
  },
  {
    name: '8/12',
    Sales: 40,
    Clicks: 80,
    Visits: 120
  },
  {
    name: '9/12',
    Sales: 30,
    Clicks: 70,
    Visits: 90
  },
  {
    name: '10/12',
    Sales: 70,
    Clicks: 110,
    Visits: 170
  },
  {
    name: '11/12',
    Sales: 40,
    Clicks: 80,
    Visits: 130
  },
  {
    name: '12/12',
    Sales: 60,
    Clicks: 80,
    Visits: 160
  },
  {
    name: '13/12',
    Sales: 50,
    Clicks: 100,
    Visits: 140
  },
  {
    name: '14/12',
    Sales: 140,
    Clicks: 90,
    Visits: 240
  },
  {
    name: '15/12',
    Sales: 120,
    Clicks: 180,
    Visits: 220
  },
  {
    name: '16/12',
    Sales: 100,
    Clicks: 160,
    Visits: 180
  },
  {
    name: '17/12',
    Sales: 140,
    Clicks: 140,
    Visits: 270
  },
  {
    name: '18/12',
    Sales: 180,
    Clicks: 200,
    Visits: 280
  },
  {
    name: '19/12',
    Sales: 220,
    Clicks: 220,
    Visits: 375
  }
]

interface TinyResponsiveContainerProps {
  children: React.ReactNode
  viewBoxWidth: number
  viewBoxHeight: number
}

const TinyResponsiveContainer: React.FC<TinyResponsiveContainerProps> = ({ children, viewBoxWidth, viewBoxHeight }) => {
  return (
    <ResponsiveContainer width='100%' height={40}>
      <>{children}</>
    </ResponsiveContainer>
  )
}

const MetricTrendGraphMonitorTile = ({
  title = 'Likes',
  icon,
  graph,
  titleSize = 'medium',
  actionComponent,
  total = '2,435',
  growth = 1.25,
  comparisonDays = 30
}: {
  title?: string
  titleSize: 'large' | 'medium' | 'small'
  icon: React.ReactNode
  graph?: React.ReactNode
  children: React.ReactNode
  actionComponent?: React.ReactNode
  total: number | string
  growth: string | number
  comparisonDays: string | number
}) => {
  const { isSmallScreen } = useDeviceSizesMediaQuery()
  const dataKey = 'Clicks'
  const stroke = '#34518d'
  const stackId = 'Clicks'
  const strokeWidth = '2'
  const fill = 'rgb(115, 103, 240)'
  return (
    <Card sx={{ padding: '15px 15px 0 15px', height: '100%', width: '100%' }}>
      {title && (
        <CardHeader
          title={<TitleCardHeader size={titleSize}>{title}</TitleCardHeader>}
          action={
            <>
              <IconButton size='small' sx={{ paddingTop: 0, paddingBottom: 0 }}>
                <AddCommentSharpIcon sx={theme => ({ color: theme.palette.grey['A200'] })} />
              </IconButton>
              <IconButton size='small' sx={{ paddingTop: 0, paddingRight: 0, paddingBottom: 0 }}>
                <MoreVertSharpIcon sx={theme => ({ color: theme.palette.grey['A200'] })} />
              </IconButton>
            </>
          }
          sx={{
            padding: 0,
            marginBottom: '20px'
          }}
        />
      )}
      <CardContent sx={{ padding: '0 0 5px 0 !important' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '15px' }}>
          <MetricTotalHeading>{total}</MetricTotalHeading>
          <TrendPercentageIndicator growth={growth} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
          <CustomDescLabel>vs previous {comparisonDays}d</CustomDescLabel>
        </Box>
        <Box sx={{ height: '30px', width: '100%' }}>
          <ResponsiveContainer height={50}>
            <AreaChart height={20} data={data} margin={{ left: -60 }}>
              <XAxis tick={false} />
              <YAxis tick={false} />
              <Area
                type='linear'
                dataKey={dataKey}
                stackId={stackId}
                stroke={stroke}
                strokeWidth={strokeWidth}
                fill={fill}
              />
              {(props: any) => {
                console.log(props)
              }}
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}

export default MetricTrendGraphMonitorTile

/*
const BasicMetricTrendMonitorTile = () => {}

const BasicMetricGraphMonitorTile = () => {}
*/
