var START = 1
var PLAY = 2
var END = 3
var gameState = START
var witchesLilled=0,zombieKilled=0;
var gun, gunIMG
var laser, laserIMG, lasersGroup
var bg, bgIMG
var bg2, bg2IMG
var bat, batIMG, batsGroup
var human, humanIMG, humanGroup
var zombie, zombieIMG, zombieGroup
var witchIMG, witch, witchGroup
var gameOver, gameOverIMG
var tryAgain, tryAgainIMG

var score = 0
var lifetime = 100

var LaserSound
var overSound

function preload(){
gunIMG = loadImage('./images/Gun.png')
laserIMG = loadImage('./images/laserlight.png')
bgIMG = loadImage('./images/back Ground.jpg')
batIMG = loadImage('./images/bat.png')
humanIMG = loadImage('./images/human.png')                                                    
zombieIMG = loadImage('./images/zombie.png')
gameOverIMG = loadImage('./images/gameover.jpg')
tryAgainIMG = loadImage('./images/tryagain.png')
LaserSound = loadSound('./sounds/laser.mp3')
overSound = loadSound('./sounds/gameover.mp3')
bg2IMG = loadImage('./images/bg2.png')
witchIMG
}






function setup() {
  createCanvas(windowWidth,windowHeight)
  
  bg = createSprite(windowWidth, windowHeight);
  bg.addImage('background', bgIMG)
  bg.scale = 1.5
  bg.velocityX = -2
  bg.x = bg.width/2

  bg2 = createSprite(windowWidth,windowHeight);
  bg2.addImage("bgsus",bg2IMG);
  bg2.scale = 1.5;
  bg2.velocityX = -2;
  bg2.x = bg2.width/2;

  gun = createSprite(windowWidth/7, windowHeight/4, 40,40)
  gun.addImage('sniper', gunIMG)
  gun.scale = 0.4
gun.debug=true
  tryAgain = createSprite(windowWidth/2,windowHeight/2,20,20)
  tryAgain.addImage('buttonBoi', tryAgainIMG)
  tryAgain.scale = 0.6
  tryAgain.visible = false

  gameOver = createSprite(windowWidth/2,windowHeight/4,20,20)
  gameOver.addImage('gameOverBoi', gameOverIMG)
  gameOver.scale = 0.6
  gameOver.visible = false

  humanGroup = new Group()
  zombieGroup = new Group()
  batsGroup = new Group()
  lasersGroup = new Group()
  witchGroup = new Group()
  score = 0;

  
}

