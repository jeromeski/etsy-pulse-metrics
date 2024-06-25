// ** React Imports
import React, { useEffect, useState } from 'react'

// **Mui Imports
import { Box, Button, Card, CardHeader, Typography, Rating, LinearProgress } from '@mui/material'

// ** Api Imports
import { getOrganizationName, getGoogleReviews } from 'src/apis'

// ** Vendor Imports
import toast from 'react-hot-toast'

// ** Custom Imports
import ControlledInfiniteScroll from 'src/@core/components/controlled-infinite-scroll'

// ** Data Imports
import { initGoogleReviews } from 'src/apis/defaults'

// ** Types
import { Review, OverallReviewRating } from 'src/apis/types'

// ** Utils
// import { generateRandomId } from 'src/@brandkit-dummy/functions/functions'
import GoogleReviewsItem from 'src/views/google-reviews/review'
import TypingDots from '../../google-reviews/TypingDots'

interface TabIdx {
  currentTab: number
}

const EcommerceGoogleReviews: React.FC<TabIdx> = ({ currentTab }: TabIdx): JSX.Element => {
  const [reviews, setReviews] = useState<Review[] | undefined | null>(null)
  const [overallRating, setOverallRating] = useState<OverallReviewRating | null>(null)
  const [reviewLink, setReviewLink] = useState<string>('')

  useEffect(() => {
    const getReviews = async () => {
      const companyData = window.localStorage.getItem('company')
      if (companyData === null) {
        throw new Error('Company not found')
      }
      try {
        const parsedCompanyData = JSON.parse(companyData)
        const placeId = await getOrganizationName(parsedCompanyData?.companyName)
        if (placeId) {
          const resReviews = await getGoogleReviews(placeId, parsedCompanyData.companyName)
          if (resReviews && resReviews.reviews && resReviews.overallRating && resReviews.reviewLink) {
            setReviews(resReviews.reviews)
            setOverallRating(resReviews.overallRating)
            setReviewLink(resReviews.reviewLink)
          }
        } else {
          console.warn('Placeholders are now being used.')
          setReviews(initGoogleReviews.reviews)
          setOverallRating(initGoogleReviews.overallRating)
          setReviewLink(initGoogleReviews.reviewLink)
        }
      } catch (error) {
        // throw error
      }
    }
    getReviews()
  }, [])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(reviewLink)
      toast.success('Copied to Clipboard')
    } catch (err) {
      console.error('Unable to copy to clipboard', err)
      toast.error('Unable to copy to clipboard')
    }
  }

  const accumulateRatingCounts = (reviews: Review[]) => {
    const ratings = reviews?.map((r: any) => ({ rating: r.rating }))
    const ratingCounts: { [key: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }

    ratings.forEach((review: any) => {
      ratingCounts[review.rating]++
    })

    return ratingCounts
  }
  if (currentTab === 1 && reviews) {
    return (
      <Card sx={{ mt: 3, p: 5 }}>
        <CardHeader title='Reviews' sx={{ px: 0 }} />

        <Box
          sx={{
            border: 1,
            borderRadius: 1,
            borderColor: 'grey.300',
            p: 5,
            display: 'flex',
            flexWrap: 'wrap'
          }}
        >
          <Box sx={{ mr: 10 }}>
            <Typography sx={{ fontWeight: '500', fontSize: '1.2rem' }}>Overall Rating</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: '500', fontSize: '2.5rem' }}>{overallRating || 0}</Typography>
              <Typography variant='caption' sx={{ fontWeight: '500' }}>
                {' '}
                Based on {reviews?.length || 0} reviews
              </Typography>
              <Rating value={overallRating || 0} precision={0.1} readOnly size='small' />
              <Typography variant='caption' sx={{ fontWeight: '500' }}>
                {' '}
                Want more reviews?
              </Typography>
              <Button variant='contained' color='primary' size='small' sx={{ mt: 4 }} onClick={copyToClipboard}>
                Share Google Link
              </Button>
            </Box>
          </Box>
          <Box sx={{ flex: '1' }}>
            {[5, 4, 3, 2, 1].map(rating => (
              <Box key={rating} sx={{ width: '100%', my: 1, display: 'flex', gap: 2 }}>
                <Typography variant='caption'>{rating} Star</Typography>
                <LinearProgress
                  variant='determinate'
                  value={(accumulateRatingCounts(reviews)[rating] / reviews.length) * 100 || 0}
                  sx={{ borderRadius: '5px', height: '1.5rem', flex: '1' }}
                />
              </Box>
            ))}
          </Box>
        </Box>
        <ControlledInfiniteScroll
          data={reviews}
          loader={<TypingDots />}
          renderItem={(item: Review) => <GoogleReviewsItem review={item} key={item.id} />}
        />
      </Card>
    )
  }
  return <></>
}

export default React.memo(EcommerceGoogleReviews)
