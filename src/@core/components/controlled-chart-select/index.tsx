// **Mui Imports
import { Select, MenuItem, SelectProps, SelectChangeEvent } from '@mui/material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

// **Type Imports
import { OptionProp } from 'src/views/social-media/types'

type RenderProp = (options: OptionProp[]) => React.ReactNode

interface ControlledChartSelectType extends Omit<SelectProps<string>, 'children' | 'onChange'> {
  options: OptionProp[]
  onChange: (event: SelectChangeEvent<string>) => void
  renderOptions: RenderProp
  placeholder?: string
}

const ControlledChartSelect = ({
  renderOptions,
  value,
  placeholder,
  options,
  ...selectProps
}: ControlledChartSelectType) => {
  return (
    <Select
      value={value === '' ? '' : value}
      displayEmpty
      {...selectProps}
      sx={{
        height: '2rem',
        '& .MuiSelect-select': {
          display: 'flex',
          alignItems: 'center'
        }
      }}
    >
      {placeholder && (
        <MenuItem value='' disabled={!!value} sx={{ display: 'flex', alignItems: 'center' }}>
          <CalendarTodayIcon
            sx={theme => ({
              marginRight: '1rem',
              fontSize: '1rem',
              [theme.breakpoints.up('md')]: {
                fontSize: '1.25rem'
              }
            })}
          />
          {placeholder}
        </MenuItem>
      )}
      {renderOptions(options)}
    </Select>
  )
}

export default ControlledChartSelect
