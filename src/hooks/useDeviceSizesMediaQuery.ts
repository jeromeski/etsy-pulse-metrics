import { useMediaQuery } from '@mui/material'
import { devicesMaxWidth, devicesMinWidth } from 'src/@core/utils/device-sizes'

export default function useDeviceSizesMediaQuery() {
  const isXtraSmallScreen = useMediaQuery(`(${devicesMinWidth.mobileXs}) and (${devicesMaxWidth.mobileS})`)
  const isSmallScreen = useMediaQuery(`(${devicesMinWidth.mobileS}) and (${devicesMaxWidth.mobileM})`)
  const isMediumScreen = useMediaQuery(`(${devicesMinWidth.mobileM}) and (${devicesMaxWidth.mobileL})`)
  const isTabletScreen = useMediaQuery(`(${devicesMinWidth.mobileL}) and (${devicesMaxWidth.tablet})`)
  const isSmallLaptopScreen = useMediaQuery(`(${devicesMinWidth.tablet}) and (${devicesMaxWidth.laptop})`)
  const isLaptopScreen = useMediaQuery(`(${devicesMinWidth.laptop}) and (${devicesMaxWidth.laptopL})`)
  const isDesktopScreen = useMediaQuery(`(${devicesMinWidth.laptopL}) and (${devicesMaxWidth.desktop})`)

  return {
    isXtraSmallScreen,
    isSmallScreen,
    isMediumScreen,
    isLaptopScreen,
    isTabletScreen,
    isSmallLaptopScreen,
    isDesktopScreen
  }
}
