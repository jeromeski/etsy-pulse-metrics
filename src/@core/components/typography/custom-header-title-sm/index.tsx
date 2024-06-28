import React from 'react'

import { Typography } from '@mui/material'

const CustomHeaderTitleSm = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography
      variant='h2'
      sx={{
        letterSpacing: '.1px',
        fontSize: {
          xs: '16px'
        },
        fontWeight: {
          xs: '700'
        }
      }}
    >
      {children}
    </Typography>
  )
}

export default CustomHeaderTitleSm
