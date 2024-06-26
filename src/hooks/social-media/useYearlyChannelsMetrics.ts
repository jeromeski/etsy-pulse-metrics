import { useState, useEffect } from 'react'

import { facebookYearlyStats } from 'src/views/social-media/data'

import { instagramYearlyStats } from 'src/views/social-media/data'

import { twitterYearlyStats } from 'src/views/social-media/data'

import { youtubeYearlyStats } from 'src/views/social-media/data'

export default function useYearlyChannelsMetrics(year: number) {
  const [yearlyMetrics, setYearlyMetrics] = useState<any>({
    facebook: facebookYearlyStats[0],
    instagram: instagramYearlyStats[0],
    twitter: twitterYearlyStats[0],
    youtube: youtubeYearlyStats[0]
  })

  useEffect(() => {
    if (year === 2022) {
      setYearlyMetrics({
        facebook: facebookYearlyStats[0],
        instagram: instagramYearlyStats[0],
        twitter: twitterYearlyStats[0],
        youtube: youtubeYearlyStats[0]
      })
    }

    if (year === 2023) {
      setYearlyMetrics({
        facebook: facebookYearlyStats[1],
        instagram: instagramYearlyStats[1],
        twitter: twitterYearlyStats[1],
        youtube: youtubeYearlyStats[1]
      })
    }

    if (year === 2024) {
      setYearlyMetrics({
        facebook: facebookYearlyStats[2],
        instagram: instagramYearlyStats[2],
        twitter: twitterYearlyStats[2],
        youtube: youtubeYearlyStats[2]
      })
    }
  }, [year])

  return { yearlyMetrics }
}
