let p ;
let enemies = [] ;
let pbullets = [] ;
let ebullets = [] ;

let cols = 11 ;
let rows = 5 ;

let xscl ;
let yscl ;

let imageson = [] ;
let imagesoff = [] ;
let pimage ;

let pdead ;
let edead ;

let lastshot ;

let end = false ;

function createEnemies(xscl, yscl, y) {
  if(frms < 15) {
    frms = floor(frms + frms * 0.3) ;
  }
  for(let i = 0 ; i < rows ; i++) {
    for(let j = 0 ; j < cols ; j++) {
      enemies.push(new enemy(xscl * 0.8 + j * xscl, yscl + i * yscl, 0.75, 1, i + 1)) ;
    }
  }
}

function setup() {
  createCanvas(800, 600) ;
  p = new player() ;

  xscl = 0.95 * width / cols ;
  yscl = 0.45 * height / rows ;
  createEnemies(xscl, yscl) ;
  lastshot = enemies[0] ;
}

let wait = false ;

let deaths = [] ;

function draw() {
  if(wait) {
    frameRate(60) ;
    wait = false ;
  }
  if(!lives || end) {
    gameover() ;
  }
  else {
    background(0) ;
    p.show(pimage) ;
    for(let i = pbullets.length - 1 ; i >= 0 ; i--) {
      pbullets[i].show() ;
      if(pbullets[i].offScreen()) {
        pbullets.splice(i, 1) ;
      }
    }

    for(let i = ebullets.length - 1 ; i >= 0 ; i--) {
      ebullets[i].show() ;
      if(ebullets[i].checkCollision(p)) {
        wait = true ;
        lives-- ;
        fill(0) ;
        ellipse(p.x, p.y, p.r * 3) ;
        p.show(pdead) ;
        ellipse(ebullets[i].x, ebullets[i].y, ebullets[i].r) ;
        ebullets.splice(i, 1) ;
      }
      else if(ebullets[i].offScreen()) {
        ebullets.splice(i, 1) ;
      }
    }

    for(let i = deaths.length - 1 ; i >= 0 ; i--) {
      deaths[i][2]-- ;
      image(edead, deaths[i][0], deaths[i][1]) ;
      if(deaths[i][2] == 0) {
        deaths.splice(i, 1) ;
      }
    }

    for(let i = enemies.length - 1 ; i >= 0 ; i--) {
      enemies[i].show() ;
      if(enemies[i].y > - p.r + p.y) {
        end = true ;
      }
      for(let j = pbullets.length - 1 ; j >= 0 ; j--) {
        if(pbullets[j].checkCollision(enemies[i])) {
          score += enemies[i].score ;
          deaths.push([enemies[i].x, enemies[i].y, 5]) ;
          enemies.splice(i, 1) ;
          pbullets.splice(j, 1) ;
        }
      }
    }

    if(frameCount % frms == 0) {
      moveEnemies() ;
    }

    if(!enemies.length) {
      createEnemies(xscl, yscl) ;
      eyspdinc += 1.25 ;
    }
    showStats() ;
  }
  if(wait) {
    frameRate(1) ;
  }
}

function gameover() {
  background(0) ;
  fill(255, 0, 0) ;
  textSize(64) ;
  textAlign(CENTER) ;
  text("GAME OVER!", width / 2, height * 0.44) ;
  textSize(48) ;
  text("Score : " + score, width / 2, height * 0.55) ;
  fill(255) ;
  textSize(32) ;
  text("Press 'R' to reset the game!", width / 2, height * 0.75) ;
}

function resetgame() {
  lives = 5 ;
  score = 0 ;
  createEnemies(xscl, yscl) ;
  p = new player() ;
  enemies = [] ;
  pbullets = [] ;
  ebullets = [] ;
  espd = 10 ;
  edir = 1 ;
  eyspd = 0 ;
  eyspdinc = 10 ;
  end = false ;
  frms = 30 ;
}

function preload() {
  pimage = loadImage('https://i.imgur.com/Ot7VeHA.png') ;
  pdead = loadImage('https://i.imgur.com/ZXJIxxY.png') ;

  edead = loadImage('https://i.imgur.com/uzCHmT2.png') ;

  img = loadImage('https://i.imgur.com/f0f6Mj8.png') ;
  imageson.push(img) ;

  img = loadImage('https://i.imgur.com/H5xKq1j.png') ;
  imagesoff.push(img) ;

  img = loadImage('https://i.imgur.com/bQuN9sj.png') ;
  imageson.push(img) ;

  img = loadImage('https://i.imgur.com/Pwl3BOs.png') ;
  imagesoff.push(img) ;

  img = loadImage('https://i.imgur.com/Gt1fft6.png') ;
  imageson.push(img) ;

  img = loadImage('https://i.imgur.com/FDoQP7r.png') ;
  imagesoff.push(img) ;
}
