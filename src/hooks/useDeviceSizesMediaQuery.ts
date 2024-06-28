import { useMediaQuery } from '@mui/material'
import { devicesMinWidth, sizes } from 'src/@core/utils/device-sizes'

/*%%%%%%%%%%%%%%%%%%%%%%
mobileXs: '0',
mobileS: '320px',
mobileM: '375px',
mobileL: '425px',
tablet: '768px',
laptop: '1024px',
laptopL: '1440px',
desktop: '2560px'



xs: 0,
sm: 600,
md: 900,
lg: 1200,
xl: 1536,
responsiveTable: 765,
responsiveProdTabs: 415,
laptop: 1024,
laptopLg: 1440
%%%%%%%%%%%%%%%%%%%%%%%%%%%*/

export default function useDeviceSizesMediaQuery() {
  const isMobileXs = useMediaQuery(`(${devicesMinWidth.mobileXs}px) and (max-width:${sizes.mobileXsCeil})`)
  const isMobileS = useMediaQuery(`(${devicesMinWidth.mobileS}) and (max-width:${sizes.mobileSCeil})`)
  const isMobileM = useMediaQuery(`(${devicesMinWidth.mobileM}) and (max-width:${sizes.mobileMCeil})`)
  const isMobileL = useMediaQuery(`(${devicesMinWidth.mobileL}) and (max-width:${sizes.mobileLCeil})`)
  const isTablet = useMediaQuery(`(${devicesMinWidth.tablet}) and (max-width:${sizes.tabletCeil})`)
  const isLaptop = useMediaQuery(`(${devicesMinWidth.laptop}) and (max-width:${sizes.laptopCeil})`)
  const isLaptopL = useMediaQuery(`(${devicesMinWidth.laptopL}) and (max-width:${sizes.laptopLCeil})`)
  const isDesktop = useMediaQuery(`(${devicesMinWidth.desktop}`)
  const isSmallScreen = isMobileXs || isMobileS || isMobileM || isMobileL
  return {
    isMobileXs,
    isMobileS,
    isMobileM,
    isMobileL,
    isTablet,
    isLaptop,
    isLaptopL,
    isDesktop,
    isSmallScreen
  }
}
