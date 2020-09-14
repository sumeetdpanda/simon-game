var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;


// Listner for keypress / *Game Start*
$(document).keydown(function(){
  if (!gameStarted) {
    $("#level-title").text("Level "+level);
    gameStarted = true;
    nextSequence();
  }
});

// User's input
$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

// Function for next sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

// Funtion for playing sounds
function playSound(e){
  var audio = new Audio("sounds/"+e+".mp3");
  audio.play();
}

// Function for animating clicks
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

// Function for checking answers
function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    // nextSequence();
    console.log("Success");

    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else {
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    playSound("wrong");
    $("#level-title").text("Game Over, Press any key to restart!");
    startOver();
  }
}

// Funtion for restarting a game
function startOver(){
  gameStarted = false;
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}

// Modal Box Script
var modal = document.getElementById("myModal");

var btn = document.getElementById("rulesButton");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event){
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
