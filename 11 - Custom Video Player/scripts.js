//Get the elements
const player = document.querySelector('.player')
const video = document.querySelector('.viewer')
const progress = document.querySelector('.progress')
const progressBar = document.querySelector('.progress__filled')
const toggle = document.querySelector('.toggle')
const skipButtons = document.querySelectorAll('[data-skip]')
const ranges = document.querySelectorAll('.player__slider')
const fullscreenButton = document.querySelector('.fullscreen')

//Build the functions
function togglePlay() {
    const method = video.paused ? 'play' : 'pause'
    video[method]()
    // if (video.paused) {
    //     video.play()
    // } else {
    //     video.pause()
    // }
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚'
    toggle.textContent = icon
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
    video[this.name] = this.value
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(g) {
    const scrubTime = (g.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = scrubTime
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        player.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
}

progressBar.style.flexBasis = '0%'

//Hook up the event listeners
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)

toggle.addEventListener('click', togglePlay)
skipButtons.forEach(button => button.addEventListener('click', skip))

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))

let mousedown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)

fullscreenButton.addEventListener('click', toggleFullscreen)

// Keyboard listener for play/pause (using Space key)
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        togglePlay();
    }
});

// Keyboard listener for arrow keys (seeking forward and backward)
document.addEventListener('keydown', (event) => {
    const arrowKeys = ['ArrowLeft', 'ArrowRight'];

    if (arrowKeys.includes(event.code)) {
        // Prevent the default behavior of arrow keys (e.g., scrolling the page)
        event.preventDefault();

        // Seeking forward or backward based on the arrow key pressed
        const skipAmount = event.code === 'ArrowLeft' ? -5 : 5; // You can adjust the skip amount
        video.currentTime += skipAmount;
    }
});