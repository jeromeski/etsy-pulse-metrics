import React from 'react'
// import { Select, MenuItem, SelectProps } from '@mui/material'
import { Select, MenuItem, SelectChangeEvent, SelectProps } from '@mui/material'

type RenderOptionProp = {
  value: string
  label: string
}

type RenderProp = (options: RenderOptionProp[]) => React.ReactNode

// interface ReusableSelectProps extends Omit<SelectProps<string>, 'children'> {
//   options: RenderOptionProp[]
//   renderOptions: RenderProp
// }

interface ReusableSelectProps extends Omit<SelectProps<string>, 'children' | 'onChange'> {
  options: RenderOptionProp[]
  renderOptions: RenderProp
  onChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void
  placeholder?: string
}

const ReusableSelect: React.FC<ReusableSelectProps> = ({
  placeholder,
  options,
  value,
  renderOptions,
  ...selectProps
}) => {
  return (
    <Select {...selectProps} value={value === '' ? '' : value} displayEmpty>
      {placeholder && (
        <MenuItem value='' disabled>
          {placeholder}
        </MenuItem>
      )}
      {renderOptions(options)}
    </Select>
  )
}

export default ReusableSelect
