// ** React Imports
import React, { useState } from 'react'

//  **Mui Imports
import { Card, CardHeader, CardContent, Box, Typography, MenuItem } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

// **Recharts Imports
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

// **Custom Components
import MetricTotalHeading from 'src/@core/components/typography/metric-total-heading'
import TitleCardHeader from 'src/@core/components/typography/title-card-header'
import TrendPercentageIndicator from 'src/@core/components/typography/trend-percentage-indicator'
import ControlledIconMenuButton from 'src/@core/components/controlled-icon-menu-button'
import CommentTextarea from 'src/@core/components/comment-textarea'
import CustomDescLabel from 'src/@core/components/typography/custom-desc-label'

//**Icon Imports
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp'
import AddCommentSharpIcon from '@mui/icons-material/AddCommentSharp'

// **Util Imports
import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'
import fakeFetch from 'src/@core/utils/fakeFetch'

// **Vendor Imports
import toast from 'react-hot-toast'

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
  //** Hooks
  const { isSmallScreen } = useDeviceSizesMediaQuery()
  const [textareaValue, setTextareaValue] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const handleSubmit = async () => {
    await fakeFetch(setIsLoading)
    toast('success')
    console.log(textareaValue)
  }

  // Placeholders
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
            <Box sx={{ display: 'flex' }}>
              <ControlledIconMenuButton
                icon={<AddCommentSharpIcon sx={theme => ({ color: theme.palette.grey['A200'] })} />}
                renderMenuItems={closeMenu => (
                  <MenuItem
                    sx={{
                      backgroundColor: 'transparent !important',
                      '&:hover': {
                        backgroundColor: 'transparent'
                      },
                      '&:focus': {
                        backgroundColor: 'transparent'
                      }
                    }}
                  >
                    <Box sx={{ display: 'column', width: '350px', height: 'auto', overflowY: 'hidden' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <Typography variant='h5' sx={{ fontWeight: '700' }}>
                          Comments
                        </Typography>

                        <LoadingButton
                          variant='contained'
                          sx={{ textTransform: 'none' }}
                          onClick={handleSubmit}
                          loading={isLoading}
                          disabled={isLoading}
                        >
                          Add a Comment
                        </LoadingButton>
                      </Box>
                      <Box
                        sx={{
                          border: '1px solid rgb(118, 118, 118)',
                          // borderBottomColor: 'transparent',
                          padding: '15px',
                          marginBottom: '-2px'
                        }}
                      >
                        <Typography variant='h6' sx={{ fontSize: '16px !important' }}>
                          There are no comments.
                        </Typography>
                      </Box>
                      <Box>
                        <CommentTextarea callback={setTextareaValue} value={textareaValue} />
                      </Box>
                    </Box>
                  </MenuItem>
                )}
              />
              <ControlledIconMenuButton
                icon={<MoreVertSharpIcon sx={theme => ({ color: theme.palette.grey['A200'] })} />}
                renderMenuItems={closeMenu => [
                  <MenuItem key='z1234' onClick={closeMenu}>
                    Connect your data...
                  </MenuItem>,
                  <MenuItem key='z2345' onClick={closeMenu}>
                    Edit...
                  </MenuItem>,
                  <MenuItem key='z3456' onClick={closeMenu}>
                    Share
                  </MenuItem>,
                  <MenuItem key='z4567' onClick={closeMenu}>
                    Download as
                  </MenuItem>,
                  <MenuItem key='z5678' onClick={closeMenu}>
                    About this Tool
                  </MenuItem>,
                  <MenuItem key='z6789' onClick={closeMenu}>
                    Remove from Dashboard
                  </MenuItem>
                ]}
              />
            </Box>
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
