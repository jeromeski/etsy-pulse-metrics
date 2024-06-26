import { useEffect, useState } from 'react'
import { facebookDailyData } from 'src/views/social-media/data'

import { instagramDailyData } from 'src/views/social-media/data'

import { twitterDailyData } from 'src/views/social-media/data'

import { youtubeDailyData } from 'src/views/social-media/data'

import {
  FacebookDailyData,
  InstagramDailyData,
  TwitterDailyData,
  YoutubeDailyData,
  DailySocialData
} from 'src/views/social-media/types'

export default function useDailySocialMetrics(day: number) {
  const [state, setState] = useState<DailySocialData>({
    facebook: facebookDailyData[day],
    instagram: instagramDailyData[day],
    twitter: twitterDailyData[day],
    youtube: youtubeDailyData[day]
  })

  useEffect(() => {
    setState({
      facebook: facebookDailyData[day],
      instagram: instagramDailyData[day],
      twitter: twitterDailyData[day],
      youtube: youtubeDailyData[day]
    })
  }, [day])

  const { facebook, instagram, twitter, youtube } = state

  return { facebook, instagram, twitter, youtube }
}
