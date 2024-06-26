  import { ApexOptions } from 'apexcharts'
  
  export const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      zoom: { enabled: false },
      toolbar: { show: false }
    },
    markers: {
      strokeWidth: 5,
      strokeOpacity: 1,
      colors: ['#1877f2', '#c32aa3', '#ff0000', '#1da1f2'],
      strokeColors: ['#1877f2', '#c32aa3', '#ff0000', '#1da1f2']
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    colors: ['#1877f2', '#c32aa3', '#ff0000', '#1da1f2'],
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      },
      padding: {
        top: -10
      }
    },
    tooltip: {
      custom(data: any) {
        return `<div class='bar-chart'>
          <span>${data.series[data.seriesIndex][data.dataPointIndex]}%</span>
        </div>`
      }
    },
    xaxis: {
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ]
    }
  }