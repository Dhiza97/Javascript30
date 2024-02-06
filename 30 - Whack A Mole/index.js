const holes = document.querySelectorAll('.hole')
const scoreBoard = document.querySelector('.score')
const moles = document.querySelectorAll('.mole')
let lastHole
let timeUp = false
let score = 0
let playerName = ""

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

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

function peep() {
  const time = randomTime(200, 1000)
  const hole = randomHole(holes)
  hole.classList.add('up')
  setTimeout(() => {
    hole.classList.remove('up')
    if(!timeUp) peep()
  }, time)
}

function startGame() {
  playerName = prompt("Please enter your name:")
  scoreBoard.textContent = 0
  timeUp = false
  score = 0
  let countdown = 3
  const countdownInterval = setInterval(() => {
    if (countdown === 0) {
      clearInterval(countdownInterval)
      peep()
      setTimeout(() => {
        timeUp = true
        addToScoreboard(playerName, score)
        localStorage.setItem("playerName", playerName)
        localStorage.setItem("score", score)
      }, 10000)
    }
    console.log(countdown)
    countdown--
  }, 1000)
}

function bonk(e) {
  if(!e.isTrusted) return
  score++
  this.classList.remove('up')
  scoreBoard.textContent = score
}

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