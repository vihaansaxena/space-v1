// Declare variables here
var input
var button,score=0;
var spaceImg,space
var hr,sc,mn;
var gameState=1
var edges;
var title,alienship1,alienship1Img
var barrier,bullet,spaceShuttle,spaceShuttleImg;
var bullet_enemy;
var alienship1Grp, bulletGrp;
var heart1,heart2,heart3;
var heartImg;
var laser,laserImg;
var boss,bossImg;
var bulletGrpEnemy;
var backSound;
var hearts=10;
var gameOver,gameOverImg,award,awardImg;
var restartButton;
var explosionSound;
function preload(){
   spaceImg=loadImage("Infinite space.jpg") 
   alienship1Img=loadImage("Alien Spaceship 1.jpg")
   spaceShuttleImg=loadImage("spaceShuttle.png")
   explosion = loadAnimation("1.png","2.png","3.png","4.png","5.png");
  heartImg=loadImage("heart.png")
   myBulletImg=loadImage("myBullet.png")
 enemyBulletImg=loadImage("enemyBullet.png")
gameOverImg=loadImage("gameOver.png")
backSound=loadSound("yt1s.com - 20 second Royalty free intro music upbeat.mp4")
  explosionSound=loadSound("explosion sound effects.mp4")
}
function setup(){
    background('red')
    createCanvas(1200,700);
    space=createSprite(200,200)
            space.addImage(spaceImg)
            space.scale=2
            space.velocityY=-5;
            
   
    spaceShuttle=createSprite(190,550)
    spaceShuttle.addImage(spaceShuttleImg)
    spaceShuttle.scale=1.2;
    spaceShuttle.visible = false;
    spaceShuttle.setVelocity(0,0)

    heart1=createSprite(40,125);
    heart1.addImage(heartImg);
    heart1.scale=0.1;

    heart2=createSprite(90,125);
    heart2.addImage(heartImg);
    heart2.scale=0.1;

    heart3=createSprite(140,125);
    heart3.addImage(heartImg);
    heart3.scale=0.1;

    heart4=createSprite(190,125);
    heart4.addImage(heartImg);
    heart4.scale=0.1;
   
    heart5=createSprite(240,125);
    heart5.addImage(heartImg);
    heart5.scale=0.1;

    edges = createEdgeSprites();
    bulletGrpEnemy= new Group();
    alienship1Grp = new Group();
    bulletGrp = new Group();
  
}

function draw (){
    background("white");
     
    if(gameState===1){
        spaceShuttle.visible = true;
        spaceShuttle.bounceOff(edges);
        spaceship1();

        if(bulletGrpEnemy.isTouching(spaceShuttle)){
            explosionSound.play();
            hearts=hearts-1;
           
            ignition= createSprite(spaceShuttle.x,spaceShuttle.y+20)
    ignition.addAnimation("burning",explosion)
    ignition.scale=0.8;
    ignition.lifetime=20;
            bulletGrpEnemy.destroyEach();
            switch (hearts){
                case 8: heart5.visible = false;
                break ;
                case 6: heart4.visible = false;
                break;
                case 4: heart3.visible = false;
                break ;
                case 1: heart2.visible = false;
                break ;
                
            }
        } 
        if (hearts === 0){
            gameState = 2;
        }
        
        if(bulletGrp.isTouching(alienship1Grp)){
            explosionSound.play();
            alienship1Grp.destroyEach();
            ignition= createSprite(alienship1.x,alienship1.y)
            ignition.addAnimation("burning",explosion)
            ignition.lifetime=50;
            bullet_enemy.destroy();
            bullet.destroy();

            score=score+10;
        }
         
    }
   
    if(gameState === 2){
   gameOver=createSprite(width/2,height/2);
   gameOver.addImage(gameOverImg);
   gameOver.scale=1.5
   spaceShuttle.destroy();
   alienship1Grp.destroyEach();
   bulletGrpEnemy.destroyEach();
  
    }
    
if(score===500){
    
    spaceShuttle.destroy();
    alienship1Grp.destroyEach();
    bulletGrpEnemy.destroyEach();
       text("You Win", 650,350);
    
}
     
    if(space.y<0){
        space.y=150
       }
   
   
    drawSprites();
    
textSize(20);
fill('red')
  //  text(mouseX+","+mouseY,mouseX,mouseY)
   text("Your Score :- "+score,60,70) 
}

function spaceship1(){
    
        if(gameState===1 && frameCount %100 === 0){
        alienship1=createSprite(random(200,1000),random(20,spaceShuttle.y -200));
        alienship1.addImage(alienship1Img)
        alienship1.depth=space.depth+1
        alienship1.scale=1;
        alienship1.lifetime = 200;
        alienship1Grp.add(alienship1);
        bullet_enemy=createSprite(alienship1.x,alienship1.y,10,10);
        bullet_enemy.velocityX = random(-20,-5);
        bullet_enemy.velocityY = 20;
        bullet_enemy.addImage(enemyBulletImg);
        bullet_enemy.scale=0.15
        bullet_enemy.lifetime=200;
        bulletGrpEnemy.add(bullet_enemy);
        }

}
 
function keyPressed(){
    if(keyCode===32 &&gameState===1 && score!=500){
        bullet=createSprite(spaceShuttle.x,spaceShuttle.y-30)
        bullet.velocityY= -10;
        bullet.scale=0.15;
        bullet.addImage(myBulletImg);
        bullet.lifetime=500;
        bulletGrp.add(bullet);
     
    }
    
    if(spaceShuttle.x>100){
    if(keyCode===LEFT_ARROW&&gameState===1){
        spaceShuttle.velocityX=-5;
    }
    }   
     
    if(spaceShuttle.x<1100){
    if(keyCode===RIGHT_ARROW&&gameState===1){
        spaceShuttle.velocityX= 5;
    }
    }
  
    }