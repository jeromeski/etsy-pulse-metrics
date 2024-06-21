import React, { useState } from 'react'
import { MenuItem, SelectChangeEvent } from '@mui/material'
import ReusableSelect from './ReusableSelect'

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
]

const SimpleSelectComponent: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>('')

  // const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   setSelectedValue(event.target.value as string)
  // }

  const handleSelectChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
    setSelectedValue(event.target.value as string)
  }

  return (
    <ReusableSelect
      value={selectedValue}
      onChange={handleSelectChange}
      options={options}
      placeholder='Select an option'
      renderOptions={options =>
        options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))
      }
    />
  )
}

export default SimpleSelectComponent
