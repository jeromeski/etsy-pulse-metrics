// **React Imports
import React, { useState, useEffect } from 'react'
// **Mui Imports
import { Typography } from '@mui/material'
// **Vendor Imports
import InfiniteScroll from 'react-infinite-scroll-component'

const ControlledInfiniteScroll = ({
  data,
  renderItem,
  fetchCount = 3,
  loader = (
    <Typography variant='h6' sx={{ textAlign: 'center' }}>
      Loading...
    </Typography>
  ),
  endMessage = (
    <p style={{ textAlign: 'center' }}>
      <b>End of Reviews</b>
    </p>
  )
}: any) => {
  const [hasMore, setHasMore] = useState(true)
  const [idx, setIdx] = useState(0)
  const [items, setItems] = useState<string[]>([])

  const fakeFetch = (start: number, count: number): Promise<any> => {
    return new Promise(resolve => {
      const timeout = setTimeout(() => {
        const newItems = data.slice(start, start + count)
        resolve(newItems)
        clearTimeout(timeout)
      }, Math.floor(Math.random() * 3000) + 1000)
    })
  }

  const loadMoreItems = async () => {
    if (idx > data.length - fetchCount) {
      setHasMore(false)
      return
    }

    const newItems = await fakeFetch(idx, fetchCount)
    setItems(prevItems => [...prevItems, ...newItems])
    setIdx(prevIdx => prevIdx + fetchCount)
  }

  return (
    <InfiniteScroll
      next={loadMoreItems}
      dataLength={items.length}
      hasMore={hasMore}
      loader={loader}
      endMessage={endMessage}
    >
      {items.map((item, index) => renderItem(item, index))}
    </InfiniteScroll>
  )
}

export default React.memo(ControlledInfiniteScroll)
