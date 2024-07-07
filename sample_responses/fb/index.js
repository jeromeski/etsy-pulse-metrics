const fs = require('fs/promises')

const modifyDailyData = data => {
  const newArr = data.map(element => {
    return {
      date: element.date,
      period: 'day',
      total_likes: {
        name: 'Daily Likes',
        title: 'likes',
        value: element.post_likes
      },
      total_comments: {
        name: 'Daily Comments',
        title: 'comments',
        value: element.comments
      },
      total_shares: {
        name: 'Daily Shares',
        title: 'shares',
        value: element.shares
      },
      total_reach: {
        name: 'Daily Reach',
        title: 'reach',
        value: element.reach
      },
      engagement_rate: {
        name: 'Daily Engagement Rate',
        title: 'engagement rate',
        value: element.engagement_rate
      },
      avg_likes: {
        name: 'Average Likes',
        title: 'average likes',
        value: element.avg_likes
      },
      avg_comments

      // "date": "2024-06-30",
      // "total_likes": 2059,
      // "total_comments": 695,
      // "total_shares": 376,
      // "total_reach": 32361,
      // "engagement_rate": 9.7,
      // "avg_likes": 68.6,
      // "avg_comments": 23.2,
      // "avg_shares": 12.5,
      // "avg_reach": 1079,
      // "impressions": 36701,
      // "total_engagements": 3130,
      // "trend_likes": -19.7,
      // "trend_engagements": -25.8,
      // "trend_impressions": 329.3,
      // "trend_reach": -26.3,
      // "growth_likes": -505,
      // "growth_engagements": -570,
      // "compareDays": 30,
      // "prevDate": "2024-05-31",
    }
  })
}

const sortDataToLatest = data => {
  // Sort the values array based on end_time in ascending order
  data[0].values.sort((a, b) => new Date(b.end_time) - new Date(a.end_time))
}

const aggregateValue = n => {
  data[0].values.slice(0, n).reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)
}

const insertPrevDate = (data, numOfDays) => {
  const originalDate = new Date(data)
  const sevenDaysAgo = new Date(originalDate)
  sevenDaysAgo.setDate(originalDate.getDate() - numOfDays)
  // Format the result as 'YYYY-MM-DD'
  const formattedResult = sevenDaysAgo.toISOString().split('T')[0]
  return formattedResult
}

const insertNofDays = (data, n) => {
  return new Promise((resolve, reject) => {
    let arr = []
    try {
      arr = data.map(element => {
        if (!element.hasOwnProperty('compareDays')) {
          return { ...element, compareDays: n, prevDate: insertPrevDate(element.date, n) }
        }
        return element
      })
      resolve(arr)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

const insertTotalEngagement = data => {
  return data.map(element => {
    return {
      ...element,
      engagements: element.post_likes + element.shares + element.comments
    }
  })
}

async function getJsonData() {
  try {
    // Read the JSON file
    const data = await fs.readFile('./daily/index.json', 'utf8')
    // Parse the JSON data
    const parsedData = await JSON.parse(data)

    const jsonData = insertTotalEngagement(parsedData)

    // Write the sorted data to a new JSON file
    fs.writeFile('processed_data.json', JSON.stringify(jsonData, null, 2), err => {
      if (err) {
        console.error('Error writing file:', err)
      } else {
        console.log('Data sorted and written to the directory')
      }
    })
  } catch (error) {
    console.log(error)
  }
}

getJsonData()
