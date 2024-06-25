// **Mui Imports
import { Box, Typography } from '@mui/material'
import { TrendingDown, TrendingUp } from '@mui/icons-material'

// **Type Imports
import { BasicMetricCardsProps } from 'src/views/social-media/types' 

// **
import CustomHeaderTitleSm from 'src/@core/components/typography/custom-header-title-sm'
import CustomMetricLabelLg from 'src/@core/components/typography/custom-metric-label-lg'
import CustomDescLabel from 'src/@core/components/typography/custom-desc-label'

const BasicMetricsCardItem = ({ title, keyMetricValue, likesComparisonDays, growth }: BasicMetricCardsProps) => {
  return (
    <Box sx={(theme) => ({
        flex: '1 1 200px',
        margin: '0 10px 0 0',
        backgroundColor: theme.palette.common.white,
        borderRadius: '10px',
        boxShadow: '0px 2px 10px 0px rgba(58, 53, 65, 0.1)',
      })}>
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
          <CustomHeaderTitleSm>
            {title}
          </CustomHeaderTitleSm>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CustomMetricLabelLg>
            {Number(keyMetricValue).toLocaleString()}
          </CustomMetricLabelLg>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}
        >
          <CustomDescLabel>
            {growth}%
          </CustomDescLabel>
          {Number(growth) >= 0 ? <TrendingUp color='success' /> : <TrendingDown color='error' />}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CustomDescLabel>
            vs previous {likesComparisonDays} days
          </CustomDescLabel>
        </Box>
      </Box>
    </Box>
  )
}

export default BasicMetricsCardItem
