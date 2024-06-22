// React Imports
import React from "react";

// **Mui Imports
import { Card, Box, Typography, styled, Grid, Divider } from '@mui/material'

// **Data Imports
import { SIMPLE_SOCMED_CARD_METRICS } from 'src/data'

// **Type Imports
import { BasicSocMedOverviewData } from 'src/types/social-media'
import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'


const BasicSocMedOverviewCard = () => {
  return (
    <Card
      sx={theme => ({
        padding: '1rem 1rem 2rem 1rem',
        borderRadius: '10px',
        maxWidth: '100%',
        margin: '1rem',
        [theme.breakpoints.down('sm')]: {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }
      })}
    >
      <Typography
        variant='h5'
        sx={theme => ({
          fontSize: '1rem',
          fontWeight: '800',
          color: theme.palette.grey['A400'],
          letterSpacing: '1px',
          marginBottom: '1.5rem',
          [theme.breakpoints.up('md')]: {
            fontSize: '1.25rem'
          }
        })}
      >
        Social Media Followers
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        
      </Box>
    </Card>
  )
}

export default React.memo(BasicSocMedOverviewCard)
