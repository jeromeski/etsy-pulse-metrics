// **React Imports
import { useState } from 'react'

// **Data Imports
import {
  POST_IMPRESSIONS,
  PAGE_IMPRESSIONS,
  POST_ENGAGEMENTS,
  POST_LIKES,
  POST_COMMENTS
} from 'src/views/social-media/data'

interface TotalValuesProp {
  likes?: number
  engagements?: number
  comments?: number
  impressions?: number
  views?: number
}

interface SlicedMergedData {
  name: string
  period: string
  values: {
    value: number
    end_time: string
  }[]
  title: string
  description: string
}

interface GrowthTrendProps {
  start?: number
  end?: number
  data?: []
}

// Create an interface for the getTotalValue function
interface GetTotalValue {
  (data?: SlicedMergedData[], start?: number, end?: number, keysToMap?: any): Promise<TotalValuesProp>
}

const initData = [POST_IMPRESSIONS, PAGE_IMPRESSIONS, POST_ENGAGEMENTS, POST_LIKES, POST_COMMENTS]

const nameToKeyMap: { [key: string]: string } = {
  post_reactions_like_total: 'Likes',
  post_engaged_users: 'Engagements',
  post_comments: 'Comments',
  page_impressions: 'Impressions',
  post_impressions: 'Views'
}

export default function useGrowthTrend() {
  const [trendValues, setTrendValues] = useState<{ [key: string]: number } | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const getGrowthTrend = async (
    data: SlicedMergedData[] = initData,
    start: number = 0,
    end: number = 30,
    keysToMap = nameToKeyMap
  ) => {
    const mergedSegments: SlicedMergedData[] = await new Promise((resolve, reject) => {
      try {
        const mergedSlicedData = data?.map((item: any) => {
          return {
            ...item,
            values: item.values.slice(start, end)
          }
        })
        resolve(mergedSlicedData)
      } catch (error) {
        reject(error)
      }
    })
    const trendPerSegment = await new Promise<{ [key: string]: number }>((resolve, reject) => {
      setIsLoading(true)
      const segments: { [key: string]: number } = Object.assign({})
      try {
        mergedSegments.forEach(metricObj => {
          let currentName = metricObj['name']
          if (metricObj.values && metricObj.values[start] && metricObj.values[metricObj.values.length - 1]) {
            const startValue = metricObj.values[start].value
            const endValue = metricObj.values[metricObj.values.length - 1].value
            const segmentGrowth: number = Number((((endValue - startValue) / startValue) * 100).toFixed(2))
            console.log('segmentGrowth', segmentGrowth)
            const key = keysToMap[currentName]
            if (!(`${key}` in segments)) {
              segments[key.toLowerCase()] = 0
              segments[key.toLowerCase()] += segmentGrowth
            } else {
              segments[key.toLowerCase()] = segmentGrowth
            }
          }
        })
        setIsLoading(false)
        resolve(segments)
      } catch (error) {
        setIsLoading(false)
        reject(error)
      }
    })

    setTrendValues(trendPerSegment)
  }
  return { getGrowthTrend, trendValues }
}
