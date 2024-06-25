import { Avatar, ListItemAvatar, ListItemText, Typography, ListItemButton } from '@mui/material'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

// **Hooks Imports
import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'

// **Custom Component Imports 
import CustomDescLabel from 'src/@core/components/typography/custom-desc-label'

// **Type Imports
import { SocialMediaChannelProps } from 'src/views/social-media/types'

const SocialChannelItem = ({ item }: { item: SocialMediaChannelProps }) => {
  const { isMobileXs, isMobileS, isMobileM } = useDeviceSizesMediaQuery()

  return (
    <ListItemButton component={'li'} sx={{ p: theme => theme.spacing(1, 3), padding: '0px 8px 0px 8px' }}>
      <ListItemAvatar>
        <Avatar alt={item.name} sx={{ color: 'common.white', bgcolor: `${item.bgcolor}` }}>
          {item.icon}
        </Avatar>
      </ListItemAvatar>
      {isMobileXs || isMobileS || isMobileM ? (
        <></>
      ) : (
        <ListItemText
          sx={{
            flexBasis: '30%'
          }}
          primary={
            <Typography variant='h6' sx={{ fontSize: '12px', fontWeight: 600, letterSpacing: 0, mb: '0px' }}>
              {item.name}
            </Typography>
          }
          secondary={item.desc}
        />
      )}
      <ListItemText
        primary={
          <Typography variant='body1' sx={{ fontSize: 13 }}>
            &nbsp;&nbsp;{item.budget}
          </Typography>
        }
        secondary={'views'}
      />
      <ListItemText sx={{ alignSelf: 'self-start', flexGrow: 0, mt: '10px' }}>
        <Typography variant='body1' component={'span'} sx={{ fontWeight: 600 }}>
          {item.growth}%
        </Typography>
        {item.growth > 0 ? (
          <TrendingUpIcon color='success' sx={{ ml: 1, verticalAlign: 'middle' }} fontSize={'small'} />
        ) : (
          <TrendingDownIcon color='error' sx={{ ml: 1, verticalAlign: 'middle' }} fontSize={'small'} />
        )}
      </ListItemText>
    </ListItemButton>
  )
}

export default SocialChannelItem
