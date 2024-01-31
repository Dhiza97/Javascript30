// Select the element with the ID 'main' and store it in the variable 'nav'
const nav = document.querySelector('#main')

// Get the offsetTop of the 'nav' element and store it in the variable 'topOfNav'
const topOfNav = nav.offsetTop

// Function to handle fixing the navigation based on scroll position
function fixNav() {
  // Check if the vertical scroll position (window.scrollY) is greater than or equal to 'topOfNav'
  if (window.scrollY >= topOfNav) {
    // If true, set the body padding to the height of the navigation bar
    document.body.style.paddingTop = nav.offsetHeight + 'px'

    // Add the 'fixed-nav' class to the body
    document.body.classList.add('fixed-nav')
  } else {
    // If false, reset the body padding to 0
    document.body.style.paddingTop = 0

    // Remove the 'fixed-nav' class from the body
    document.body.classList.remove('fixed-nav')
  }
}

// Add an event listener to the window, calling the 'fixNav' function when scrolling occurs
window.addEventListener('scroll', fixNav)