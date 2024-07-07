import { Card, CardContent, CardHeader, styled, CardProps, MenuItem, Theme, SelectChangeEvent, SxProps, Theme } from '@mui/material'
import TitleCardHeader from 'src/@core/components/typography/title-card-header'
import ControlledChartSelect from 'src/@core/components/controlled-chart-select'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

// **Type Imports
import { OptionProp} from 'src/views/social-media/types'

interface CardActionSelectProps {
  title: string
  subtitle?: string
  handleChange: (event: SelectChangeEvent<string>) => void
  options: OptionProp[]
  selectedValue: string
  children: React.ReactNode
  sx?:SxProps<Theme>
}

const renderOptions = (options: OptionProp[]) =>
  options.map(option => (
    <MenuItem key={option.id} value={option.value} 
      sx={{ fontSize: {xs: '13px !important', md: '14px !important'}}}>
      <CalendarTodayIcon
        sx={(theme: Theme) => ({
          marginRight: '1rem',
          fontSize: '1rem',
          [theme.breakpoints.up('md')]: {
            fontSize: '1.25rem'
          }
        })}
      />
      {option.label}
    </MenuItem>
  ))

const CardControlledSelect: React.FC<CardActionSelectProps> = ({
  title,
  subtitle,
  handleChange,
  options,
  selectedValue,
  sx,
  children
}) => {
  return (
    <Card sx={sx}>
      {title && (
        <CardHeader
          title={<TitleCardHeader size='medium'>{title}</TitleCardHeader>}
          subheader={subtitle}
          action={
            <ControlledChartSelect
              placeholder='Select Option...'
              onChange={handleChange}
              options={options}
              value={selectedValue}
              renderOptions={renderOptions}
            />
          }
        />
      )}
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export default CardControlledSelect
