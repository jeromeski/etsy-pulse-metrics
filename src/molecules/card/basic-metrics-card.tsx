// **Mui Imports
import { Card, Box, Typography, Grid } from '@mui/material'
import { TrendingDown, TrendingUp } from '@mui/icons-material'

interface BasicMetricCardsProps {
  title: string
  keyMetricValue: string
  likesComparisonDays: string
  growth: string
}

const BasicMetricsCard = ({ title, keyMetricValue, likesComparisonDays, growth }: BasicMetricCardsProps) => {
  return (
    <Card
      sx={theme => ({
        maxWidth: '100%'
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
            variant='body1'
            sx={theme => ({
              fontWeight: '700',
              color: theme.palette.text.primary
            })}
          >
            {title}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography
            variant='h3'
            sx={theme => ({
              fontWeight: '900',
              color: theme.palette.common.black,
              fontSize: '2rem',
              [theme.breakpoints.between('md', 'xl')]: {
                fontSize: '2.25rem !important'
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
            marginBottom: '2rem'
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
              color: theme.palette.text.primary,
              letterSpacing: '.1px'
            })}
          >
            vs previous {likesComparisonDays} days
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default BasicMetricsCard
