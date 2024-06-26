// **React Imports
import React, { useState } from 'react'

// **Mui Imports
import { Box, Card, CardContent } from '@mui/material'

// **Custom Component Imports
import SocialChannelsList from 'src/views/social-media/likes-trend/SocialChannelsList'
import ButtonSkipController from 'src/@core/components/button-skip-controller'
import CustomHeaderTitleLg from 'src/@core/components/typography/custom-header-title-lg'

// **Type Imports
import { DailySocialData } from 'src/views/social-media/types'

// **Hook Imports
import useDailySocialMediaMetrics from 'src/hooks/social-media/useDailySocialMediaMetrics'

// **Type Imports
interface SocialMediaData {
  id: string
  name: string
  desc: string
  icon: JSX.Element
  bgcolor: string
  budget: number
  growth: number
}

const SocMedDailyMetricsInsight = () => {
  const currentDate = new Date()
  const [day, setDay] = useState<number>(currentDate.getDate())
  const { facebook, instagram, twitter, youtube }: DailySocialData = useDailySocialMediaMetrics(day || 0)

  const increaseDayHandler = () => {
    setDay(prevDay => (prevDay === 31 ? 30 : prevDay + 1))
  }

  const decreaseDayHandler = () => {
    setDay(prevDay => (prevDay > 1 ? prevDay - 1 : prevDay))
  }

  return (
    <Card>
      <Box
        sx={{
          padding: '15px 20px 0 20px',
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row'
          },
          justifyContent: 'space-between'
        }}
      >
        <CustomHeaderTitleLg>Daily Facebook Metrics Report</CustomHeaderTitleLg>
        <ButtonSkipController
          data={`Day of ${day}`}
          increaseCountHandler={increaseDayHandler}
          decreaseCountHandler={decreaseDayHandler}
        />
      </Box>
      <CardContent>
        <SocialChannelsList facebook={facebook} instagram={instagram} twitter={twitter} youtube={youtube} />
      </CardContent>
    </Card>
  )
}

export default SocMedDailyMetricsInsight
