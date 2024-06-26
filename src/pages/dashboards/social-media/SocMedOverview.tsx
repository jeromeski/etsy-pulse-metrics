// React Imports
import React, { useState, useEffect } from 'react'

// **Mui Imports
import { Card, Box } from '@mui/material'

// **Data Imports
import { SIMPLE_SOCMED_CARD_METRICS } from 'src/views/social-media/data'

// **Custom Component Imports
import SocMedOverviewItem from 'src/views/social-media/overview/SocMedOverviewItem'
import SocMedOverviewList from 'src/views/social-media/overview/SocMedOverviewList'

// **Type Imports
import { SocMedMetricsItem } from 'src/views/social-media/types'

// **Hooks Imports
import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'
import CustomHeaderTitleLg from 'src/@core/components/typography/custom-header-title-lg'

const SocMedOverview = () => {
  const [metricsData, setMetricsData] = useState<SocMedMetricsItem[] | null>(null)
  const { isMobileXs, isMobileS, isMobileM, isTablet, isLaptop, isLaptopL, isDesktop } = useDeviceSizesMediaQuery()
  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      try {
        if (SIMPLE_SOCMED_CARD_METRICS) {
          setMetricsData(SIMPLE_SOCMED_CARD_METRICS)
        }
      } catch (error) {
        console.log(error)
      }
    }
    return () => {
      isMounted = false
    }
  }, [])
  return (
    <Card
      sx={theme => ({
        height: '100%',
        width: '100%',
        padding: {
          xs: '1rem 1rem 2rem 1rem',
          lg: '1rem 1.5rem 1rem 1.5rem'
        },
        borderRadius: '5px',
        maxWidth: '100%',
        [theme.breakpoints.down('sm')]: {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }
      })}
    >
      <CustomHeaderTitleLg>Social Media Followers</CustomHeaderTitleLg>
        <SocMedOverviewList>
          {metricsData?.map((item: SocMedMetricsItem) => (
            <SocMedOverviewItem
              key={item.id}
              iconURL={item.iconURL}
              title={item.title}
              keyMetricValue={item.keyMetricValue}
            />
          ))}
        </SocMedOverviewList>
    </Card>
  )
}

export default React.memo(SocMedOverview)
