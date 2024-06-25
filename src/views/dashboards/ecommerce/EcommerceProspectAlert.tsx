// ** MUI Imports
import { Stack, Grid, Alert, AlertTitle, Button, Typography } from '@mui/material'
import { StackExchange } from 'mdi-material-ui'
import { useRouter } from 'next/router'

const EcommerceProspectAlert = () => {
  const router = useRouter()

  const handleAddProspectsButton = () => {
    router.push({ pathname: '/prospects', query: { loadProspectGuide: true } })
  }

  return (
    <Grid item xs={12} sx={{ mb: 3, mt: 6 }}>
      <Alert
        severity='info'
        sx={{ '& a': { fontWeight: 400 } }}
        action={<Button onClick={handleAddProspectsButton}>Add more prospects</Button>}
      >
        <AlertTitle sx={{ fontSize: '20px', fontWeight: 'bold' }}>Welcome to Opportunities </AlertTitle>

        <Typography>
          Noticed your <strong>prospect</strong> list is empty? Let's change that! Click here to start filling it with
          potential leads. We're excited to help you grow!
        </Typography>
      </Alert>
    </Grid>
  )
}
export default EcommerceProspectAlert
