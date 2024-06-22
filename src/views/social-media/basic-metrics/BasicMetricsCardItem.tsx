// **Mui Imports
import { Card, Box, Typography } from '@mui/material'
import { TrendingDown, TrendingUp } from '@mui/icons-material'

interface BasicMetricCardsProps {
  title: string
  keyMetricValue: string
  likesComparisonDays: string
  growth: string
}

const BasicMetricsCardItem = ({ title, keyMetricValue, likesComparisonDays, growth }: BasicMetricCardsProps) => {
  return (
    <Card
      sx={theme => ({
        maxWidth: '100%',
        margin: '1rem',
        [theme.breakpoints.between('sm', 'md')]: {
          margin: '1rem .5rem'
        }
      })}
    >
      <Box
        sx={{
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem',
          borderRadius: '10px',
          marginBottom: '1rem'
        }}
      >
        <Box sx={{ marginBottom: '2rem' }}>
          <Typography
            variant='h6'
            sx={theme => ({
              fontWeight: '800',
              color: theme.palette.text.primary,
              paddingLeft: '.5rem',
              [theme.breakpoints.up('md')]: {
                fontSize: '1rem'
              }
            })}
          >
            {title}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography
            variant='h4'
            sx={theme => ({
              fontWeight: '900',
              color: theme.palette.common.black,
              fontSize: '2rem',
              [theme.breakpoints.between('md', 'xl')]: {
                fontSize: '2.5rem !important'
              },
              letterSpacing: '.5px'
            })}
          >
            {Number(keyMetricValue).toLocaleString()}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: '700',
            marginBottom: '1.5rem'
          }}
        >
          <Typography
            variant='body1'
            sx={theme => ({
              display: 'inline-block',
              fontWeight: '800',
              color: theme.palette.text.primary
            })}
          >
            {growth}%
          </Typography>
          {Number(growth) >= 0 ? <TrendingUp color='success' /> : <TrendingDown color='error' />}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography
            sx={theme => ({
              fontWeight: '700',
              fontSize: '.9rem',
              color: theme.palette.text.primary
              // letterSpacing: '.1px'
            })}
          >
            vs previous {likesComparisonDays} days
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default BasicMetricsCardItem
