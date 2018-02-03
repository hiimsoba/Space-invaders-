class bullet {
  constructor(x, y, spd, dir) {
    this.x = x ;
    this.y = y ;
    this.dir = dir ;
    this.r = 5 ;
    this.spd = spd ;
  }

  checkCollision(ship) {
    if(ship)
      return dist(this.x, this.y, ship.x, ship.y) < ship.r + this.r ;
  }

  offScreen() {
    return this.y < - this.r || this.y > height ;
  }

  move() {
    this.y += this.dir * this.spd ;
  }

  show() {
    this.move() ;
    noStroke() ;
    fill(255) ;
    if(frameCount % 2 == 0)
      ellipse(this.x, this.y, this.r) ;
  }
}
