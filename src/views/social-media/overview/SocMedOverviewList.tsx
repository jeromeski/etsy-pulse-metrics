// **Mui Imports
import { Box, Grid } from '@mui/material'

const SocMedOverviewList = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box>
      <Grid
        container
        sx={theme => ({
          justifyContent: 'center',
          [theme.breakpoints.between('md', 'lg')]: {
            justifyContent: 'flex-start'
          }
        })}
      >
        {children}
      </Grid>
    </Box>
  )
}

export default SocMedOverviewList
