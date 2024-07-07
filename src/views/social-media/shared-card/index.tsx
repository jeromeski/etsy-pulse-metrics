import { Box, Card, CardContent, CardHeader } from '@mui/material'
import TitleCardHeader from 'src/@core/components/typography/title-card-header'
import TrendGraphTileActions from 'src/views/social-media/basic-metrics/TrendGraphTileActions'

interface SocMedSharedCardProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

const SocMedSharedCard: React.FC<SocMedSharedCardProps> = ({ title, subtitle, children }) => {
  return (
    <Card
      sx={{
        padding: { xs: '10px 10px 0 10px', md: '15px 15px 0 15px' },
        height: '100%',
        width: '100%',
        borderRadius: '5px'
      }}
    >
      {title && (
        <CardHeader
          title={<TitleCardHeader size='medium'>{title}</TitleCardHeader>}
          subtitle={subtitle}
          action={<TrendGraphTileActions />}
          sx={{
            padding: 0,
            marginBottom: '20px'
          }}
        />
      )}
      <CardContent sx={{ padding: '0', paddingRight: '10px' }}>
        <Box sx={{ height: '100%', width: '100%', minHeight: '270px' }}>{children}</Box>
      </CardContent>
    </Card>
  )
}

export default SocMedSharedCard
