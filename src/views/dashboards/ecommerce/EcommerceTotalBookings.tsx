import Card from '@mui/material/Card'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useEffect } from 'react'

import Grid from '@mui/material/Grid'
import CustomChip from 'src/@core/components/mui/chip'

import { useTheme } from '@mui/material/styles'

// import dispatch and selector
import { RootState, useAppDispatch, useAppSelector } from 'src/store/index'

//  import booking actions
import { fetchAllBookingAction, updateYearAction } from 'src/store/apps/bookingDashboard/reduxAction/booking-action'

const EcommerceTotalBookings = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const { year, filteredBookings, summary, listOfYear } = useAppSelector((state: RootState) => state.bookingDashboard)

  useEffect(() => {
    dispatch(fetchAllBookingAction())
  }, [dispatch])

  // const listOfYearAsNumbers: number[] = listOfYear?.map(Number)

  // const latestYearOfBooking = Math.max(...listOfYearAsNumbers).toString()
  // const oldestYearOfBooking = Math.min(...listOfYearAsNumbers).toString()

  const increaseYearHandler = () => {
    let yearCopy = +year
    yearCopy += 1

    // const isYearCopyIncludedInListOfYear = listOfYear.includes(yearCopy.toString())

    dispatch(updateYearAction(yearCopy.toString()))
  }

  const decreaseYearHandler = () => {
    let yearCopy = +year
    yearCopy -= 1

    // const isYearCopyIncludedInListOfYear = listOfYear.includes(yearCopy.toString())

    dispatch(updateYearAction(yearCopy.toString()))
  }

  return (
    <Card sx={{ position: 'relative', overflow: 'visible' }}>
      <CardContent>
        <Grid container spacing={12}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 4,

                justifyContent: 'space-between'
              }}
            >
              <Typography variant='h6'>Total Bookings</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <CustomChip
                  skin='light'
                  size='small'
                  label={`Year of ${year}`}
                  color='secondary'
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}
                />
                <Box sx={{ display: 'flex' }}>
                  <Button
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        color: theme.palette.primary.main,
                        backgroundColor: 'transparent'
                      },
                      minHeight: 0,
                      minWidth: 0,
                      lineHeight: 0.5,
                      paddingInline: 1,
                      paddingBlock: '5px',
                      ml: 1,
                      fontSize: '1.5rem'
                    }}
                    color='secondary'
                    onClick={decreaseYearHandler}
                  >
                    {'<'}
                  </Button>
                  <Button
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        color: theme.palette.primary.main,
                        backgroundColor: 'transparent'
                      },
                      minHeight: 0,
                      minWidth: 0,
                      lineHeight: 0.5,
                      paddingInline: 1,
                      paddingBlock: '5px',
                      fontSize: '1.5rem'
                    }}
                    color='secondary'
                    onClick={increaseYearHandler}
                  >
                    {'>'}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item sx={{ display: { xs: 'block', md: 'flex' }, alignItems: 'center' }}>
            <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', mb: { xs: 5, md: 0 } }}>
              <Grid item xs={6}>
                <Typography sx={{ mb: 5, fontSize: { xs: 16, md: 18 } }}>Total</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant='h6'>{filteredBookings.length}</Typography>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Typography sx={{ mb: 5, fontSize: { xs: 16, md: 18 } }}>Paid</Typography>
                <Box>
                  <Typography variant='h6' sx={{ fontSize: { xs: 16, md: 18 } }}>
                    {summary.paid > 0 ? summary.paid : 'No Paid'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ mb: 5, fontSize: { xs: 16, md: 18 } }}>Unpaid</Typography>
                <Box>
                  <Typography variant='h6' sx={{ fontSize: { xs: 16, md: 18 } }}>
                    {summary.unPaid > 0 ? summary.unPaid : 'No Unpaid'}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <Grid item xs={6}>
                <Typography sx={{ mb: 5, fontSize: { xs: 16, md: 18 } }}>Confirmed</Typography>
                <Box>
                  <Typography variant='h6' sx={{ fontSize: { xs: 16, md: 18 } }}>
                    {summary.confirmed > 0 ? summary.confirmed : 'No Confirmed'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ mb: 5, fontSize: { xs: 16, md: 18 } }}>Unconfirmed</Typography>
                <Box>
                  <Typography variant='h6' sx={{ fontSize: { xs: 16, md: 18 } }}>
                    {summary.unConfirmed > 0 ? summary.unConfirmed : 'No Unconfirmed'}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default EcommerceTotalBookings
