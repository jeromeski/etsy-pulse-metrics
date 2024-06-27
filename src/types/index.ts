// **React Imports
import React from 'react'

// **Vendor Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { ApexOptions } from 'apexcharts'

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
  keyMetricValue: string
  growth: string
  likesComparisonDays: string
  iconURL: string
}

export interface SocMedMetricsItem {
  id: string
  title: string
  keyMetricValue: string
  growth: string
  likesComparisonDays: string
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
  keyMetricValue: string
  likesComparisonDays: string
  growth: string
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
  title: string
}