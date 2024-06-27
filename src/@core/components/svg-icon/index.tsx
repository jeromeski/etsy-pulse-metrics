import { SvgIcon } from '@mui/material'
import Shadows from 'src/@core/theme/shadows'

interface CustomSvgIconProps {
  id: string
  color: string
}

const CustomSvgIcon = ({ id, color, ...props }: CustomSvgIconProps) => {
  return (
    <SvgIcon sx={theme => ({ color: color, height: '100%', width: '100%', boxShadow: theme.shadows[24] })} {...props}>
      <use xlinkHref={`#${id}`}></use>
    </SvgIcon>
  )
}

export default CustomSvgIcon
