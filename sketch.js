
var monkey , monkey_running
var banana ,bananaImage
var obstacle, obstacle1
var bananaGroup, obstacleGroup
var ground, invisibleGround
var score
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;


function preload(){
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  
  obstacle1 = loadImage("obstacle.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running);
   monkey.scale = 0.09;
  ground = createSprite(200,180,800,8);
  ground.x = ground.width /2;

  invisibleGround = createSprite(200,184,400,10);
  invisibleGround.visible = false;
  
 
  
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();

  monkey.setCollider("rectangle",0,0);
  //monkey.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(180);
  
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){
    
    //ground.velocityX = -(4 + 3* score/100)
    
    score = score + Math.round(getFrameRate()/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8
  
    spawnfood();
  
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach()
    }
  }
   else if (gameState === END) {
     
     ground.velocityX = 0;
      monkey.velocityY = 0
      
    
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);    
   }
  
  monkey.collide(invisibleGround);
  
  


  drawSprites();
}

function reset(){
  gameState=PLAY
  cloudsGroup.destroyEach()
  obstaclesGroup.destroyEach()
  score=0
}


function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle2 = createSprite(600,165,10,40);
    obstacle2.velocityX = -(6 + score/100);
    obstacle2.y = Math.round(random(160,170));
    obstacle2.addImage(obstacle1);
    obstacle2.scale = 0.09;
    obstacle2.lifetime = 300;
    
  obstaclesGroup.add(obstacle2);
 }
}

function spawnfood() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.09;
    banana.velocityX = -3;
    
    banana.lifetime = 200;
    
  
    bananaGroup.add(banana);
  }
}
