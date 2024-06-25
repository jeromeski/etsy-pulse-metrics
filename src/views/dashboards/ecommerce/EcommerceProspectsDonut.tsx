import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const radialBarColors = {
  series1: '#00d4bd',
}

const EcommerceProspectsDonut = () => {
  const options: ApexOptions = {
    legend: {
      show: true,
      position: 'bottom'
    },
    stroke: { width: 0 },
    labels: ['Prospects'],
    colors: [radialBarColors.series1],
    dataLabels: {
      enabled: true,
      formatter(val: string) {
        return `${parseInt(val, 10)}%`
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '2rem',
              fontFamily: 'Montserrat'
            },
            value: {
              fontSize: '1rem',
              fontFamily: 'Montserrat',
              formatter(val: string) {
                return `${parseInt(val, 10)}MB`
              }
            },
            total: {
              show: true,
              fontSize: '1.5rem',
              label: 'Total',
              formatter() {
                return '500'
              }
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 370
          },
          legend: {
            position: 'right'
          }
        }
      },
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1.5rem'
                  },
                  value: {
                    fontSize: '1rem'
                  },
                  total: {
                    fontSize: '1.5rem'
                  }
                }
              }
            }
          }
        }
      }
    ]
  }

  const series = [500]

  return (
    <Card sx={{ position: 'relative', overflow: 'visible', marginTop: { xs: 7.5 } }}>
      <CardHeader
        title='Prospects'
        titleTypographyProps={{ variant: 'h6' }}
        subheaderTypographyProps={{ variant: 'caption', sx: { color: 'text.disabled' } }}
      />
      <CardContent
        sx={{
          '& .apexcharts-canvas .apexcharts-pie .apexcharts-datalabel-label, & .apexcharts-canvas .apexcharts-pie .apexcharts-datalabel-value':
            { fontSize: '1.2rem' }
        }}
      >
        <ReactApexcharts options={options} series={series} type='donut' />
      </CardContent>
      <Button>
        Upgrade
      </Button>
    </Card>
  )
}

export default EcommerceProspectsDonut
