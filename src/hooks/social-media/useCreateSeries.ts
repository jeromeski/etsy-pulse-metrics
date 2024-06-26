import { SocialMediaData } from 'src/views/social-media/types'

export default function useCreateSeries() {
  const createSeries = (year: number, data: SocialMediaData[]) => {
    return data?.map(item => ({
      ...item,
      data: item?.data?.map(monthlyData => monthlyData?.likes) ?? null
    }))
  }
  return { createSeries }
}
