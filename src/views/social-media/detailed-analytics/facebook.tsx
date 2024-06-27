import { Grid, Box, Typography, darken } from '@mui/material'
import CustomSvgIcon from 'src/@core/components/svg-icon'
import CustomHeaderTitleLg from 'src/@core/components/typography/custom-header-title-lg'

interface MobileScreenHeaderProps {
  children: React.ReactNode
  background: string
  width: string
  height: string
}

const SocMedMobileScreenHeader = ({
  background,
  width = '100%',
  height = '100%',
  children
}: MobileScreenHeaderProps) => {
  return (
    <Box
      sx={{
        background,
        width,
        height
      }}
    >
      <Box
        sx={{
          height: 'auto',
          width: '60px',
          padding: '10px 10px'
        }}
      >
        {children}
      </Box>{' '}
    </Box>
  )
}

const FacebookDetailedAnalytics = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <SocMedMobileScreenHeader
            background='linear-gradient(86deg, rgba(66,103,178,1) 35%, rgba(36,53,89,1) 100%)'
            width='100%'
            height='100%'
          >
            <CustomSvgIcon id='icon-facebook-square' color='#4267B2' />
          </SocMedMobileScreenHeader>
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px 15px' }}>
            <Typography
              variant='h1'
              sx={{ fontSize: '16px', fontWeight: '600', letterSpacing: '0px', color: 'dark grey' }}
            >
              Channel Statistics
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ height: '100px', width: '100%', backgroundColor: 'red' }}></Box>
      </Grid>
    </Grid>
  )
}

export default FacebookDetailedAnalytics
