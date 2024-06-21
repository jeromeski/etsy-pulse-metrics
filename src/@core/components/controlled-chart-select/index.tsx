// **Mui Imports
import { Select, styled, Theme, MenuItem, SelectProps } from '@mui/material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

// **Utility Component Imports
import withUseMediaQuery from 'src/@core/components/with-use-media-query'
import { SelectChangeEvent } from '@mui/material/Select'

interface ControlledChartSelectType {
  value: string
  handleChange: (event: SelectChangeEvent<any>) => void
  renderSelectItem: (item: any, index: number) => JSX.Element
  compareDaysSelectList: any[]
}

const StyledSelect = styled(Select)<SelectProps>(({ theme }: { theme: Theme }) => ({
  fontSize: '.9rem',
  marginRight: '.45rem !important',
  marginTop: '.5rem !important',
  height: '2rem',
  '& div': {
    display: 'flex',
    alignItems: 'center'
  },
  [theme.breakpoints.between('xs', 'sm')]: {
    // marginLeft: '.25rem'
  }
}))

const ControlledChartSelect = ({
  value,
  handleChange,
  renderSelectItem,
  compareDaysSelectList
}: ControlledChartSelectType) => {
  return (
    <StyledSelect value={value} onChange={handleChange} displayEmpty>
      {compareDaysSelectList.map((item: string, idx: number) => renderSelectItem(item, idx))}
    </StyledSelect>
  )
}

export default withUseMediaQuery(ControlledChartSelect)

/*
<MenuItem value='90'>
        <CalendarTodayIcon
          sx={{
            marginRight: '1rem',
            fontSize: isXtraSmallScreen || isSmallScreen ? '1rem' : '1.25rem'
          }}
        />
        Last 90 days
      </MenuItem>
      <MenuItem value='60'>
        {' '}
        <CalendarTodayIcon
          sx={{ marginRight: '1rem', fontSize: isXtraSmallScreen || isSmallScreen ? '1rem' : '1.25rem' }}
        />
        Last 60 days
      </MenuItem>
      <MenuItem value='30'>
        {' '}
        <CalendarTodayIcon
          sx={{ marginRight: '1rem', fontSize: isXtraSmallScreen || isSmallScreen ? '1rem' : '1.25rem' }}
        />
        Last 30 days
      </MenuItem>

<ControlledChartSelect
            value={dayRange}
            onChange={(e: SelectChangeEvent) => handleChange(e)}
            compareDaysSelectList={compareDaysSelectList}
            
            renderSelectItem={(item: CompareDaysSelectItem) => (
              <MenuItem value={item.value} key={item.id}>
                <CalendarTodayIcon
                  sx={{
                    marginRight: '1rem',
                    fontSize: isXtraSmallScreen || isSmallScreen ? '1rem' : '1.25rem'
                  }}
                />
                {item.description}
              </MenuItem>
            )}
          />

      
*/
