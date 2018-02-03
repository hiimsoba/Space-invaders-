class enemy {
  constructor(x, y, vel, dir, row) {
    this.x = x ;
    this.y = y ;
    this.vel = vel ;
    this.dir = dir ;
    this.r = 15 ;
    if(row == 5 || row == 4) {
      this.score = 10 ;
      this.imgindex = 2 ;
      if(row == 5) {
        this.on = true ;
      }
      else {
        this.on = false ;
      }
    }
    else if(row == 3 || row == 2) {
      this.score = 20 ;
      this.imgindex = 1 ;
      if(row == 3) {
        this.on = true ;
      }
      else {
        this.on = false ;
      }
    }
    else if(row == 1) {
      this.score = 30 ;
      this.on = true ;
      this.imgindex = 0 ;
    }
  }

  shoot() {
    if(random(1) < 0.00325 && ebullets.length < 3 && (this != lastshot || enemies.length == 1)) {
      ebullets.push(new bullet(this.x, this.y, 5.5, 1)) ;
      lastshot = this ;
    }
  }

  canShoot() {
    for(let i = 0 ; i < enemies.length ; i++) {
      if(this.x == enemies[i].x && enemies[i].y > this.y) {
        return false ;
      }
    }
    return true ;
  }

  show() {
    imageMode(CENTER) ;
    if(this.canShoot()) {
      this.shoot() ;
    }
    let imgfill ;
    if(this.on) {
      imgfill = imageson[this.imgindex] ;
    }
    else {
      imgfill = imagesoff[this.imgindex] ;
    }
    image(imgfill, this.x, this.y, this.r * 2) ;
  }
}

let espd = 10 ; // 12 ;
let edir = 1 ;
let eyspd = 0 ;
let eyspdinc = 13 ;

let frms = 30 ;
let lastfrm = frms ;

function moveEnemies() {
  let reverse = false ;
  for(let i = 0 ; i < enemies.length ; i++) {
    enemies[i].x += espd * edir ;
    enemies[i].y += eyspd ;
    enemies[i].on = !enemies[i].on ;
    if(enemies[i].x > width - enemies[i].r * 1.5 || enemies[i].x < enemies[i].r * 1.5) {
      reverse = true ;
    }
  }
  if(reverse) {
    edir *= -1 ;
    eyspd = eyspdinc ;
    if(frms > 1) {
      let offset = 5 / enemies.length ;
      if(offset > 0.1)
      frms -= offset ;
      if(frms < 1) {
        frms = 1 ;
      }
      frms = floor(frms) ;
      lastfrm = frms ;
    }
    if(frms == 1 && lastfrm == frms) {
      espd += 0.5 ;
    }
  }
  else {
    eyspd = 0 ;
  }
}
