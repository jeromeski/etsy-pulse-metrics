// **Mui Imports
import { Select, MenuItem, SelectProps, SelectChangeEvent, styled } from '@mui/material'
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
          alignItems: 'center',
          fontSize: {
            xs: '13px !important',
            md: '14px !important',
          }          
        },
        padding: '0px'
      }}
    >
      {placeholder && (
        <MenuItem
          value=''
          disabled={!!value}
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: {
              xs: '14px !important',
              md: '15px !important',
            }
          }}
        >
          <CalendarTodayIcon
            sx={theme => ({
              marginRight: '1rem',
              fontSize: '14px',
              [theme.breakpoints.up('md')]: {
                fontSize: '15px'
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
