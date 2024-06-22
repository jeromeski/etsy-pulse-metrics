// React Imports
import React, { useState, useEffect } from 'react'

// **Mui Imports
import { Card, Box, Typography } from '@mui/material'

// **Data Imports
import { SIMPLE_SOCMED_CARD_METRICS } from 'src/data'

// **Custom Component Imports
import SocMedOverviewItem from 'src/views/social-media/overview/SocMedOverviewItem'
import BasicSocMedOverviewList from './SocMedOverviewList'

// **Type Imports
interface SocMedMetricsItem {
  id: string
  title: string
  keyMetricValue: string
  growth: string
  likesComparisonDays: string
  iconURL: string
}

const SocMedOverviewContainer = () => {
  const [metricsData, setMetricsData] = useState<SocMedMetricsItem[] | null>(null)
  useEffect(() => {
    let isMounted = true
    try {
      if (SIMPLE_SOCMED_CARD_METRICS) {
        setMetricsData(SIMPLE_SOCMED_CARD_METRICS)
      }
    } catch (error) {
      console.log(error)
    }
    return () => {
      isMounted = false
    }
  }, [])
  return (
    <Card
      sx={theme => ({
        padding: '1rem 1rem 2rem 1rem',
        borderRadius: '10px',
        maxWidth: '100%',
        margin: '1rem',
        [theme.breakpoints.down('sm')]: {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }
      })}
    >
      <Typography
        variant='h5'
        sx={theme => ({
          fontSize: '1rem',
          fontWeight: '800',
          color: theme.palette.grey['A400'],
          letterSpacing: '1px',
          marginBottom: '1.5rem',
          [theme.breakpoints.up('md')]: {
            fontSize: '1.25rem'
          }
        })}
      >
        Social Media Followers
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <BasicSocMedOverviewList>
          {metricsData?.map((item: SocMedMetricsItem) => (
            <SocMedOverviewItem
              key={item.id}
              iconURL={item.iconURL}
              title={item.title}
              keyMetricValue={item.keyMetricValue}
            />
          ))}
        </BasicSocMedOverviewList>
      </Box>
    </Card>
  )
}

export default React.memo(SocMedOverviewContainer)
