// **Mui Imports
import { TooltipProps } from 'recharts'
import { Box, Divider, Typography } from '@mui/material'

// ** Icons Imports
import Circle from 'mdi-material-ui/Circle'

const TooltipChart = (data: TooltipProps<any, any>) => {
  const { active, payload } = data

  if (active && payload) {
    return (
      <div className='recharts-custom-tooltip'>
        <Typography>{data.label}</Typography>
        <Divider />
        {data &&
          data.payload &&
          data.payload.map((i: any) => {
            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }} key={i.dataKey}>
                <Circle sx={{ color: i.fill, marginRight: 2.5, fontSize: '0.6rem' }} />
                <span>
                  {i.dataKey} : {i.payload[i.dataKey]}
                </span>
              </Box>
            )
          })}
      </div>
    )
  }

  return null
}

export default TooltipChart
