// Select the nav element
const nav = document.querySelector('#main')

// Get the distance of the top of the nav from the top of the document
const topOfNav = nav.Top

// Function will be called when the window is scrolled
function fixNav() {
  // If the current scroll position is greater than or equal to the top of the nav
  if(window.scrollY >= topOfNav) {
    // Add padding to the top of the body equal to the height of the nav
    document.body.style.paddingTop = nav.offsetHeight + 'px'
    // Add the 'fixed-nav' class to the body
    document.body.classList.add('fixed-nav')
  } else {
    // Otherwise, remove the padding from the top of the body
    document.body.style.paddingTop = 0
    // Remove the 'fixed-nav' class from the body
    document.body.classList.remove('fixed-nav')
  }
}

// Add an event listener to the window that will call fixNav when the window is scrolled
window.addEventListener('scroll', fixNav)