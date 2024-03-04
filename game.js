var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var isStart = false;

var level = 0;

function nextSequence(){
 userClickedPattern = [];

 var randomNumber = Math.random()*4;
 randomNumber = Math.floor(randomNumber);
 var randomChosenColour = buttonColours[randomNumber];
 gamePattern.push(randomChosenColour);
 
 $("#"+randomChosenColour).animate({opacity: 0.25}, 200, function() {$(this).animate({opacity: 1}, 200);
 playSound(randomChosenColour);
});
 
 level++;
 $("h1").text("Level "+level);
}



$(".btn").on("click",function(){
    handler(this.id);
    playSound(this.id);
    waitingFunc("#"+this.id,"pressed",100);
    checkAnswer(userClickedPattern.length-1);
})

$(document).on("keypress",function(){
    if(!isStart)
    {
        $("h1").text("Level "+level);
        isStart = true;
        nextSequence();
    }
})



function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function handler(id){

    var userChosenColour = id;
    userClickedPattern.push(userChosenColour);
}


function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
     console.log("success");
     if (userClickedPattern.length === gamePattern.length){
     
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }
  }
  else
  {
    console.log("wrong");
    playSound("wrong");
    waitingFunc("body","game-over",200);
    $("h1").text("Game Over, Press Any Key to Restart");
    gameOver();
  }

}

function gameOver(){
    isStart = false;
    level = 0;
    gamePattern = [];
}

function waitingFunc(doc,classname,ms){
    $(doc).addClass(classname);
    setTimeout(function(){
        $(doc).removeClass(classname);
 
    }, ms);
}

