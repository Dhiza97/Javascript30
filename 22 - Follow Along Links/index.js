// Select all 'a' elements on the page
const triggers = document.querySelectorAll('a')

// Create a <span> element to be used as a highlight
const highlight = document.createElement('span')

// Add the 'highlight' class to the created span
highlight.classList.add('highlight')

// Append the created span to the body of the document
document.body.append(highlight)

// Function to highlight the link when mouse enters
function highlightLink() {
  // Get the position and size of the link
  const linkCoords = this.getBoundingClientRect()
  console.log(linkCoords)

  // Calculate the absolute position of the link considering page scroll
  const coords = {
    width: linkCoords.width,
    height: linkCoords.height,
    top: linkCoords.top + window.scrollY,
    left: linkCoords.left + window.scrollX
  }
  
  // Set the size and position of the highlight span
  highlight.style.width = `${linkCoords.width}px`
  highlight.style.height = `${linkCoords.height}px`
  highlight.style.transform = `translate(${linkCoords.left}px, ${linkCoords.top}px)`
}

// Add event listeners to each 'a' element to trigger the highlight function
triggers.forEach(a => a.addEventListener('mouseenter', highlightLink))
