class Game {
  constructor() {

  }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    snowMan1 = createSprite(100, 200);
    snowMan1.addAnimation("snowMan1", snowMan1_img);
    snowMan1.addAnimation("through", snowMan1_img_through);
    snowMan1.scale = 0.3
    snowMan2 = createSprite(300, 200);
    snowMan2.addAnimation("snowMan2", snowMan1_img);
    snowMan2.addAnimation("through", snowMan1_img_through);
    snowMan2.scale = 0.3
    snowMan3 = createSprite(500, 200);
    snowMan3.scale = 0.3
    snowMan3.mirrorX(-1)
    snowMan3.addAnimation("snowMan3", snowMan1_img);
    snowMan3.addAnimation("through", snowMan1_img_through);
    snowMan4 = createSprite(700, 200);
    snowMan4.scale = 0.3
    snowMan4.addAnimation("snowMan4", snowMan1_img);
    snowMan4.addAnimation("through", snowMan1_img_through);
    snowMan4.mirrorX(-1)
    snowMans = [snowMan1, snowMan2, snowMan3, snowMan4];

  }

  play() {
    form.hide();

    Player.getPlayerInfo();
    player.getsnowMansAtEnd();

    if (allPlayers !== undefined) {
      background(rgb(198, 135, 103));
      image(track, 0, 0, displayWidth, displayHeight);

      var display_position = 100;

      //index of the array
      var index = 0;

      //x and y position of the snowMans
      var x = 175;
      var y = 100;

      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //position the snowMans a little away from each other in x direction
        x = 200 + (index * 200) + allPlayers[plr].distanceX;
        //use data form the database to display the snowMans in y direction
        y = displayHeight - allPlayers[plr].distance;
        snowMans[index - 1].x = x;
        snowMans[index - 1].y = y;

        if (index === player.index) {
          fill("red");
          ellipse(x, y, 60, 60);
          snowMans[index - 1].shapeColor = "red";
          if (keyDown("space")) {
            console.log("move")
            snowMans[index - 1].changeAnimation("through", snowMan1_img_through)
            console.log(snowMans[index - 1])
            console.log(index)
            if (index == 3 && index == 4) {
              console.log("through left")
              this.createSnow(snowMans[index - 1].x, snowMans[index - 1].y, 0)
            } else {
              console.log("through right")
              this.createSnow(snowMans[index - 1].x, snowMans[index - 1].y, 1)
            }
          }
          // camera.position.x = displayWidth/2;
          // camera.position.y = snowMans[index-1].y;
        }


        textSize(15);
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120, display_position)
      }

    }

    // 
    if (player.distance < 400) {


      if (keyIsDown(UP_ARROW) && player.index !== null) {
        player.distance += 10
        player.update();
      }

    }

    if (keyIsDown(DOWN_ARROW) && player.index !== null) {
      player.distance -= 10
      player.update();
    }
    if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
      player.distanceX += 10
      player.update();

    }
    if (keyIsDown(LEFT_ARROW) && player.index !== null) {
      player.distanceX -= 10
      player.update();

    }
    // if (player.distance > 3860) {
    //   gameState = 2;
    //   player.rank += 1;
    //   player.update();
    //   Player.updatesnowMansAtEnd(player.rank);
    // }



    drawSprites();
  }

  end() {
    console.log("Game Ended");
    form.displayEnd();


  }

  createSnow = (x, y, dir) => {
    var snow = createSprite(x, y)
    snow.addImage(snow_img)
    snow.scale = 0.07
    if (dir == 0) {
      snow.velocityX = 2;
    } else if (dir == 1) {
      snow.velocityX = +2;
    }
  }

}
