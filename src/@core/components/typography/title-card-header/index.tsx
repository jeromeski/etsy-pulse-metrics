// **React
import React from 'react'
// **Mui Imports
import { Typography } from '@mui/material'

interface TitleCardHeaderProps {
  size: 'large' | 'medium' | 'small'
  children: React.ReactNode
}

const textSizes = {
  large: {
    xs: '18px',
    sm: '20px',
    lg: '22px'
  },
  medium: {
    xs: '16px',
    sm: '17px',
    lg: '18px'
  },
  small: {
    xs: '14px',
    sm: '15px',
    lg: '16px'
  }
}

interface TextSizeProps {
  xs?: string
  sm?: string
  md?: string
  lg?: string
}

const TitleCardHeader: React.FC<TitleCardHeaderProps> = ({ size, children }) => {
  const titleSize = textSizes[size]

  return (
    <Typography
      variant='h2'
      sx={theme => ({
        color: theme.palette.text.secondary,
        letterSpacing: '0px',
        fontWeight: 700,
        fontSize: { ...titleSize }
      })}
    >
      {children}
    </Typography>
  )
}

export default TitleCardHeader
