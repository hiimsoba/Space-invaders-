class player {
  constructor() {
    this.x = width / 2 ;
    this.y = height * 0.95 ;
    this.r = 30 ;
  }

  move() {
    if(toLeft) {
      this.x -= mspd ;
    }
    else if(toRight) {
      this.x += mspd ;
    }
    this.x = constrain(this.x, this.r, width - this.r) ;
  }

  shoot() {
    if(toSht && !pbullets.length) {
      pbullets.push(new bullet(this.x, this.y, 10, -1)) ;
      toSht = false ;
    }
  }

  show(img) {
    this.shoot() ;
    if(frameCount % 3 == 0)
      this.move() ;
    noStroke() ;
    imageMode(CENTER) ;
    image(img, this.x, this.y, this.r * 2) ;
  }
}

function showStats() {
  textAlign(LEFT) ;
  textSize(16) ;
  fill(255) ;
  text("SCORE : " + score, 10, 25) ;
  text("LIVES : " + lives, width - 75, 25) ;
}

let score = 0 ;
let lives = 5 ;

let mspd = 15 ;
let sht = false ;
let toSht = false ;
let toRight = false ;
let toLeft = false ;

function keyPressed() {
  setMove(keyCode, true);
}

function keyReleased() {
  setMove(keyCode, false);
}

function setMove(k, b) {
  switch (k) {
    case 82 :
      if(!lives || end)
        resetgame() ;
      break ;
    case 65 :
      toLeft = b ;
      break ;
    case 37 :
      toLeft = b ;
      break ;
    case 68 :
      toRight = b ;
      break ;
    case 39 :
      toRight = b ;
      break ;
    case 32 :
      toSht = b ;
      break ;
    default :
      break ;
  }
}
