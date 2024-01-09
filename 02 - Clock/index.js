const secondHand = document.querySelector('.second-hand')
const minuteHand = document.querySelector('.min-hand')
const hourHand = document.querySelector('.hour-hand')
const digitalClock = document.getElementById('digital-clock')

function updateDigitalClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  digitalClock.textContent = `${hours}:${minutes}:${seconds}`;
}

function clock() {
  const now = new Date()
  const seconds = now.getSeconds()
  const secondsDegree = ((seconds / 60) * 360) + 90
  secondHand.style.transform = `rotate(${secondsDegree}deg)`

  const mins = now.getMinutes()
  const minsDegree = ((mins / 60) * 360) + 90
  minuteHand.style.transform = `rotate(${minsDegree}deg)`

  const hour = now.getHours()
  const hoursDegree = ((hour / 12) * 360) + 90
  hourHand.style.transform = `rotate(${hoursDegree}deg)`

  updateDigitalClock();

}

setInterval(clock, 1000)