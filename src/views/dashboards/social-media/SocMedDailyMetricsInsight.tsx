// **React Imports
import React, { useState } from 'react'

// **Mui Imports
import { Divider } from '@mui/material'

// **Custom Component Imports
import SocialChannelsList from 'src/views/social-media/likes-trend/SocialChannelsList'
import CardControlledSkip from 'src/@core/components/card-controlled-skip'

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
    <CardControlledSkip
      title='Social Media Key Metrics'
      subtitle='Total Daily Information'
      day={day}
      increaseDayHandler={increaseDayHandler}
      decreaseDayHandler={decreaseDayHandler}
      sx={{'& .MuiCardHeader-root': {
          paddingBottom: '5px'
        },
        '& .MuiCardContent-root': {
          paddingBottom: '10px'
        }
      }}
    >
      <Divider sx={{padding:0,  margin:0, mb: '5px'}}/>
      <SocialChannelsList facebook={facebook} instagram={instagram} twitter={twitter} youtube={youtube} />
    </CardControlledSkip>
  )
}

export default SocMedDailyMetricsInsight
