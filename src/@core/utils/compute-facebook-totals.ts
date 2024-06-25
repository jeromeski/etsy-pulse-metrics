import { FacebookMonthlyData } from 'src/views/social-media/types'

export function computeFacebookTotals(data: FacebookMonthlyData[]) {
  let totalLikes = 0
  let totalComments = 0
  let totalShares = 0

  for (const entry of data) {
    totalLikes += entry.likes
    totalComments += entry.comments
    totalShares += entry.shares
  }

  return { likes: totalLikes, comments: totalComments, shares: totalShares }
}
