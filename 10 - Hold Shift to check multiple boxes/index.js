const checkboxes = document.querySelectorAll('.inbox input[type = "checkbox"]')

  let lastChecked

  function handleCheck(g) {
    //check if they have the shift key down
    let inBetween = false
    if (g.shiftKey && this.checked) {
      checkboxes.forEach(checkbox => {
        console.log(checkbox)

        if(checkbox === this || checkbox === lastChecked) {
          inBetween = !inBetween
          console.log('Starting to check them inbetween');
        }

        if (inBetween) {
          checkbox.checked = true;
        }
      })
    }
  lastChecked = this
}

checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck))