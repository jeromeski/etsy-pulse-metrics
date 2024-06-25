import { Dispatch } from 'react'

export default function useMimicFetch() {
  const isReady = true
  const handleLoading = (setIsLoading: Dispatch<boolean>): Promise<boolean> => {
    setIsLoading(true)
    return new Promise((resolve, reject) => {
      if (isReady) {
        const timeout = setTimeout(() => {
          setIsLoading(false)
          clearTimeout(timeout)
          resolve(true)
        }, 3000)
      } else {
        reject(false)
      }
    })
  }
  return { handleLoading }
}
