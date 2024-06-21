import { useMediaQuery } from '@mui/material'
import { devicesMaxWidth, devicesMinWidth } from 'src/@core/utils/device-sizes'

export default function useDeviceSizesMediaQuery() {
  const isMobileXs = useMediaQuery(`(${devicesMinWidth.mobileXs}) and (${devicesMaxWidth.mobileS})`)
  const isMobileS = useMediaQuery(`(${devicesMinWidth.mobileS}) and (${devicesMaxWidth.mobileM})`)
  const isMobileM = useMediaQuery(`(${devicesMinWidth.mobileM}) and (${devicesMaxWidth.mobileL})`)
  const isTablet = useMediaQuery(`(${devicesMinWidth.mobileL}) and (${devicesMaxWidth.tablet})`)
  const isLaptopS = useMediaQuery(`(${devicesMinWidth.tablet}) and (${devicesMaxWidth.laptop})`)
  const isLaptopL = useMediaQuery(`(${devicesMinWidth.laptop}) and (${devicesMaxWidth.laptopL})`)
  const isDesktop = useMediaQuery(`(${devicesMinWidth.laptopL}) and (${devicesMaxWidth.desktop})`)

  return {
    isMobileXs,
    isMobileS,
    isMobileM,
    isTablet,
    isLaptopS,
    isLaptopL,
    isDesktop
  }
}
