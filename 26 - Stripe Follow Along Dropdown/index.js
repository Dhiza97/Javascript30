// Select all list items inside elements with the class 'cool'
const triggers = document.querySelectorAll('.cool > li')

// Select the element with the class 'dropdownBackground'
const background = document.querySelector('.dropdownBackground')

// Select the element with the class 'top'
const nav = document.querySelector('.top')

// Function to handle mouse enter events
function handleEnter() {
  // Add the classes 'trigger-enter' and 'trigger-enter-active' to the current list item
  this.classList.add('trigger-enter')

  // Set a timeout to add the 'trigger-enter-active' class after 150 milliseconds if 'trigger-enter' is still present
  setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150)

  // Add the class 'open' to the background element
  background.classList.add('open')

  // Select the dropdown menu within the current list item
  const dropdown = this.querySelector('.dropdown')

  // Get the bounding rectangles of the dropdown menu and the navigation bar
  const dropdownCoords = dropdown.getBoundingClientRect()
  const navCoords = nav.getBoundingClientRect()

  // Calculate the position and size of the dropdown menu relative to the navigation bar
  const coords = {
    height: dropdownCoords.height,
    width: dropdownCoords.width,
    top: dropdownCoords.top - navCoords.top,
    left: dropdownCoords.left - navCoords.left
  }

  // Set the width, height, and transform properties of the background element based on dropdown position and size
  background.style.setProperty('width', `${coords.width}px`)
  background.style.setProperty('height', `${coords.height}px`)
  background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`)
}

// Function to handle mouse leave events
function handleLeave() {
  // Remove the classes 'trigger-enter' and 'trigger-enter-active' from the current list item
  this.classList.remove('trigger-enter', 'trigger-enter-active')

  // Remove the class 'open' from the background element
  background.classList.remove('open')
}

// Add event listeners to each trigger for mouse enter and mouse leave events
triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter))
triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave))