// **React Imports
import React from 'react'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** MUI Imports
import { useTheme } from '@mui/material/styles'

// ** Custom Components Imports
import CardTotalVisitorsWidget from 'src/views/social-media/site-visits/CardTotalVisitorsWidget'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const SocMedSiteVisits = () => {
  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    colors: [
      theme.palette.primary.main,
      hexToRGBA(theme.palette.primary.main, 0.7),
      hexToRGBA(theme.palette.primary.main, 0.5),
      theme.palette.customColors.bodyBg
    ],
    stroke: { width: 0 },
    dataLabels: { enabled: false },
    legend: {
      show: true,
      position: 'bottom'
    },
    labels: ['FR', 'UK', 'ESP', 'USA'],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    plotOptions: {
      pie: {
        customScale: 0.9,
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              offsetY: 25
            },
            value: {
              offsetY: -15,
              formatter: value => `${value}k`
            },
            total: {
              show: true,
              label: 'Weekly Visits',
              formatter: value => `${value.globals.seriesTotals.reduce((total: number, num: number) => total + num)}k`
            }
          }
        }
      }
    }
  }
  return <CardTotalVisitorsWidget options={options} />
}

export default React.memo(SocMedSiteVisits)
