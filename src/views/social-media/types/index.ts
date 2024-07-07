// **React Imports
import React from 'react'

// **Vendor Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { ApexOptions } from 'apexcharts'
import { CurveType } from 'recharts/types/shape/Curve'

export interface FacebookDailyData {
  _id: string
  likes: number
  comments: number
  shares: number
  growth: number
}

export interface FacebookMonthlyData {
  _id: string
  month: string
  likes: number
  comments: number
  shares: number
  engagementRate: number
}

export interface FacebookYearlyStats {
  totalLikes: number
  totalComments: number
  totalShares: number
  totalEngagementRate: number
  averageLikes: number
  averageComments: number
  averageShares: number
  averageEngagementRate: number
}

export interface InstagramDailyData {
  _id: string
  likes: number
  comments: number
  impressions: number
  reach: number
  growth: number
}

export interface InstagramMonthlyData {
  _id: string
  month: string
  likes: number
  comments: number
  impressions: number
  reach: number
  engagementRate: number
}

export interface InstagramYearlyStats {
  totalLikes: number
  totalComments: number
  totalImpressions: number
  totalReach: number
  totalEngagementRate: number
  averageLikes: number
  averageComments: number
  averageImpressions: number
  averageReach: number
  averageEngagementRate: number
}

export interface YoutubeDailyData {
  _id: string
  likes: number
  comments: number
  views: number
  growth: number
}

export interface YoutubeMonthlyData {
  _id: string
  month: string
  likes: number
  comments: number
  views: number
  subscribers: number
}

export interface YoutubeYearlyStats {
  totalLikes: number
  totalComments: number
  totalViews: number
  totalSubscribers: number
  averageLikes: number
  averageComments: number
  averageViews: number
  averageSubscribers: number
}

export interface TwitterDailyData {
  _id: string
  likes: number
  followers: number
  clicks: number
  retweets: number
  growth: number
}

export interface TwitterMonthlyData {
  _id: string
  month: string
  likes: number
  retweets: number
  followers: number
  clicks: number
  engagementRate: number
}

export interface TwitterYearlyStats {
  totalLikes: number
  totalRetweets: number
  totalFollowers: number
  totalClicks: number
  totalEngagementRate: number
  averageLikes: number
  averageRetweets: number
  averageFollowers: number
  averageClicks: number
  averageEngagementRate: number
}

export interface SocialMediaData {
  name: string
  data: any[] | null
}

export interface DailySocialData {
  facebook: FacebookDailyData
  instagram: InstagramDailyData
  twitter: TwitterDailyData
  youtube: YoutubeDailyData
}

export interface SocMedMetricsItem {
  id: string
  title: string
  keyMetricValue: number
  growth?: number
  compareDays?: number
  iconURL: string
}

export interface DataType {
  id: string
  pageVisits: string
  title: string
  trend: React.ReactNode
  subtitle: string
  trendDir: string
  avatarText: string
  trendNumber: string
  avatarColor: ThemeColor
}

export interface BasicMetricCardsProps {
  title: string
  keyMetricValue: string | number
  compareDays: string | number
  growth: string | number
}

export interface TotalVisitorsWidgetProps {
  options: ApexOptions
}

export interface DataType {
  pageVisits: string
  title: string
  trend: React.ReactNode
  subtitle: string
  trendDir: string
  avatarText: string
  trendNumber: string
  avatarColor: ThemeColor
}

export interface SocialMediaChannelProps {
  id: string
  name: string
  desc: string
  icon: JSX.Element
  bgcolor: string
  budget: number
  growth: number
}

export interface RenderOptionProp {
  id?: string
  value: string
  label: string
}

export interface DirectionProps {
  direction: 'ltr' | 'rtl'
}

export type OptionProp = {
  id?: string
  value: string
  label: string
  title?: string
}

export interface DailyDataProps {
  date: string
  post_likes: number
  comments: number
  shares: number
  reach: number
  engagement_rate: number
  impressions: number
  trend_likes: number
  trend_engagements: number
  trend_impressions: number
  trend_reach: number
  growth_likes: number
  growth_engagements: number
  compareDays: number
  prevDate: string
  engagements: number
}

export interface DataProps {
  date: string
  total_likes: number
  total_comments: number
  total_shares: number
  total_reach: number
  engagement_rate: number
  avg_likes: number
  avg_comments: number
  avg_shares: number
  avg_reach: number
  impressions: number
  total_engagements: number
  trend_likes: number
  trend_engagements: number
  trend_impressions: number
  trend_reach: number
  growth_likes: number
  growth_engagements: number
  compareDays: number
  prevDate: string
}

export type GraphDataProp = DailyDataProps | DataProps

export interface AreaKeyConfig {
  dataKey: string
  stackId?: string
  type?: CurveType
  stroke?: string
  fill?: string
  strokeWidth?: number
}

export interface ControlledAreaChartProps {
  chartData: any[]
  direction?: 'ltr' | 'rtl'
  dataKeyXaxis: string
  areaKeys: AreaKeyConfig[]
  tickCount?: number
  orientation?: 'right' | 'left'
  reversed?: boolean
  isReferenceLine?: boolean
}
