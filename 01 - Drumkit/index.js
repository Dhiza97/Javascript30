function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`)
    if(!audio) return //stops the audio from running all together
    audio.currentTime=0; //resets song to beginning of sound each time a key
    audio.play()
    key.classList.add('playing')
  }

  function removeTransition(e) {
    if(e.propertyName !== 'transform') return //skip if it's not a transform
    this.classList.remove('playing')
  }

  const keys = document.querySelectorAll('.key')
  keys.forEach(key => key.addEventListener('transitionend', removeTransition))
  window.addEventListener("keydown", playSound)