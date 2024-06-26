import {useState} from 'react'


export default function useYearHandler() {
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const increaseYearHandler = () => {
    let yearCopy = year
    
    if (yearCopy < 2024) {
      yearCopy += 1
    // Only update the state if the year is 2024 or earlier
      setYear(yearCopy);
    }
  }

  const decreaseYearHandler = () => {
    let yearCopy = year
    // Only update the state if the year is 2022 or later
    if (yearCopy > 2022) {
      yearCopy -= 1
      setYear(yearCopy)
    }
  }

  return {year, increaseYearHandler, decreaseYearHandler}
}