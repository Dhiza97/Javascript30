// Get all elements with the 'data-time' attribute
const timeNodes = Array.from(document.querySelectorAll('[data-time]'))

// Extract and convert time data to seconds, then calculate the total
const seconds = timeNodes
  .map(node => node.dataset.time)
  .map(timeCode => {
    // Split the time code into minutes and seconds, then convert to numbers
    const [mins, secs] = timeCode.split(':').map(parseFloat)

    // Calculate total seconds
    // console.log(mins, secs)
    return (mins * 60) + secs
  })
  .reduce((total, vidSeconds) => total + vidSeconds); // Sum up all video seconds

// Calculate hours, minutes, and remaining seconds
let secondsLeft = seconds
const hours = Math.floor(secondsLeft / 3600)
secondsLeft = secondsLeft % 3600
const mins = Math.floor(secondsLeft / 60)
secondsLeft = secondsLeft % 60

// Output the calculated hours, minutes, and seconds
console.log(hours, mins, secondsLeft)
