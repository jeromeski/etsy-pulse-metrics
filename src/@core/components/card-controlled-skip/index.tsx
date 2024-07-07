// **Mui Imports
import { Box, Card, CardContent, CardHeader, styled, CardProps, SxProps, Theme } from '@mui/material'

// **Custom Components
import TitleCardHeader from 'src/@core/components/typography/title-card-header'
import ControlledTextareaMenu from 'src/@core/components/controlled-textarea-menu'
import ButtonSkipController from 'src/@core/components/button-skip-controller'

// **Type Imports
interface CardActionSkipProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  sx?: SxProps<Theme>
  day: string | number
  increaseDayHandler: () => void
  decreaseDayHandler: () => void
}

const CardControlledSkip: React.FC<CardActionSkipProps> = ({
  title,
  subtitle,
  sx,
  day,
  increaseDayHandler,
  decreaseDayHandler,
  children
}) => {
  return (
    <Card sx={sx}>
      {title && (
        <CardHeader
          title={<TitleCardHeader size='medium'>{title}</TitleCardHeader>}
          subheader={subtitle} // Use 'subheader' instead of 'subtitle'
          action={
            <ButtonSkipController
              data={`Day ${day}`}
              increaseCountHandler={increaseDayHandler}
              decreaseCountHandler={decreaseDayHandler}
            />
          }
        />
      )}
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export default CardControlledSkip
