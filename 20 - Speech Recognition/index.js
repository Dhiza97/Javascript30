// Check if SpeechRecognition API is supported and use the appropriate implementation
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

// Create a SpeechRecognition instance
const recognition = new SpeechRecognition()

// Enable interim results to get partial recognition while speaking
recognition.interimResults = true

// Create a paragraph element for displaying speech recognition results
let p = document.createElement('p')

// Select the HTML element with the class 'words' for displaying results
const words = document.querySelector('.words');
words.appendChild(p)

// Define a mapping of recognized words to corresponding emojis
const emojiMap = {
  'peace': '✌🏽',
  'cool': '😎',
  'thumbs up': '👍',
};

// Event listener for the 'result' event triggered when speech is recognized
recognition.addEventListener('result', e => {
  // Extract the transcript from the recognition results
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join(' ')

  // Display the transcript in the paragraph element
  p.textContent = transcript;

  // Check if the recognized result is final
  if (e.results[0].isFinal) {
    // Create a new paragraph for the next speech result
    p = document.createElement('p')
    words.appendChild(p);

    // Split transcript into words
    const wordsArray = transcript.toLowerCase().split(' ');

    // Check for recognized words and display corresponding emojis
    wordsArray.forEach(word => {
      const emoji = emojiMap[word];
      if (emoji) {
        // Create a span for each recognized word and emoji pair
        const span = document.createElement('span')
        span.textContent = `${emoji} `
        p.appendChild(span);
      } else {
        // If no recognized words, use MathJS to evaluate mathematical expressions
        try {
          const result = math.evaluate(transcript)
          p.textContent = `${transcript} = ${result}`
        } catch (error) {
          // Handle errors when evaluating mathematical expressions
          console.error('Error evaluating expression:', error)
        }
      }
    }) // <- Missing closing parenthesis here
  }
});

// Event listener for the 'end' event triggered when speech recognition ends
recognition.addEventListener('end', recognition.start)

// Start the speech recognition
recognition.start()