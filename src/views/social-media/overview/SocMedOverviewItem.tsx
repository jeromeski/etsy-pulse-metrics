// React Imports
import React from 'react'

// **Mui Imports
import { Box, Typography, styled, Divider, Grid } from '@mui/material'

// **Type Imports
import { BasicSocMedOverviewData } from 'src/types/social-media'
import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'

const StyledImage = styled('img')({
  height: 'auto',
  width: '50px'
})

const BasicSocMedOverviewItem: React.FC<BasicSocMedOverviewData> = ({ iconURL, title, keyMetricValue }) => {
  const { isMobileXs, isMobileS, isMobileM, isTablet, isLaptopS, isLaptopL, isDesktop } = useDeviceSizesMediaQuery()
  return (
    <Grid item>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '100%',
          margin: '.5rem 0',
          padding: '0 1.5rem'
        }}
      >
        <Box sx={{ marginBottom: '.75rem' }}>
          <StyledImage src={iconURL} />
        </Box>
        <Box>
          <Typography
            variant='h4'
            sx={theme => ({ fontWeight: '900', fontSize: '2rem', color: theme.palette.common.black })}
          >
            {Number(keyMetricValue).toLocaleString()}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant='body2'
            sx={theme => ({
              fontSize: '.75rem',
              fontWeight: '900',
              color: theme.palette.grey['A400'],
              letterSpacing: '1px'
            })}
          >
            {title}
          </Typography>
        </Box>
      </Box>
      {isMobileXs || isMobileS || isMobileM ? <Divider /> : <></>}
    </Grid>
  )
}

export default BasicSocMedOverviewItem
