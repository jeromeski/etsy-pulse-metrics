export default function fakeFetch(callback: (params: boolean) => void): Promise<void> {
  callback(true)
  const randomTimeout = Math.floor(Math.random() * 3000) + 1000
  return new Promise<void>((resolve, reject) => {
    let timeout = setTimeout(() => {
      callback(false)
      clearTimeout(timeout)
      resolve()
    }, randomTimeout)
  })
}
