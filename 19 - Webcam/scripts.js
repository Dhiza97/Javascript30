const video = document.querySelector('.player') // Video element
const canvas = document.querySelector('.photo') // Canvas element
const ctx = canvas.getContext('2d') // Canvas context
const strip = document.querySelector('.strip') // Photo strip container
const snap = document.querySelector('.snap') // Audio element for snap sound
let isFilterApplied = false // Flag to check if a filter is applied


// Function to get video feed
function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream)
      video.srcObject = localMediaStream
      video.play()
    })
    .catch(err => {
      console.error(`OH NO!!!`, err)
    })
}

// Function to continuously draw video frames on the canvas
function paintToCanvas() {
  const width = video.videoWidth
  const height = video.videoHeight
  canvas.width = width
  canvas.height = height

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height)
 
    if (isFilterApplied) {
      // take the pixels out
      let pixels = ctx.getImageData(0, 0, width, height)

      // Apply the selected filter
      pixels = applyFilter(pixels)

      // put them back
      ctx.putImageData(pixels, 0, 0)
    }
  }, 16)
}

// Function to capture a photo
function takePhoto() {
  // played the sound
  snap.currentTime = 0
  snap.play()

  // take the data out of the canvas
  const data = canvas.toDataURL('image/jpeg')
  const link = document.createElement('a')
  link.href = data
  link.setAttribute('download', 'handsome')
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`
  strip.insertBefore(link, strip.firstChild)
}

// Function to apply filters
function applyFilter(pixels) {
  switch (selectedFilter) {
    case 'redEffect':
      return redEffect(pixels)
    case 'rgbSplit':
      return rgbSplit(pixels)
    case 'blackAndWhite':
        return blackAndWhite(pixels)
    default:
      return pixels
  }
}

// Default filter selection
let selectedFilter = 'none'

// Function to add a red effect to the pixels
function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200 // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50 // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5 // Blue
  }
  return pixels
}

// Function to add an RGB split effect to the pixels
function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels
}

function blackAndWhite(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    // Calculate grayscale value
    const gray = (pixels.data[i] + pixels.data[i + 1] + pixels.data[i + 2]) / 3

    // Set red, green, and blue channels to the grayscale value
    pixels.data[i] = gray
    pixels.data[i + 1] = gray
    pixels.data[i + 2] = gray
  }
  return pixels
}

// Function to remove the applied filter
function removeFilter() {
  selectedFilter = 'none'
  isFilterApplied = false;
  applyFilterAndUpdateCanvas()
}

function startPhotoTimer(seconds) {
  setTimeout(() => {
    isFilterApplied = true
    takePhoto()
  }, seconds * 1000)
}

video.addEventListener('canplay', paintToCanvas)
getVideo()

// Get the buttons
const redEffectBtn = document.getElementById('redEffectBtn');
const rgbSplitBtn = document.getElementById('rgbSplitBtn');
const removeFilterBtn = document.getElementById('removeFilterBtn')

// Event listeners for the buttons
redEffectBtn.addEventListener('click', () => {
  selectedFilter = 'redEffect'
  isFilterApplied = true
  applyFilterAndUpdateCanvas()
  startPhotoTimer(3)
})

rgbSplitBtn.addEventListener('click', () => {
  selectedFilter = 'rgbSplit'
  isFilterApplied = true
  applyFilterAndUpdateCanvas()
  startPhotoTimer(3)
})

blackAndWhiteBtn.addEventListener('click', () => {
  selectedFilter = 'blackAndWhite'
  isFilterApplied = true
  applyFilterAndUpdateCanvas()
  startPhotoTimer(3)
})

removeFilterBtn.addEventListener('click', () => {
  removeFilter();
});

// Function to apply and update the selected filter
function applyFilterAndUpdateCanvas() {
  let pixels = ctx.getImageData(0, 0, video.videoWidth, video.videoHeight)
  pixels = applyFilter(pixels)
  ctx.putImageData(pixels, 0, 0)
}