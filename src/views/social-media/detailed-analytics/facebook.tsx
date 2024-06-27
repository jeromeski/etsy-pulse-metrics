import { Grid, Box, Typography, Card, CardHeader, CardContent } from '@mui/material'
import CustomSvgIcon from 'src/@core/components/svg-icon'
import RechartsBarChart from 'src/views/recharts/RechartsBarChart'
import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts'
import CustomToolTip from 'src/@core/components/tool-tip-chart'

interface Props {
  direction: 'ltr' | 'rtl'
}

interface PickerProps {
  start: Date | number
  end: Date | number
}

const data = [
  {
    name: '7/12',
    Apple: 80,
    Samsung: 130,
    Oneplus: 150,
    Motorola: 210
  },
  {
    name: '8/12',
    Apple: 100,
    Samsung: 150,
    Oneplus: 170,
    Motorola: 380
  },
  {
    name: '9/12',
    Apple: 80,
    Samsung: 140,
    Oneplus: 160,
    Motorola: 220
  },
  {
    name: '10/12',
    Apple: 100,
    Samsung: 150,
    Oneplus: 170,
    Motorola: 380
  },
  {
    name: '11/12',
    Apple: 50,
    Samsung: 90,
    Oneplus: 110,
    Motorola: 150
  },
  {
    name: '12/12',
    Apple: 125,
    Samsung: 90,
    Oneplus: 100,
    Motorola: 65
  },
  {
    name: '13/12',
    Apple: 70,
    Samsung: 110,
    Oneplus: 130,
    Motorola: 210
  },
  {
    name: '14/12',
    Apple: 100,
    Samsung: 150,
    Oneplus: 170,
    Motorola: 380
  },
  {
    name: '15/12',
    Apple: 80,
    Samsung: 100,
    Oneplus: 120,
    Motorola: 180
  },
  {
    name: '16/12',
    Apple: 30,
    Samsung: 60,
    Oneplus: 70,
    Motorola: 110
  }
]

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
        height,
        display: 'flex',
        justifyContent: 'center'
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

const FacebookDetailedAnalytics: React.FC<Props> = ({ direction }) => {
  const { isMobileXs, isMobileS, isMobileM, isMobileL, isTablet, isLaptop, isLaptopL, isDesktop } =
    useDeviceSizesMediaQuery()
  return (
    <Grid container>
      <Grid item xs='auto' spacing={2}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' } }}>
          {isMobileXs ||
            isMobileS ||
            isMobileM ||
            (isMobileL && (
              <>
                <SocMedMobileScreenHeader
                  background='linear-gradient(90deg, rgba(33,51,87,1) 0%, rgba(66,103,178,1) 50%, rgba(33,51,87,1) 100%)'
                  width='100%'
                  height='100%'
                >
                  <CustomSvgIcon id='icon-facebook-square' color='#4267B2' />
                </SocMedMobileScreenHeader>
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px 15px' }}>
                  <Typography
                    variant='h1'
                    sx={{
                      fontSize: {
                        xs: '20px',
                        lg: '20px'
                      },
                      fontWeight: '700',
                      letterSpacing: '0px',
                      color: 'dark grey'
                    }}
                  >
                    Channel Statistics
                  </Typography>
                </Box>
              </>
            ))}
          <Box sx={{ backgroundColor: '#4267B2', maxWidth: '100%' }}>
            <CustomSvgIcon id='icon-facebook-square' color='#4267B2' />
          </Box>
        </Box>
      </Grid>
      <Grid item zeroMinWidth sx={{ flexGrow: 1 }}>
        <Card
          sx={{
            height: {
              xs: 150,
              sm: 'auto'
            },
            width: '100%',
            maxWidth: '100%'
          }}
        >
          <CardHeader
            title='Monthly Engagement Metrics'
            titleTypographyProps={{ variant: 'h6' }}
            sx={{
              flexDirection: ['column', 'row'],
              alignItems: ['flex-start', 'center'],
              '& .MuiCardHeader-action': { marginBottom: 0 },
              '& .MuiCardHeader-content': { marginBottom: [2, 0] }
            }}
          />
          <CardContent sx={{}}>
            <ResponsiveContainer height='100%' width='100%'>
              <BarChart data={data} barSize={15} style={{ direction }} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' reversed={direction === 'rtl'} />
                <YAxis orientation={direction === 'rtl' ? 'right' : 'left'} />
                <Tooltip content={<CustomToolTip />} />
                <Bar dataKey='Apple' fill='#3b5998' />
                <Bar dataKey='Samsung' fill='#4267B2' />
                <Bar dataKey='Oneplus' fill='#8b9dc3' />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default FacebookDetailedAnalytics
