// ** React Imports
import { useState, SyntheticEvent, useEffect, useCallback } from 'react'

// ** MUI Imports
import { Grid, Alert, AlertTitle, Button, CircularProgress } from '@mui/material'

// ** API import
import Api from 'src/common/api.js'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Third Party Imports
import toast from 'react-hot-toast'

interface EcommerceAlertsProps {
  title: string
  type: string
  handleOTPModal: (value: boolean) => void
}

const EcommerceAlerts = (props: EcommerceAlertsProps) => {
  const { title, type, handleOTPModal } = props

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const resend = async () => {
    setIsLoading(true)
    const data = window.localStorage.getItem('userData')
    try {
      if (data !== null) {
        const parsedData = JSON.parse(data)
        let res
        if (type === 'email') {
          res = await Api.resendConfirmation(parsedData)

          if (res?.status === 201) {
            setIsLoading(false)
            toast.success('Confirmation Sent Successfully')
          } else {
            setIsLoading(false)
            toast.error('Sent Failed, Try Again Later')
          }
        } else if (type === 'phone') {
          res = await Api.verifyPhone(parsedData)

          if (res?.status === 200) {
            setIsLoading(false)
            handleOTPModal(true)
            toast.success('Code Sent Successfully')
          } else {
            setIsLoading(false)
            toast.error('Sent Failed, Try Again Later')
          }
        }
      }
    } catch (err) {
      console.error('Error during API call:', err)
    }
  }

  return (
    <Grid item xs={12} sx={{ mb: 3, mt: 6 }}>
      <Alert severity='warning' sx={{ '& a': { fontWeight: 400 } }}>
        <AlertTitle sx={{ display: 'inline' }}>{title}</AlertTitle>
        {type === 'email' ? (
          <Button variant='contained' color='primary' size='small' sx={{ ml: 2 }} disabled={isLoading} onClick={resend}>
            {isLoading ? (
              <CircularProgress variant='indeterminate' disableShrink={true} size={22} color='inherit' />
            ) : (
              'Resend Confirmation'
            )}
          </Button>
        ) : (
          <Button variant='contained' color='primary' size='small' sx={{ ml: 2 }} disabled={isLoading} onClick={resend}>
            {isLoading ? (
              <CircularProgress variant='indeterminate' disableShrink={true} size={22} color='inherit' />
            ) : (
              'Send Confirmation Code'
            )}
          </Button>
        )}
      </Alert>
    </Grid>
  )
}
export default EcommerceAlerts
