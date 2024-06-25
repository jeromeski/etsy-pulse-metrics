import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

// Styled component for the image
const Img = styled('img')(() => ({
  right: 13,
  bottom: 0,
  height: 185,
  position: 'absolute'
}))

const EcommerceCredits = () => {
  return (
    <Card sx={{ position: 'relative', overflow: 'visible', marginTop: { xs: 7.5 } }}>
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={7}>
            <Box
              sx={{display: 'flex', flexDirection: 'column'}}
            >
              <Typography variant='h6' sx={{ mb: 3 }}>
                Credits
              </Typography>
              <Typography variant='h6'>10 Free SMS</Typography>
              <Box mt={2}>
                <Button sx={{pl: 0}}>
                  Upgrade
                </Button>
              </Box>              
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Img alt='Credits Remaining' src='/images/cards/sms.png' />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default EcommerceCredits
