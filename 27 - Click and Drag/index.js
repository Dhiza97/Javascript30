// Select the HTML element with the class 'items' and store it in the 'slider' variable
const slider = document.querySelector('.items')

// Initialize variables to track the mouse state and starting positions
let isDown = false // Flag indicating whether the mouse button is pressed
let startX // X-coordinate where the mouse button was initially pressed
let scrollLeft // Initial horizontal scroll position of the slider

// Event listener for the mouse button being pressed down on the slider
slider.addEventListener('mousedown', (e) => {
  // Set the 'isDown' flag to true, indicating that the mouse button is pressed
  isDown = true

  // Add the 'active' class to the slider for styling purposes
  slider.classList.add('active')

  // Calculate and store the initial positions when the mouse button is pressed
  startX = e.pageX - slider.offsetLeft
  scrollLeft = slider.scrollLeft
})

// Event listener for the mouse leaving the slider area
slider.addEventListener('mouseleave', () => {
  // Reset the 'isDown' flag to false when the mouse leaves the slider
  isDown = false

  // Remove the 'active' class to visually indicate that the mouse button is no longer pressed
  slider.classList.remove('active')
})

// Event listener for the mouse button being released
slider.addEventListener('mouseup', () => {
  // Reset the 'isDown' flag to false when the mouse button is released
  isDown = false

  // Remove the 'active' class to visually indicate that the mouse button is no longer pressed
  slider.classList.remove('active')
})

// Event listener for mouse movement while the button is pressed down
slider.addEventListener('mousemove', (e) => {
  // If the mouse button is not pressed, exit the function
  if (!isDown) return

  // Prevent the default behavior of the mousemove event
  e.preventDefault()

  // Calculate the new horizontal scroll position based on mouse movement
  const x = e.pageX - slider.offsetLeft
  const walk = (x - startX) * 3

  // Set the new scroll position of the slider
  slider.scrollLeft = scrollLeft - walk
})
