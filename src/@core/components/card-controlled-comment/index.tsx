import { Box, Card, CardContent, CardHeader, styled, CardProps, SxProps, Theme } from '@mui/material'
import TitleCardHeader from 'src/@core/components/typography/title-card-header'
import ControlledTextareaMenu from 'src/@core/components/controlled-textarea-menu'

interface CardActionCommentProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  sx?: SxProps<Theme>
}



const CardControlledComment: React.FC<CardActionCommentProps> = ({ title, subtitle, sx, children }) => {
  return (
    <Card sx={sx}>
      {title && (
        <CardHeader
          title={<TitleCardHeader size='medium'>{title}</TitleCardHeader>}
          subheader={subtitle} // Use 'subheader' instead of 'subtitle'
          action={<ControlledTextareaMenu />}
        />
      )}
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

export default CardControlledComment
