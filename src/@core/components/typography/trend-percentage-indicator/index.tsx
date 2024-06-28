import { Box, Typography, styled } from '@mui/material'

// {Number(keyMetricValue).toLocaleString()}

const TrendIcon = styled('img')({
  height: 'auto',
  width: '15px',
  marginBottom: '3px',
  marginLeft: '4px'
})

const TrendPercentageIndicator = ({ growth = -1.2 }: { growth: string | number }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography
        variant='body1'
        sx={theme => ({
          fontSize: '16px',
          fontWeight: '700',
          color: theme.palette.text.primary,
          letterSpacing: '0px',
          display: 'inline-block'
        })}
      >
        {growth}%
      </Typography>
      {Number(growth) >= 0 ? (
        <TrendIcon src='images/icons/trend-icons/ind-triangle-up-green.png' />
      ) : (
        <TrendIcon src='images/icons/trend-icons/ind-triangle-down-red.png' />
      )}
    </Box>
  )
}

export default TrendPercentageIndicator
