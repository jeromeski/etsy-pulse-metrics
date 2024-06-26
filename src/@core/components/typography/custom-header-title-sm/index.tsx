import React from 'react'

import { Typography } from '@mui/material'

const CustomHeaderTitleSm = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography
      variant='h1'
      sx={{
        paddingLeft: '.5rem',
        letterSpacing: '.1px',
        fontSize: {
          xs: '.95rem'
        },
        fontWeight: {
          xs: '800'
        }
      }}
    >
      {children}
    </Typography>
  )
}

export default CustomHeaderTitleSm
