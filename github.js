import canvasSketch from 'canvas-sketch'
import Fraction from './fraction.js'


const settings = {
  animate: true,
  duration: 5,
  dimensions: [720, 720],
  fps: 30
}

const sketch = () => {

  const SIZE = 300
  let fractions = []
  let image = [...Array(SIZE)].map(() => Array(SIZE))
  let canv = document.createElement('canvas')
  let ctx = canv.getContext('2d')
  canv.width = SIZE
  canv.height = SIZE
  canv.style.display = 'none'

  let img = new Image()
  img.onload = () => {
    ctx.drawImage(img, 0, 0, SIZE, SIZE)
    let x, y, imgData = ctx.getImageData(0, 0, SIZE, SIZE)
    for(let i = 0; i < imgData.data.length; i += 4) {
      x = (i / 4) % SIZE
      y = Math.floor(i / 4 / SIZE)
      image[x][y] = (imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2]) / 3
      if(image[x][y] > 0 && Math.random() > 0.4) {
        fractions.push(
          new Fraction( (x - SIZE / 2) * 6, (y - SIZE / 2) * 6 )
        )
      }
    }
  }
  img.src = 'github-logo.png'
  document.body.appendChild(canv)

  return ({ context, width, height, playhead }) => {
    playhead = 1 - playhead
    context.fillStyle = '#000'
    context.clearRect(0, 0, width, height)
    context.fillRect(0, 0, width, height)

    context.fillStyle = '#fff'

    context.save()
    context.translate(width/2, height/2)

    fractions.forEach(fraction => {
      fraction.show(context, playhead)
    })

    context.restore()
  }
}

canvasSketch(sketch, settings)
