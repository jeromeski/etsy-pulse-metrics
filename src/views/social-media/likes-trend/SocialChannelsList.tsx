// ** React Imports
import React, { useMemo } from 'react'

// **Mui Imports
import { List } from '@mui/material'

// **Icon Imports
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import GoogleIcon from '@mui/icons-material/Google'
import YouTubeIcon from '@mui/icons-material/YouTube'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

// ** Custom Components Imports
import SocialChannelItem from 'src/views/social-media/likes-trend/SocialChannelItem'

// **Type Imports
import {
  FacebookDailyData,
  TwitterDailyData,
  InstagramDailyData,
  YoutubeDailyData,
  SocialMediaChannelProps
} from 'src/views/social-media/types'

const SocialChannelsList = ({
  facebook,
  twitter,
  instagram,
  youtube
}: {
  facebook: FacebookDailyData
  twitter: TwitterDailyData
  instagram: InstagramDailyData
  youtube: YoutubeDailyData
}) => {
  const generateSocialMediaData: () => SocialMediaChannelProps[] = () => [
    {
      id: '11abc',
      name: 'Facebook',
      desc: `${facebook.likes || 100} Likes, ${facebook.shares || 25} Shares`,
      icon: <FacebookOutlinedIcon />,
      bgcolor: '#38529A',
      budget: facebook.comments || 72,
      growth: facebook.growth || 1.2
    },

    {
      id: '12bcd',
      name: 'Twitter',
      desc: `${twitter.likes || 54} Likes, ${twitter.retweets || 63} Retweets`,
      icon: <TwitterIcon />,
      bgcolor: '#17A9FC',
      budget: twitter.followers || 61,
      growth: twitter.growth || 12.5
    },

    {
      id: '13cde',
      name: 'Instagram',
      desc: `${instagram.likes || 25} Likes, ${instagram.reach || 200} Reach`,
      icon: <InstagramIcon />,
      bgcolor: '#CC4BB7',
      budget: instagram.impressions || 56,
      growth: instagram.growth || 8.6
    },
    {
      id: '14def',
      name: 'Youtube',
      desc: `${youtube.likes || 22} Likes, ${youtube.comments || 44} Comments`,
      icon: <YouTubeIcon />,
      bgcolor: '#C6171D',
      budget: youtube.views || 58,
      growth: youtube.growth || 16
    }
  ]

  const socialMediaData = useMemo(generateSocialMediaData, [facebook, twitter, instagram, youtube])

  return (
    <List disablePadding>
      {socialMediaData &&
        socialMediaData?.map((item: SocialMediaChannelProps) => <SocialChannelItem item={item} key={item.id} />)}
    </List>
  )
}

export default SocialChannelsList
