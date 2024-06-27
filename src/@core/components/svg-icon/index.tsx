import { SvgIcon } from '@mui/material'

interface CustomSvgIconProps {
  id: string
  color: string
}

const CustomSvgIcon = ({ id, color, ...props }: CustomSvgIconProps) => {
  return (
    <SvgIcon sx={{ color: color, height: '100%', width: '100%' }} {...props}>
      <use xlinkHref={`#${id}`}></use>
    </SvgIcon>
  )
}

export default CustomSvgIcon
