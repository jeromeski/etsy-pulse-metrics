// ** React Import
import React, { useState, useEffect, useRef, forwardRef, ForwardRefRenderFunction } from 'react'

// ** Axios Import
import { AxiosError } from 'axios'

// ** Api import
import { getCompanyInfo } from 'src/apis'
import { Company } from 'src/apis/types'

interface CompanyLogoProps {
  height: string
  weight: string
  position?: string
}

const CompanyLogo: React.FC<CompanyLogoProps> = forwardRef<HTMLImageElement, CompanyLogoProps>((props, ref) => {
  const [companyInfo, setCompanyInfo] = useState<Company | undefined | null>(null)
  useEffect(() => {
    let isMounted = true // This flag will track whether the component is mounted

    const fetchCompanyInfo = async () => {
      const companyStr = window.localStorage.getItem('company')
      const companyItem = companyStr ? JSON.parse(companyStr) : {}
      try {
        const resData = await getCompanyInfo()
        // Check if the component is still mounted
        if (isMounted) {
          if (companyItem) {
            setCompanyInfo(companyItem)
          } else if (resData && resData.company) {
            setCompanyInfo(resData.company[0])
          }
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.message)
        } else {
          console.error(error)
        }
      }
    }

    fetchCompanyInfo()

    return () => {
      isMounted = false // Set the flag to false when the component unmounts
    }
  }, [])

  return (
    <>
      <img alt={companyInfo?.companyName} src={companyInfo?.companyLogoUrl} {...props} />
    </>
  )
})

export default CompanyLogo
