class Form {

  constructor() {
    this.reset = createButton('reset');
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2');
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display(){
    this.title.html("snowMan Racing Game");
    this.title.position(displayWidth/2 - 50, 0);
    this.reset.position(displayWidth - 100,50);
    this.input.position(displayWidth/2 - 40 , displayHeight/2 - 80);
    this.button.position(displayWidth/2 + 30, displayHeight/2);

    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name)
      this.greeting.position(displayWidth/2 - 70, displayHeight/4);
    });

    this.reset.attribute("onClick","window.location.reload();")
      
    this.reset.mousePressed(()=>{
      game.update(0);
      player.updateCount(0);
      player.updateReset();
      Player.updatesnowMansAtEnd(0);
     
    });
  }

  displayEnd(){
    var leaderboard = createElement('h1');
    leaderboard.position(displayWidth/2,displayHeight/2-300);
    // leaderboard.html(player.rank);
     leaderboard.style('background','#4394E5');
     leaderboard.style('border-radius','2px');

    leaderboard.style('padding','50px');
    var display_position = 100;
    //for(var plr in allPlayers){
 
      leaderboard.position(displayWidth/2-50,display_position);
      textSize(15);
     
     var arr = []
      arr.push(allPlayers.player1)
      arr.push(allPlayers.player2)
      arr.push(allPlayers.player3)
      arr.push(allPlayers.player4)
      function compare_qty(a, b){
        // a should come before b in the sorted order
        if(a.rank < b.rank){
                return -1;
        // a should come after b in the sorted order
        }else if(a.rank > b.rank){
                return 1;
        // a and b are the same
        }else{
                return 0;
        }
}
      console.log(arr.sort(compare_qty));

      for(var ele in arr){
        display_position+=20;
if(arr[ele].rank !== undefined){
      leaderboard.html(arr[ele].name + ": " + arr[ele].rank + "<br>", 120,display_position);
    //  leaderboard.html(ele.name + ": " + ele.rank + "<br>", 120,display_position);
}
  //  }
    }
  }


}
