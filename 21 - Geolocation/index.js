// Selecting the arrow and speed elements from the DOM
const arrow = document.querySelector('.arrow')
const speed = document.querySelector('.speed-value')

// Watching the user's geolocation position changes
navigator.geolocation.watchPosition(
  // Success callback function when position changes
  (data) => {
    // Logging geolocation data to the console for debugging
    console.log(data)

    // Updating the speed value on the webpage with real-time speed data
    speed.textContent = data.coords.speed

    // Rotating the arrow to match the heading direction
    arrow.style.transform = `rotate(${data.coords.heading}deg)`
  },
  // Error callback function when there's an issue with geolocation
  (err) => {
    // Logging the error to the console for debugging
    console.error(err)

    // Alerting the user to allow geolocation for the app to work
    alert('Allow it!')
  }
)