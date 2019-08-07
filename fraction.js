const easeInOutQuad = t => t<.5 ? 2*t*t : -1+(4-2*t)*t

export default class Fraction {

  constructor(x, y) {
    this.x = x
    this.y = y
    this.tops = 2
    this.offset = Math.random()
    this.coordinates = Array.from({ length: this.tops }, (v, i) => {
      let angle = 2 * Math.PI * i / this.tops + 2 * Math.PI * this.offset
      let dx = this.x + 5 * Math.sin(angle)
      let dy = this.y + 5 * Math.cos(angle)

      return [dx, dy]
    })
  }

  show(ctx, progress) {
    let step = (1 - progress + this.offset) % 1
    let opacity = step
    if(step > 0.5) {
      step = easeInOutQuad(step)
    } else {
      step = 1
    }
    ctx.strokeStyle = `rgba(255,255,255,${opacity})`
    ctx.beginPath()
    ctx.moveTo(this.coordinates[0][0] * step, this.coordinates[0][1] * step)
    ctx.lineTo(this.coordinates[1][0] * step, this.coordinates[1][1] * step)
    ctx.closePath()
    ctx.stroke()
  }

}
