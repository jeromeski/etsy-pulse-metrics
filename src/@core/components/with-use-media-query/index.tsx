import { useMediaQuery } from '@mui/material'
import { devicesMaxWidth, devicesMinWidth } from 'src/@core/utils/device-sizes'

const withUseMediaQuery = (Component: React.ComponentType<any>) => {
  return (props: any) => {
    const isXtraSmallScreen = useMediaQuery(`(${devicesMinWidth.mobileXs}) and (${devicesMaxWidth.mobileS})`)
    const isSmallScreen = useMediaQuery(`(${devicesMinWidth.mobileS}) and (${devicesMaxWidth.mobileM})`)
    const isMediumScreen = useMediaQuery(`(${devicesMinWidth.mobileM}) and (${devicesMaxWidth.mobileL})`)
    const isTabletScreen = useMediaQuery(`(${devicesMinWidth.mobileL}) and (${devicesMaxWidth.tablet})`)
    const isSmallLaptopScreen = useMediaQuery(`(${devicesMinWidth.tablet}) and (${devicesMaxWidth.laptop})`)
    const isLaptopScreen = useMediaQuery(`(${devicesMinWidth.laptop}) and (${devicesMaxWidth.laptopL})`)
    const isDesktopScreen = useMediaQuery(`(${devicesMinWidth.laptopL}) and (${devicesMaxWidth.desktop})`)

    return (
      <Component
        {...props}
        isXtraSmallScreen={isXtraSmallScreen}
        isSmallScreen={isSmallScreen}
        isMediumScreen={isMediumScreen}
        isTabletScreen={isTabletScreen}
        isSmallLaptopScreen={isSmallLaptopScreen}
        isLaptopScreen={isLaptopScreen}
        isDesktopScreen={isDesktopScreen}
      />
    )
  }
}

export default withUseMediaQuery