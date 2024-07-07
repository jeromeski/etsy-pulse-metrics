// ** React Imports
import React from 'react'

//  **Mui Imports
import { Box } from '@mui/material'

import SocialMediaBarChart from 'src/views/social-media/bar-chart'

const FbSpecificAnalyticsView = () => {
  return (
    <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
      <SocialMediaBarChart />
    </Box>
  )
}

export default FbSpecificAnalyticsView
