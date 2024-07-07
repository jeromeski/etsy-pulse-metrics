// React Imports
import React from 'react'

// **Mui Imports
import { Box, Typography, styled, Divider, Grid } from '@mui/material'

import CustomDescLabel from 'src/@core/components/typography/custom-desc-label'
import CustomMetricLabelMd from 'src/@core/components/typography/custom-metric-label-md'

// **Type Imports
import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'
import { SocMedMetricsItem } from 'src/views/social-media/types'

const StyledImage = styled('img')({
  height: 'auto',
  width: '45px'
})

const SocMedOverviewItem: React.FC<SocMedMetricsItem> = ({ id, iconURL, title, keyMetricValue }) => {
  const { isMobileXs, isMobileS, isMobileM, isTablet, isLaptop, isLaptopL, isDesktop } = useDeviceSizesMediaQuery()
  return (
    <Box
      key={id}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1rem 1rem',
        flex: {
          xs: '0 1 150px',
          lg: '0 1 120px'
        },
        padding: '0 10px 0 10px'
      }}
    >
      <Box sx={{ marginBottom: '7px' }}>
        <StyledImage src={iconURL} />
      </Box>
      <Box>
        <CustomMetricLabelMd>{Number(keyMetricValue).toLocaleString()}</CustomMetricLabelMd>
      </Box>
      <Box sx={{ marginBottom: '1rem' }}>
        <CustomDescLabel>{title}</CustomDescLabel>
      </Box>
      {isMobileXs || isMobileS || isMobileM ? <Divider /> : <></>}
    </Box>
  )
}

export default SocMedOverviewItem
