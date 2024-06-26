export default function fakeFetch(callback: any) {
  callback(true)
  const randomTimeout = Math.floor(Math.random() * 3000) + 1000
  new Promise((resolve, reject) => {
    let timeout = setTimeout(() => {
      callback(false)
      clearTimeout(timeout)
    }, randomTimeout)
    resolve('Success')
  })
}
