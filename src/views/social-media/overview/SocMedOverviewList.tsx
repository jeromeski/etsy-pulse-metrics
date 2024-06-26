// **React Imports
import React from 'react'

// **Mui Imports
import { Box, Grid } from '@mui/material'

// **Hooks Imports
import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'

const SocMedOverviewList = ({ children }: { children: React.ReactNode }) => {
  const { isMobileXs, isMobileS, isMobileM, isTablet, isLaptop, isLaptopL, isDesktop } = useDeviceSizesMediaQuery()
  return (
    <Box
      sx={theme => ({
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: {
          xs: 'center',
          sm: 'center',
          md: isLaptop ? 'center' : 'flex-start',
          lg: 'center'
        },
        alignItems: 'center'
      })}
    >
      {children}
    </Box>
  )
}

export default React.memo(SocMedOverviewList)
