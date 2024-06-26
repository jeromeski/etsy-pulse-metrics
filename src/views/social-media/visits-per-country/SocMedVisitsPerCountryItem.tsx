import { Box, Card, Typography, IconButton, CardHeader, CardContent } from '@mui/material'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { DataType } from 'src/views/social-media/types'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomDescLabel from 'src/@core/components/typography/custom-desc-label'

interface VisitsPerCountryItemProps {
  item: any
  index: number
  _data: DataType[]
}

const SocMedVisitsPerCountryItem: React.FC<VisitsPerCountryItemProps> = ({ item, index, _data }) => {
  return (
    <Box
      key={item.title}
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: index !== _data.length - 1 ? 5 : undefined
      }}
    >
      <CustomAvatar skin='light' color={item.avatarColor} sx={{ mr: 3, fontSize: '1.125rem' }}>
        {item.avatarText}
      </CustomAvatar>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ mb: 0.5, display: 'flex', alignItems: 'center' }}>
            <CustomDescLabel>{item.title}</CustomDescLabel>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {item.trend}
              <Typography variant='caption' sx={{ color: item.trendDir === 'down' ? 'error.main' : 'success.main' }}>
                {item.trendNumber}
              </Typography>
            </Box>
          </Box>
          <Typography variant='caption'>{item.subtitle}</Typography>
        </Box>

        <Box sx={{ display: 'flex', textAlign: 'end', flexDirection: 'column' }}>
          <CustomDescLabel>{item.pageVisits}</CustomDescLabel>
          <Typography variant='caption'>Visits</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default SocMedVisitsPerCountryItem
