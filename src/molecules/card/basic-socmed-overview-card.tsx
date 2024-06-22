// React Imports
import React from "react";

// **Mui Imports
import { Card, Box, Typography, styled, Grid, Divider } from '@mui/material'

// **Data Imports
import { SIMPLE_SOCMED_CARD_METRICS } from 'src/data'

// **Type Imports
import { BasicSocMedOverviewData } from 'src/types/social-media'
import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'
import { PaletteMode } from '@mui/material'

const StyledImage = styled('img')({
  height: 'auto',
  width: '50px'
})

const BasicSocmedOverviewItem: React.FC<BasicSocMedOverviewData> = ({ iconURL, title, keyMetricValue }) => {
  const { isMobileXs, isMobileS, isMobileM, isTablet, isLaptopS, isLaptopL, isDesktop } = useDeviceSizesMediaQuery()

  return (
    <Grid item>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          // width: '150px',
          maxWidth: '100%',
          margin: '.5rem 0',
          // backgroundColor: 'pink',
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
          // [theme.breakpoints.up('md')]: {
          //   fontSize: '1.25rem'
          // },
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
        <Box sx={theme => ({})}>
          <Grid
            container
            sx={theme => ({
              justifyContent: 'center',
              [theme.breakpoints.between('md', 'lg')]: {
                justifyContent: 'flex-start'
              }
            })}
          >
            {SIMPLE_SOCMED_CARD_METRICS ? (
              SIMPLE_SOCMED_CARD_METRICS?.map(item => (
                <BasicSocmedOverviewItem
                  key={item.id}
                  iconURL={item.iconURL}
                  title={item.title}
                  keyMetricValue={item.keyMetricValue}
                />
              ))
            ) : (
              <></>
            )}
          </Grid>
        </Box>
      </Box>
    </Card>
  )
}

export default BasicSocMedOverviewCard;
