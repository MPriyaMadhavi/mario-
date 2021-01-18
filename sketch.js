var background_Image;
var ground, groundImage;
var mario, marioImage;
var cloud1, cloud2;
var redCactus, greenCactus;
var longBrick, smallBrick;
var coinImg;
var longStairs, Stairs2, Stairs3;
var score = 0;
var lives = 5;
var gameState = "PLAY";
var cactusGroup,  coinGroup, GcactusGroup, CloudGroup, brickGroup, QcactusGroup;


function preload(){
background_Image = loadImage("marioImages/background.jpg");
groundImage = loadImage("marioImages/ground.png")
marioImage = loadAnimation("marioImages/mario1.png", "marioImages/mario2.png");
cloud1 = loadImage("marioImages/cloud1.png");
cloud2 = loadImage("marioImages/cloud2.png")
redCactus = loadImage("marioImages/Rcactus.png");
greenCactus = loadImage("marioImages/Gcactus.png");
longBrick = loadImage("marioImages/bricks.jpg");
smallBrick = loadImage("marioImages/brick2.png");
questionBrick = loadImage("marioImages/question.jpg");
coinImg = loadAnimation("marioImages/coin1.png","marioImages/coin2.png","marioImages/coin3.png","marioImages/coin4.png","marioImages/coin5.png","marioImages/coin6.png");
cactus4  = loadImage("marioImages/cactus.png");
}

function setup() {
  createCanvas(1000,580);
  
  cactusGroup = new Group();
  stairsGroup = new Group();
  coinGroup = new Group();
  CloudGroup = new Group();
  GcactusGroup = new Group();
  brickGroup = new Group();
  QbrickGroup = new Group();


  ground = createSprite(500, 580, 100000000, 20);
  ground.addImage(groundImage);
  ground.scale = 1.4;
  ground.velocityX = -7;
  ground.x = ground.width/2;

  mario = createSprite(90, 495, 20, 20);
  mario.addAnimation("running", marioImage);
  mario.scale = 0.4;
  //console.log(mario.y);
  mario.setCollider("rectangle", 0, 0, 110,180);
}

function draw() {
  background(background_Image);  
  if(gameState === "PLAY"){
  if(ground.x < 0){
    ground.x = ground.width/2;
  }

  if(keyDown("SPACE")&&mario.y > 100){
    mario.velocityY = -14;
  }

  mario.velocityY = mario.velocityY + 0.8;

  mario.collide(ground); 

  //mario.bounceOff(GcactusGroup);
  if(mario.isTouching(GcactusGroup)){
    mario.velocityY = -14;
    mario.velocityY = mario.velocityY + 0.8;

  }

  if(mario.isTouching(brickGroup)){
    mario.velocityY = -12;
    mario.velocityY = mario.velocityY + 0.8;

  }

  if(mario.isTouching(QbrickGroup)){
    mario.velocityY = -12;
    mario.velocityY = mario.velocityY + 0.8;
    score = score + 2;
  }

  for(var i = 0; i < coinGroup.length; i++){
    if(coinGroup.isTouching(mario)){
      coinGroup.get(i).destroy(i);
      score = score + 1;
    }
  }

  for(var j = 0; j < cactusGroup.length; j++){
    if(cactusGroup.isTouching(mario)){
      cactusGroup.get(j).destroy(j);
      lives = lives - 1;
    }
  }

  
  if(lives === 0){
    gameState = "END";
  }
 
  //mario.debug = true;
  
  spawnClouds();
  spawnCactus();
  spawnBricks();
  spawnCoins();
  spawnQbrick()
  spawnGcactus();
  }
  else if(gameState === "END"){
    cactusGroup.setVelocityXEach(0);
    ground.velocityX = 0;
    mario.velocityY = 0;
    QbrickGroup.setVelocityXEach(0);
    coinGroup.setVelocityXEach(0);
    
    GcactusGroup.setVelocityXEach(0);
    brickGroup.setVelocityXEach(0);
    cactusGroup.setVelocityXEach(0);
    CloudGroup.setVelocityXEach(0);
    
  }
  textFont("Algeria");
  textSize(25);
  fill("white");
  text("Lives Remaining : " + lives, 50, 50);

  textFont("Algeria");
  textSize(25);
  fill("white");
  text("Score : " + score, 850, 50);
  drawSprites();
}

function spawnClouds() {
  if(frameCount % 60 === 0) {
    var cloud = createSprite(1000,Math.round(random(100, 165)),10,40);
    cloud.velocityX = -7;
    
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: cloud.addImage(cloud1);
              break;
      case 2: cloud.addImage(cloud2);
              break;
      default: break;
    }
    
    cloud.scale = 1.5;
    cloud.lifetime = -1;
    CloudGroup.add(cloud);
   
  }
}

function spawnCactus() {
  if(frameCount % 140 === 0) {
    var cactus = createSprite(1000,510,10,40);
    cactus.velocityX = -7;
    
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: cactus.addImage(redCactus);
              break;
      case 2: cactus.addImage(greenCactus);
              break;
      default: break;
    }
    
    cactus.scale = 2;
    cactus.lifetime = -1;
    cactusGroup.add(cactus);

    cactus.setCollider("rectangle", 0, 0, 10, 10);
    cactus.debug = true;
    
  }
  //cactusGroup.add(cactus);
}

function spawnBricks() {
  if(frameCount % 120 === 0) {
    var brick = createSprite(1000,Math.round(random(270, 305)),10,40);
    brick.velocityX = -7;
    
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: brick.addImage(longBrick);
              break;
      case 2: brick.addImage(smallBrick);
              break;
             
      default: break;
    }
    
    brick.scale = 1;
    brick.lifetime = -1;
    brickGroup.add(brick);
   
  }
}

function spawnCoins(){
  if(frameCount % 80 === 0){
    var coin = createSprite(1000, Math.round(random(315, 510)),10,40);
    coin.addAnimation("reward", coinImg);
    coin.velocityX = -7;
    coin.scale = 1;
    coin.lifetime = -1;
    coinGroup.add(coin);
  }
}

function spawnGcactus() {
  if(frameCount % 130 === 0) {
    var cactus3 = createSprite(1000,510,10,40);
    cactus3.velocityX = -7;
    cactus3.addImage(cactus4);
    
    cactus3.scale = 2;
    cactus3.lifetime = -1;
    GcactusGroup.add(cactus3);   
  }
}

function spawnQbrick() {
  if(frameCount % 130 === 0) {
    var Qbrick = createSprite(1000,305,10,40);
    Qbrick.velocityX = -7;
    Qbrick.addImage(questionBrick);
    
    Qbrick.scale = 1;
    Qbrick.lifetime = -1;
    QbrickGroup.add(Qbrick);
    }
}


function reset(){
  gameState ="PLAY";
  gameOver.visible = false;
  restart.visible = false;
  QbrickGroup.setVelocityXEach(0);
    coinGroup.setVelocityXEach(0);
    
    GcactusGroup.setVelocityXEach(0);
    brickGroup.setVelocityXEach(0);
    cactusGroup.setVelocityXEach(0);
    CloudGroup.setVelocityXEach(0);
  
  score = 0;
  
}