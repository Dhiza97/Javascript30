const dog = [{ name: 'Snickers', age: 2 }, { name: 'hugo', age: 8 }];

    function makeGreen() {
      const p = document.querySelector('p');
      p.style.color = '#BADA55';
      p.style.fontSize = '50px';
    }

    // Regular
    console.log("Hello")

    // Interpolated
    console.log('What is this %s string', '🔥')

    // Styled
    console.log('%c This is a styled text', 'font-size: 30px; background-color: blue; color: red;')

    // warning!
    console.warn("Don't continue!")

    // Error :|
    console.error("There's an error")

    // Info
    console.info('Lions are color blinded 👀')

    // Testing
    const p = document.querySelector('p')
    console.assert(p.classList.contains('You!'), 'That is wrong!')

    // clearing
    console.clear()

    // Viewing DOM Elements
    console.log(p);
    console.dir(p);

    // Grouping together
    dog.forEach(dog => {
      console.groupCollapsed(`${dog.name}`)
      console.log(`This is ${dog.name}`)
      console.log(`${dog.name} is ${dog.age} years old`)
      console.log(`${dog.name} is ${dog.age * 7} dog years old`)

      console.groupEnd(`${dog.name}`)
    })

    // counting
    console.count('Joe')
    console.count('Joe')
    console.count('Garbs')
    console.count('Joe')
    console.count('Garbs')
    console.count('Joe')
    console.count('Garbs')
    console.count('Joe')
    console.count('Garbs')

    // timing
    console.time('fetchData')
    fetch('https://api.github.com/users/wesbos')
    .then(data => data.json())
    .then(data => {
      console.timeEnd('fetchData');
      console.log(data)
      })