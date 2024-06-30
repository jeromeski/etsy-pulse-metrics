const fs = require('fs/promises')

async function sortJsonData() {
  try {
    // Read the JSON file
    const data = await fs.readFile('post_reactions_likes_2023d.json', 'utf8')

    // Parse the JSON data
    let jsonData = JSON.parse(data)

    // Sort the values array based on end_time in ascending order
    jsonData[0].values.sort((a, b) => new Date(b.end_time) - new Date(a.end_time))

    // Write the sorted data to a new JSON file
    fs.writeFile('sorted_data.json', JSON.stringify(jsonData, null, 2), err => {
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
sortJsonData()
