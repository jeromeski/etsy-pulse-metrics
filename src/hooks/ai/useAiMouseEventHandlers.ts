import { Dispatch, MouseEvent } from 'react'

export default function useAiMouseEventHandlers() {
  // Handle Password
  const handleMouseDownPassword = (e: MouseEvent, setShowPassword: Dispatch<boolean>) => {
    setShowPassword(true)
  }

  const handleMouseUpPassword = (e: MouseEvent, setShowPassword: Dispatch<boolean>) => {
    setShowPassword(false)
  }

  // Handle Confirm Password
  const handleMouseDownConfirmPassword = (e: MouseEvent, setShowConfirmPassword: Dispatch<boolean>) => {
    setShowConfirmPassword(true)
  }

  const handleMouseUpConfirmPassword = (e: MouseEvent, setShowConfirmPassword: Dispatch<boolean>) => {
    setShowConfirmPassword(false)
  }

  return {
    handleMouseDownPassword,
    handleMouseUpPassword,
    handleMouseDownConfirmPassword,
    handleMouseUpConfirmPassword
  }
}
