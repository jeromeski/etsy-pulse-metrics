export const getDaysOnWeek = (day: Date) => {
  const result = []
  const dayNumber = day.getDay() + 1
  const numberOfDays = 7
  const prevDistance = dayNumber - 1
  const nextDistance = numberOfDays - dayNumber

  // push previous days
  for (let i = prevDistance; i > 0; i--) {
    const dateInstance = new Date(day)
    dateInstance.setDate(day.getDate() - i)
    result.push(dateInstance)
  }

  // push current day
  result.push(day)

  // push next days
  for (let i = 1; i <= nextDistance; i++) {
    const dateInstance = new Date(day)
    dateInstance.setDate(day.getDate() + i)
    result.push(dateInstance)
  }

  return result
}
