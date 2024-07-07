import { Card, CardContent, CardHeader, styled, CardProps, MenuItem, Theme, SelectChangeEvent } from '@mui/material'
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
}

const CardWrapper = styled(Card)<CardProps>(({ theme }) => ({
  // You can add custom styles here
}))

const renderOptions = (options: OptionProp[]) =>
  options.map(option => (
    <MenuItem key={option.id} value={option.value}>
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
  children
}) => {
  return (
    <CardWrapper>
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
    </CardWrapper>
  )
}

export default CardControlledSelect
