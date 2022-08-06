var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var i = 1;
var cleared = 0;
var j = 0;
$(document).on("keypress", function (e) {
  if (i == 1) {
    i = 0;
    nextSequence();
  }
});
$(".btn").click(function (e) {
  e.preventDefault();
  var button = e.target;
  var userChosenColor = button.id;
  playSound(userChosenColor);
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(current) {
  if (userClickedPattern[current] == gamePattern[current]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("h1").text("Score is " + level + ", press any key to restart");
    i = 1;
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
    return;
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  chooseButton = "#" + randomChosenColor;
  $(chooseButton).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  var location = "sounds/" + name + ".mp3";
  var audio = new Audio(location);
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
