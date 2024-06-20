// **Mui Imports
import { styled } from "@mui/material/styles";
import { Card, Box, Typography, Grid } from "@mui/material";
import { TrendingDown, TrendingUp } from "@mui/icons-material";

interface BasicMetricCardsProps {
	title: string;
	keyMetricValue: string;
	likesComparisonDays: string;
	growth: string;
}

const StyledCard = styled(Card)({
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  width: '15rem',
  borderRadius: '10px',
  marginBottom: '1rem'
})

const BasicMetricsCard = ({ title, keyMetricValue, likesComparisonDays, growth }: BasicMetricCardsProps) => {
  return (
    <StyledCard>
      <Box sx={{ marginBottom: '2rem' }}>
        <Typography variant='body1' sx={{ fontWeight: '600', color: '#1D1D1D' }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant='h4' sx={{ fontWeight: '900' }}>
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
        <Typography variant='body1' sx={{ display: 'inline-block', fontWeight: '700', color: '#1D1D1D' }}>
          <b>{growth}%</b>
        </Typography>
        {Number(growth) >= 0 ? <TrendingUp color='success' /> : <TrendingDown color='error' />}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography
          sx={{
            fontWeight: '600',
            fontSize: '.75rem',
            color: '#1D1D1D',
            letterSpacing: '1px'
          }}
        >
          vs previous {likesComparisonDays} days
        </Typography>
      </Box>
    </StyledCard>
  )
}

export default BasicMetricsCard;
