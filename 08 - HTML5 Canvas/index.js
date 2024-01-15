const canvas = document.querySelector('#draw')
  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx.strokeStyle = '#BADASS'
//   ctx.lineJoin = 'round'
//   ctx.lineCap = 'round'
  ctx.lineWidth = 10
  ctx.globalCompositeOperation = 'source-over'

  const lineCapValues = ['square','butt', 'round'];
  const lineJoinValues = ['miter', 'bevel', 'round'];

  let isDrawing = false
  let lastX = 0
  let lastY = 0
  let hue = 0
  let direction = true
  let lineCapIndex = 0;
  let lineJoinIndex = 0;

  function draw(g) {
    if(!isDrawing) return //This will stop the function from running when mouse is not pressed down
    console.log(g)

    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
    ctx.lineWidth = hue
    ctx.lineCap = lineCapValues[lineCapIndex];
    ctx.lineJoin = lineJoinValues[lineJoinIndex];

    ctx.beginPath()
    //Start from
    ctx.moveTo(lastX, lastY)
    //Go to
    ctx.lineTo(g.offsetX, g.offsetY)
    ctx.stroke()

    lastX = g.offsetX
    lastY = g.offsetY
    hue++

    if(hue >= 360) {
      hue = 0
    }

    if(ctx.lineWidth >= 30 || ctx.lineWidth <= 1) {
      direction = !direction
    }

    if(direction) {
      ctx.lineWidth++
    } else {
      ctx.lineWidth--
    }

    lineCapIndex = (lineCapIndex + 1) % lineCapValues.length;
    lineJoinIndex = (lineJoinIndex + 1) % lineJoinValues.length;
  }

  canvas.addEventListener('mousedown', (g) => {
    isDrawing = true
    lastX = g.offsetX
    lastY = g.offsetY
  })
  canvas.addEventListener('mousemove', draw)
  canvas.addEventListener('mouseup', () => isDrawing = false)
  canvas.addEventListener('mouseout', () => isDrawing = false)