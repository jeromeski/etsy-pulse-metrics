import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ChevronUp from 'mdi-material-ui/ChevronUp'
import CustomChip from 'src/@core/components/mui/chip'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

// Styled component for the image
const Img = styled('img')(() => ({
  right: 13,
  bottom: 0,
  height: 185,
  position: 'absolute'
}))

const EcommerceTotalPartners = () => {
  const [totalPartners, setTotalPartners] = useState<number>()
  const [year, setYear] = useState<number>(2023)

  useEffect(() => {
    const fetchApi = async () => {
      const serverUrl = publicRuntimeConfig.backendUrl
      const endPoint = `${serverUrl}/api/cleaners-info`
      axios
        .get(endPoint)
        .then(res => setTotalPartners(res.data.length))
        .catch(err => console.log(err))
    }
    fetchApi()
    setYear(new Date().getFullYear())
  }, [])

  return (
    <Card sx={{ position: 'relative', overflow: 'visible', marginTop: { xs: 7.5 } }}>
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <Typography variant='h6' sx={{ mb: 5 }}>
              Total Partners
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='h6'>{totalPartners}</Typography>
              {/* Future implementation */}
              {/* <ChevronUp sx={{ color: 'success.main' }} /> */}
              {/* <Typography variant='caption' sx={{ color: 'success.main' }}>
                    15.6%
                  </Typography> */}
            </Box>
            <CustomChip
              skin='light'
              size='small'
              label={`Year of ${year}`}
              color='primary'
              sx={{ height: 20, marginTop: 0.4, fontSize: '0.75rem', fontWeight: 600 }}
            />
          </Grid>
          <Grid item xs={6}>
            <Img alt='Total Partners' src='/images/cards/pose_f9.png' />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default EcommerceTotalPartners
