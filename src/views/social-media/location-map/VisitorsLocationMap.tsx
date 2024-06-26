// **Next Imports
import dynamic from 'next/dynamic'

// **MUI Imports
import { Box } from '@mui/material'

// **Vendor Imports
const WorldVectorMap = dynamic(() => import('src/@core/components/maps/vector-maps/WorldVectorMap'), {
  ssr: false
})

const VisitorsLocationMap = ({ data }: { data: any }) => {
  return (
    <Box sx={{height: '100%', width: '100%'}}>
      <WorldVectorMap options={data} />
    </Box>
  )
}

export default VisitorsLocationMap
