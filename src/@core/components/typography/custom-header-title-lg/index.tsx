// **React
import React from 'react'
// **Mui Imports
import { Typography } from '@mui/material'

const CustomHeaderTitleLg = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography
      variant='h2'
      sx={{
        letterSpacing: '0px',
        marginBottom: {
          xs: '1rem',
          md: '1.5rem'
        },
        fontSize: {
          xs: '16px',
          sm: '17px',
          lg: '18px'
        },
        fontWeight: 700
      }}
    >
      {children}
    </Typography>
  )
}

export default CustomHeaderTitleLg
