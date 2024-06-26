// ** React Imports
import React, { useEffect, useState } from 'react'

// ** Data Imports
import { WORLD_CONFIG_OPTS } from 'src/views/social-media/data'

// **Component Imports
import VisitorsLocationMap from 'src/views/social-media/location-map/VisitorsLocationMap'

const SocMedVisitorsLocation = () => {
  const [configData, setConfigData] = useState<any | null>(null)

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      try {
        if (WORLD_CONFIG_OPTS) {
          setConfigData(WORLD_CONFIG_OPTS)
        }
      } catch (error) {
        console.log(error)
      }
    }
    return () => {
      isMounted = true
    }
  }, [])
  return <VisitorsLocationMap data={configData} />
}

export default React.memo(SocMedVisitorsLocation)
