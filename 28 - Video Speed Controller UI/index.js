// Selecting DOM elements
const speed = document.querySelector('.speed'); // Speed control container
const bar = speed.querySelector('.speed-bar'); // Speed control bar
const video = document.querySelector('.flex'); // Video element

// Function to handle mouse movement for adjusting playback speed
function handleMove(e) {
  // Calculate the vertical position relative to the speed container
  const y = e.pageY - this.offsetTop;

  // Calculate the percentage of the position relative to the container height
  const percent = y / this.offsetHeight;

  // Define minimum and maximum playback speeds
  const min = 0.4;
  const max = 4;

  // Calculate the visual height of the speed control bar
  const height = Math.round(percent * 100) + '%';

  // Calculate the playback rate based on the percentage and range
  const playbackRate = percent * (max - min) + min;

  // Update the visual representation of the speed control bar
  bar.style.height = height;
  bar.textContent = playbackRate.toFixed(2) + 'x';

  // Adjust the playback speed of the video element
  video.playbackRate = playbackRate;
}

// Add event listener for mousemove on the speed control container
speed.addEventListener('mousemove', handleMove);
