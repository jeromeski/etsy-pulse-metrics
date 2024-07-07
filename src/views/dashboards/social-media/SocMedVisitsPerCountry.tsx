// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Imports
import { Card, Box, CardContent, IconButton, Divider } from '@mui/material'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Custom Component Imports
import SocMedVisitsPerCountryItem from 'src/views/social-media/visits-per-country/SocMedVisitsPerCountryItem'
import CustomHeaderTitleLg from 'src/@core/components/typography/custom-header-title-lg'
import CardControlledComment from 'src/@core/components/card-controlled-comment'


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
    <CardControlledComment title='Visits Per Country' subtitle='Fb audience views' sx={{ '& .MuiCardHeader-root': {paddingBottom: '5px'}, '& .MuiCardContent-root': {paddingBottom: '5px'}}}>
      <Divider sx={{padding: 0, margin: '0 0 10px 0'}}/>
      { countriesData?.map((item: DataType, index: number, array) => {
          return <SocMedVisitsPerCountryItem key={item.id} item={item} index={index} _data={array} />
      })}
    </CardControlledComment>
  )
}

export default React.memo(SocMedVisitsPerCountry)