function draw() {
  background(255,255,255);  
  drawSprites();
  if(gameState == START){
    background(bg2IMG)
  textSize(60)
  fill('black')
  textFont('Algerian')
  text('INTO THE ABYSS',windowWidth/3,windowHeight/8-20)

  textSize(55)
  stroke('black')
  fill('orange')
  textFont('Microsoft Himalaya')
  text('instruction:',windowWidth/5-80,windowHeight/8+30)

  textSize(38)
  fill('orange')
  textFont(BOLD)
  text('1) LEFT-CLICK TO SHOOT THE ZOMBIE',windowWidth/6+70,windowHeight/8+70)

  textSize(38)
  fill('orange')
  textFont(BOLD)
  text('2) DONT SHOOT HUMANS',windowWidth/6+65,windowHeight/8+110)

  textSize(38)
  fill('orange')
  textFont(BOLD)
  text('3) PRESS ENTER TO START YOUR JOURNEY IN THE ABYSS',windowWidth/6+50,windowHeight/8+230)
  

  if(keyDown('ENTER')){
  gameState = PLAY
  }
}
  if(gameState == PLAY){
  gameOver.visible = false
  tryAgain.visible = false
  
  

  if(bg.x<0){
  bg.x = bg.width/2
  }
  
  gun.y = World.mouseY

  if(mouseIsPressed){
  if(mouseButton === LEFT){
  createLaser()
  LaserSound.play()
  }
  }
  if(zombieKilled>=10)
  {
    gameState=END;
    gameOver.visible=true;
    

  }    console.log(gameState," gameState")
  if(lasersGroup.isTouching(zombieGroup)){
    zombieKilled+=1;
  score = score+75
  zombieGroup.destroyEach()
  lasersGroup.destroyEach()
  }
  if(lasersGroup.isTouching(humanGroup)){
  score -= 5
  lifetime -= 25
  humanGroup.destroyEach()
  lasersGroup.destroyEach()
}

if(lasersGroup.isTouching(batsGroup)){ 
  score += 150
  batsGroup.destroyEach()
  lasersGroup.destroyEach()
  }
 
if(lasersGroup.isTouching(witchGroup)){
  witchesLilled+=1;
score += 300
witchGroup.destroyEach()
lasersGroup.destroyEach()
}

console.log(gameState)," game state";
console.log(score, " score")
if(score >= 500 && score <= 1500){
 // lifetime = lifetime-5
  spawnBats()
  }

  if(score >= 1500 && score <= 3000){
    //lifetime = lifetime-10
    spawnWitch()
    }

    if(score >= 3000){
      background(0);
      textSize(80);
      textFont("Monotype Corsiva");
      fill("#DB193E");
      text("Congrats, You litrally survived hell.",windowWidth/2 - 80,windowHeight/6);
      }




spawnZombies()
spawnHumans()
textSize(40);
 textFont("Microsoft Himalaya");
fill("#ff7c0a");
 text("Score:"+score,windowWidth/2 + 480,windowHeight/14 - 20)

 textSize(40);
 textFont("Microsoft Himalaya"); 
 fill("#ff7c0a"); 
 text("LifeTime:"+lifetime,windowWidth/2 + 480,windowHeight/13);
    }
if(lifetime == 0){
  
    //gameState = END
    if(!overSound.isPlaying())
      overSound.play()
    tryAgain.visible=true
    //score=0
    
    
}
if(mousePressedOver(tryAgain)){
  TryAgain();
  
}


      


  
  
  

}

function createLaser(){
laser = createSprite(windowWidth/7+80,windowHeight/4,3,13)
laser.addImage('Blast', laserIMG)
laser.scale = 0.2
laser.velocityX = 10
laser.lifetime = 35
lasersGroup.add(laser)
laser.y = gun.y
}

function spawnZombies(){
if(frameCount%60 === 0){
zombie = createSprite(1000,random(50,400),40,40)
zombie.addImage('monster', zombieIMG)
zombie.scale = 0.1
zombie.y = Math.round(random(20,400))
zombie.lifetime = 60
zombie.velocityX = -10
zombieGroup.add(zombie)

}

}

function spawnBats(){
  if(frameCount%20 === 0){
  bat = createSprite(1000,random(200,700),40,40)
  bat.addImage('bat', batIMG)
  bat.scale = 1
  bat.y = Math.round(random(50,700))
  bat.lifetime = 60
  bat.velocityX = -20
  batsGroup.add(bat)
  
  }


}

function spawnWitch(){
  if(frameCount%200 === 0){
  witch = createSprite(1000,random(300,500),40,40)
  witch.addImage('monster3', witchIMG)
  witch.scale = 0.5
  witch.y = Math.round(random(100,600))
  witch.lifetime = 60
  witch.velocityX = -30
  witchGroup.add(witch)


  
  }
}
  function spawnHumans(){
    if(frameCount%100 === 0){
    human = createSprite(1000,random(100,700),60,60)
    human.addImage('monsterNo', humanIMG)
    human.scale = 0.3
    human.y = Math.round(random(200,600))
    human.lifetime = 60
    human.velocityX = -10
    humanGroup.add(human)


}
}

function TryAgain(){
  gameState = PLAY;
// overSound.stop()
zombieKilled=0;
    score = 0;
lifetime = 100;

bg.visible = true;
bg.velocityX = -2;
gun.visible = true;

  gameOver.visible = false;
tryAgain.visible = false;

}
