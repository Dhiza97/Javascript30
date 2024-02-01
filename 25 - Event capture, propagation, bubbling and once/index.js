// Select all div elements on the page
const divs = document.querySelectorAll('div')

// Select the first button element on the page
const button = document.querySelector('button')

// Function to log the classList value of the clicked element and stop event propagation
function logText(e) {
    console.log(this.classList.value)
    e.stopPropagation()
}

// Add click event listener to each div element
divs.forEach(div => div.addEventListener('click', logText, {
    capture: false, // Event does not use capturing phase
    once: true // Event listener is removed after it's executed once
}))

// Add click event listener to the button element
button.addEventListener('click', () => {
    console.log('CLICK!')
}, {
    once: true // Event listener is removed after it's executed once
})
