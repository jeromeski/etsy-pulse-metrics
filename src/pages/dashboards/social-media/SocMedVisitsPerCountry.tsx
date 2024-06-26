// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Imports
import { Card, Box, CardContent, IconButton } from '@mui/material'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Custom Component Imports
import SocMedVisitsPerCountryItem from 'src/views/social-media/visits-per-country/SocMedVisitsPerCountryItem'
import CustomHeaderTitleLg from 'src/@core/components/typography/custom-header-title-lg'

// **Type Imports
import { DataType } from 'src/views/social-media/types'

// **Data Imports
import { SOCMED_VISITS_COUNTRIES } from 'src/views/social-media/data'

const SocMedVisitsPerCountry = () => {
  const [countriesData, setCountriesData] = useState<DataType[] | null>(null)
  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      try {
        if (SOCMED_VISITS_COUNTRIES) {
          setCountriesData(SOCMED_VISITS_COUNTRIES)
        }
      } catch (error) {
        console.log(error)
      }
    }
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <Card sx={{padding: '1rem 1.5rem 1rem 1.5rem', height: '100%, width: 100%' }}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
        <CustomHeaderTitleLg>Visits Per Country</CustomHeaderTitleLg>
        <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
          <DotsVertical />
        </IconButton>
      </Box>
      <CardContent>
        {countriesData?.map((item: DataType, index: number, array) => {
          return <SocMedVisitsPerCountryItem key={item.id} item={item} index={index} _data={array} />
        })}
      </CardContent>
    </Card>
  )
}

export default React.memo(SocMedVisitsPerCountry)
