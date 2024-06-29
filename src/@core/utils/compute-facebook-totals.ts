import { FacebookMonthlyData } from 'src/views/social-media/types'

export function computeFacebookTotals(data: FacebookMonthlyData[], count: number) {
  const newData = data.slice(0, count - 1)
  let totalLikes = 0
  let totalComments = 0
  let totalShares = 0

  for (const entry of newData) {
    totalLikes += entry.likes
    totalComments += entry.comments
    totalShares += entry.shares
  }

  return { likes: totalLikes, comments: totalComments, shares: totalShares }
}
