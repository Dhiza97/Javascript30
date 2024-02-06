// Select all elements with the class "hole"
const holes = document.querySelectorAll('.hole')

// Select the element with the class "score"
const scoreBoard = document.querySelector('.score')

// Select all elements with the class "mole"
const moles = document.querySelectorAll('.mole')

// Variable to store the last hole where a mole appeared
let lastHole

// Variable to track if the game time is up
let timeUp = false

// Variable to store the player's score
let score = 0

// Variable to store the player's name
let playerName = ""

// Function to generate a random time between min and max
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

// Function to select a random hole from the provided array of holes
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length)
  const hole = holes[idx]
  if (hole === lastHole) {
    console.log('That is the same one')
    return randomHole(holes)
  }

  lastHole = hole
  return hole
}

// Function to make a mole appear and disappear after a random time
function peep() {
  const time = randomTime(200, 1000)
  const hole = randomHole(holes)
  hole.classList.add('up')
  setTimeout(() => {
    hole.classList.remove('up')
    if(!timeUp) peep()
  }, time)
}

// Function to start the game
function startGame() {
  // Ask the player to enter their name
  playerName = prompt("Please enter your name:")
  // Reset the score and timeUp variables
  scoreBoard.textContent = 0
  timeUp = false
  score = 0
  // Start a countdown before the game starts
  let countdown = 3
  const countdownElement = document.querySelector('.count-down')
  countdownElement.textContent = countdown
  const countdownInterval = setInterval(() => {
    if (countdown === 0) {
      clearInterval(countdownInterval)
      countdownElement.textContent = ""
      peep()
      // Set a timeout to end the game after 10 seconds
      setTimeout(() => {
        timeUp = true
        // Add the player's score to the scoreboard and local storage
        addToScoreboard(playerName, score)
        localStorage.setItem("playerName", playerName)
        localStorage.setItem("score", score)
      }, 10000)
    } else {
      countdownElement.textContent = countdown
      countdown--
    }
  }, 1000)
}

// Function to handle when a mole is whacked
function bonk(e) {
  if(!e.isTrusted) return
  score++
  this.classList.remove('up')
  scoreBoard.textContent = score
}

// Add event listeners to all mole elements
moles.forEach(mole => mole.addEventListener('click', bonk))

// Function to add a new row to the scoreboard
function addToScoreboard(playerName, score) {
  const scoreboard = document.getElementById('scoreboard').getElementsByTagName('tbody')[0]
  const newRow = scoreboard.insertRow()
  const cell1 = newRow.insertCell(0)
  const cell2 = newRow.insertCell(1)
  cell1.textContent = playerName
  cell2.textContent = score
}

// Check if there's existing player name and score in local storage
window.onload = function() {
  if(localStorage.getItem("playerName") && localStorage.getItem("score")) {
    addToScoreboard(localStorage.getItem("playerName"), localStorage.getItem("score"))
  }
}
