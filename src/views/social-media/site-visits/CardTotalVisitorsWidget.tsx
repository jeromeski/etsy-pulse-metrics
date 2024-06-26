// ** React Imports
import React from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'

// **
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Third Party Imports
import { TotalVisitorsWidgetProps } from 'src/views/social-media/types'

const CardTotalVisitorsWidget: React.FC<TotalVisitorsWidgetProps> = ({ options }) => {
  const theme = useTheme()
  return (
    <Card>
      <CardHeader
        title='Total Visitors'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent
        sx={{
          '& .apexcharts-datalabel-label': {
            lineHeight: '1.313rem',
            letterSpacing: '0.25px',
            fontSize: '0.875rem !important',
            fill: `${theme.palette.text.secondary} !important`
          },
          '& .apexcharts-datalabel-value': {
            letterSpacing: 0,
            lineHeight: '2rem',
            fontWeight: '500 !important'
          }
        }}
      >
        <ReactApexcharts type='donut' height={292} series={[12, 25, 13, 50]} options={options} />
      </CardContent>
    </Card>
  )
}

export default React.memo(CardTotalVisitorsWidget)
