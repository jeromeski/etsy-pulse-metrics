//** React Imports
import { useState, useEffect } from 'react'

// ** Data Imports
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

// Create an interface for the getTotalValue function
interface GetTotalValue {
  (data?: SlicedMergedData[], start?: number, end?: number, keysToMap?: any): Promise<TotalValuesProp>
}

const nameToKeyMap: { [key: string]: string } = {
  post_reactions_like_total: 'Likes',
  post_engaged_users: 'Engagements',
  post_comments: 'Comments',
  page_impressions: 'Impressions',
  post_impressions: 'Views'
}

const initData = [POST_IMPRESSIONS, PAGE_IMPRESSIONS, POST_ENGAGEMENTS, POST_LIKES, POST_COMMENTS]

export default function useAggregateValues() {
  const [totalValues, setTotalValues] = useState<TotalValuesProp | null>(null)
  const [slicedData, setSlicedData] = useState<SlicedMergedData[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getTotalValue = async (data: any = initData, start = 0, end = 30, keysToMap = nameToKeyMap) => {
    const result: SlicedMergedData[] = await new Promise((resolve, reject) => {
      try {
        const mergedSlicedData = data?.map((item: any) => {
          return {
            ...item,
            values: item.values.slice(start, end)
          }
        })
        setSlicedData(mergedSlicedData)
        resolve(mergedSlicedData)
      } catch (error) {
        reject(error)
      }
    })
    const metricTotals = await new Promise<TotalValuesProp>((resolve, reject) => {
      try {
        const newData = result.reduce((acc: any, currentEl: SlicedMergedData) => {
          let currentName = currentEl['name']

          if (currentEl['values']) {
            const metricTotal = currentEl.values.reduce((sum, currentItem) => sum + currentItem.value, 0)
            const key = keysToMap[currentName]
            if (acc[key] === undefined) {
              acc[key] += metricTotal
            } else {
              acc[key] = metricTotal
            }
          }
          return acc
        }, {} as { [key: string]: number })
        setIsLoading(false)
        resolve(newData)
      } catch (error) {
        reject(error)
      }
    })
    setTotalValues(metricTotals)
  }

  return { getTotalValue, slicedData, isLoading, totalValues }
}
