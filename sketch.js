var PLAY = 1;
var END = 0;
var gameState = PLAY;

var square1, square1Img,edges;
var garden,gardenImg;
var obstaclesGroup, obstacle1, obstacle2, obstacle3;
var score=0;
var gameOverImg, restartImg;


function preload(){
  square1Img=loadImage("square-sprite.png")
  gardenImg=loadImage("Background-Img-capstone.jpg")
  obstacle1=loadImage("spike-1.png")
  obstacle2=loadImage("spike-3.jpg")
  obstacle3=loadImage("spikes-4.png")
  
  gameOverImg=loadImage("gameOver.png")
  restartImg=loadImage("restart.png")
  
}

function setup() {
  createCanvas(450,400)
  
  
  garden=createSprite(300,195,windowWidth,windowHeight)
  garden.addImage("Moving", gardenImg)
  garden.scale=1.2
  
  
  square1=createSprite(50,370,20,20)
  square1.addImage("running", square1Img)
  edges = createEdgeSprites();
 
  square1.scale=0.15
  
  
  gameOver = createSprite(225,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(225,140);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  obstaclesGroup=createGroup();
  
  
                             
}

function draw() {
  background("black");
  
  
  
  
  
  if(gameState===PLAY){
    gameOver.visible=false
    restart.visible=false
    garden.velocityX = -4;
     if(frameCount%3===0){                                                        
       score=score+1
       }
    
    spawnObstacles();
    
    
    if (garden.x < 150) {
    garden.x = garden.width/2
  }
  
  if(keyDown("space")&& square1.y >= 373){
    square1.velocityY=-20
  }
    
    
    console.log(square1.y)
  square1.velocityY = square1.velocityY + 0.8
    
    if(obstaclesGroup.isTouching(square1)){
        //trex.velocityY = -12;
        
        gameState = END;
        
      
    }
  
  }
  else if (gameState === END){
    gameOver.visible=true
    restart.visible=true
    
    square1.visible=false
    garden.visible=false
    obstaclesGroup.destroyEach()
    garden.velocityX=0
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(0);
    
    
    if(mousePressedOver(restart)) {
      reset();
    }
    
    
    
  }
  
  square1.collide(edges[3])
  
  
  
  
  
  
  drawSprites();
  textSize(50)
  text("score"+score,250,50)
  
}


function reset(){
  
  gameState= PLAY
  
  square1.visible=true
  garden.visible=true
  
  score=0
  
  
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,380,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
    
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}