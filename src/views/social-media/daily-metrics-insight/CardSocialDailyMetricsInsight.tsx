import React, { useState } from 'react'
import { Card, CardContent } from '@mui/material'

import SocialChannelsList from 'src/views/social-media/likes-trend/SocialChannelsList'

import ButtonSkipController from 'src/@core/components/button-skip-controller'

import { DailySocialData } from 'src/views/social-media/types'

import useDailySocialMediaMetrics from 'src/hooks/social-media/useDailySocialMediaMetrics'

const CardSocialDailyMetricsInsight = () => {
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
      <ButtonSkipController
        data={`Day of ${day}`}
        increaseCountHandler={increaseDayHandler}
        decreaseCountHandler={decreaseDayHandler}
      />
      <CardContent>
        <SocialChannelsList facebook={facebook} instagram={instagram} twitter={twitter} youtube={youtube} />
      </CardContent>
    </Card>
  )
}

export default CardSocialDailyMetricsInsight
