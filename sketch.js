var fundoImg, fundo;
var ufoImg, ufo;
var fogueteImg, foguete;
var coinImg, coin;
var explosaoImg, explosao; 

var coinGroup;
var ufoGroup;

var score = 0;
var life = 3;

var gameState = "play";

//carregar imagens
function preload() {
  fundoImg=loadImage("img/fundo.jpg");
  ufoImg = loadImage("img/v.png");
  fogueteImg = loadAnimation("img/e.png");
  explosaoImg = loadAnimation("img/1337.png")
  coinImg = loadImage("img/moeda.png")

  


}


function setup() {
  createCanvas(1000,1000);

  //criar sprites
  fundo=createSprite(600,600)
  fundo.addImage(fundoImg)
  fundo.scale=3.5

  foguete = createSprite(400,500)
  foguete.addAnimation("foguete", fogueteImg)
  foguete.addAnimation("explosao", explosaoImg) 
  foguete.scale = 0.8

  coinGroup = new Group()
  ufoGroup = new Group()

}

function draw() {
  background(0);

  drawSprites();

  textSize(25)
  fill("red")
  text("Vidas: " + life, 60, 100)

  textSize(25)
  fill("red")
  text("pontuacao: " + score, 60,70)
  
  //criar estado de jogo "play"
  if (gameState=="play") {
    fundo.velocityY= 4;

    if (fundo.y > 900) {
      fundo.y = 100
      
    }
    if (keyDown("RIGHT_ARROW")) {
      foguete.x += 5;
    }
    if (keyDown("LEFT_ARROW")) {
      foguete.x -= 5;
    }
    if (keyDown("UP_ARROW")) {
      foguete.y -= 5;
    }
    if (keyDown("DOWN_ARROW")) {
      foguete.y += 5;
      
    }
    removeLife()
    removeCoins()
    spawnAliens()
    spawnCoins()
    
    if (life == 0 ) {
      gameState = "end"

      }
      
    }
//criar estado de jogo "end"
  if (gameState == "end") {
    coinGroup.destroyEach()
    ufoGroup.destroyEach()
    fundo.velocityY = 0
    foguete.velocityX = 0
    //mudar animação fo foguete para explosao
    foguete.changeAnimation("explosao", explosaoImg)
    textSize(30)
    fill("red")
    text("Game Over!!!", 300, 400)
  }
 
    
  }
  


  
  


function spawnAliens() {
  if (frameCount % 60 == 0) {
    ufo = createSprite(random(30,700), random(10,450))
    ufo.addImage(ufoImg)
    ufo.velocityY = 3
    ufo.scale = 0.7
    //tempo de vida do sprite
    ufo.lifeTime = 800
    ufoGroup.add(ufo)
    
  }
}

function spawnCoins() {
  if (frameCount % 60 == 0) {
    coin = createSprite(random(30,700), random(10,450))
    coin.addImage(coinImg)
    coin.velocityY = 3
    coin.scale = 0.7
    //tempo de vida do sprite
    coin.lifeTime = 800
    coinGroup.add(coin)
    
  }
  
 
}

function removeCoins() {
  foguete.overlap(coinGroup, function(collector, collected){
    score += 1;
    collected.remove();
  });
}

function removeLife() {
  foguete.overlap(ufoGroup, function(collector, collected){
    life -= 1;
    collected.remove();
  });
  
 }