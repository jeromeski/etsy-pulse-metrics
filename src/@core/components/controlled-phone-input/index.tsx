import React from 'react'
import PhoneInput, { CountryData } from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'

interface CustomPhoneFieldProps {
  countryCode: string
  value: any
  onChange: any
  error: any
  isCountryCodeEditable: boolean
  positionType: 'fixed' | 'relative' | 'absolute'
  setCountry: React.Dispatch<any>
  label: string
  onlyCountries: string[]
  placeholder: string
}

export default function ControlledPhoneInput({
  countryCode,
  value = '',
  onChange,
  error,
  isCountryCodeEditable,
  positionType,
  setCountry,
  label,
  onlyCountries,
  placeholder
}: CustomPhoneFieldProps) {
  const getCountryCode = (country: any) => {
    setCountry(country)
  }

  return (
    <>
      <PhoneInput
        value={value}
        onChange={(e, country) => {
          getCountryCode(country as CountryData)
          onChange(`+${e}`)
        }}
        country={countryCode}
        onlyCountries={onlyCountries}
        inputStyle={{ width: '100%', borderColor: error ? 'red' : '', color: error ? 'red' : '' }}
        dropdownStyle={{ zIndex: 100, position: positionType }}
        placeholder={placeholder}
        countryCodeEditable={isCountryCodeEditable}
        specialLabel={label}
      />
    </>
  )
}
