let countdown // Variable to store the interval ID for the countdown
const timerDisplay = document.querySelector('.display__time-left') // Element to display the timer
const endTime = document.querySelector('.display__end-time') // Element to display the end time
const buttons = document.querySelectorAll('[data-time]') // Buttons for setting timer durations

// Function to start the timer for a given number of seconds
function timer(seconds) {
    clearInterval(countdown) // Clear any existing countdown interval

    const now = Date.now()
    const then = now + seconds * 1000

    displayTimeLeft(seconds) // Display initial time
    displayEndTime(then) // Display end time

    // Set up a new countdown interval
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000)

        // Check if the timer has reached or gone below 0
        if (secondsLeft <= 0) {
            clearInterval(countdown) // Clear the interval
            return
        }

        displayTimeLeft(secondsLeft) // Update the displayed time
    }, 1000) // Update every 1 second
}

// Function to display the remaining time
function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    const display = `${minutes}:${remainingSeconds < 10 ? '0' : '' }${remainingSeconds}`
    timerDisplay.textContent = display // Update the display
    document.title = display // Update the document title
}

// Function to display the end time
function displayEndTime(timestamp) {
    const end = new Date(timestamp)
    const hour = end.getHours()
    const minutes = end.getMinutes()
    endTime.textContent = `Be back at ${hour}:${minutes < 10 ? '0' : '' }${minutes}`
}

// Function to start the timer when a button is clicked
function startTimer() {
    const seconds = parseInt(this.dataset.time)
    timer(seconds)
}

// Event listeners for button clicks
buttons.forEach(button => button.addEventListener('click', startTimer));

// Event listener for custom form submission
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault()
    const mins = this.minutes.value
    timer(mins * 60) // Convert minutes to seconds and start the timer
    this.reset() // Reset the form
})