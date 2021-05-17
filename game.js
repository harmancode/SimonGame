const buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var audioElements = [];

var level = 0;

var isGameOver = false;

var clickable = true;

var gameStarted = false;

prepareForStart();

function startGame() {
  createAudioElements();
  gameStarting();
}

function gameStarting() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  var headerText = "Game is starting..."
  $("#level-title").text(headerText);
  playSound("start");
  $("#level-title").removeClass("game-over");
  gameStarted = true;
  clickable = true;
  isGameOver = false;
  setTimeout(function() {
    nextSequence();
  }, 900);
}

function prepareForStart() {
  var headerText = "Click any color to start"
  $("#level-title").text(headerText);
  addClickEventListener();
}

function createAudioElements() {
  // Create audio elements and add them to audioElements array.
  for (let i = 0; i < 6; i++) {
    var audioElement = document.createElement("audio");
    var filePath = "sounds/"
    if (i < 4) {
      filePath = filePath + buttonColors[i] + ".mp3";
    } else if (i == 4) {
      filePath = filePath + "wrong" + ".mp3";
    } else if (i == 5) {
      filePath = filePath + "start" + ".mp3";
    }
    audioElement.setAttribute('src', filePath);
    audioElements.push(audioElement);
  }
}

function playSoundByAudioElement(audioElement) {
  audioElement.currentTime = 0;
  audioElement.play();
}

function playSound(name) {
  switch (name) {
    case buttonColors[0]:
      playSoundByAudioElement(audioElements[0]);
      break;
    case buttonColors[1]:
      playSoundByAudioElement(audioElements[1]);
      break;
    case buttonColors[2]:
      playSoundByAudioElement(audioElements[2]);
      break;
    case buttonColors[3]:
      playSoundByAudioElement(audioElements[3]);
      break;
    case "wrong":
      playSoundByAudioElement(audioElements[4]);
      break;
    case "start":
      playSoundByAudioElement(audioElements[5]);
      break;
    default:
      break;
  }
}

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = getRandomInt(3);
    nextTargetButton = setNextTargetButton(randomNumber);
    showNextTargetButton(nextTargetButton);
    playSound(buttonColors[randomNumber]);
    level++;
    updateHeader(level);
}

function updateHeader(level) {
  var levelText = "Level " + level
  console.log("updateHeader: " + levelText);
  $("#level-title").text(levelText);
}

function getRandomInt(max) {
  var randomNumber = Math.floor(Math.random() * (max + 1));
  // console.log("Random Int: " + randomNumber);
  return randomNumber;
}

function sayHello() {
  console.log("Hello");
}

function showNextTargetButton(nextTargetButton) {
  // console.log("nextTargetButton color: " + nextTargetButton.css("background-color"));
  animate(nextTargetButton);
}

function setNextTargetButton(randomNumber) {
  var randomlyChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomlyChosenColor);
  return $("#" + randomlyChosenColor);
}

function animate(button) {
  console.log("Animating...");
  $(button).animate( {
    opacity: .1
  }, 150);
  $(button).animate( {
    opacity: 1
  }, 150);
}

function animatePress(color) {
  var buttonId = "#" + color;
  $(buttonId).addClass("pressed");
  clickable = false;
  setTimeout(function() {
      $(buttonId).removeClass("pressed");
      clickable = true;
  }, 100);
  setTimeout(function() {
      // checkAnswer(color);
      checkLastAnswer(color);
  }, 150);
}

function handleClick(color) {
  if (gameStarted) {
    if (!isGameOver && clickable) {
      userClickedPattern.push(color);
      playSound(color);
      animatePress(color);
    }
  } else {
    startGame();
  }
}

function checkLastAnswer(color) {
  var answerNumber = userClickedPattern.length - 1;
  var lastAnswer = userClickedPattern[answerNumber];
  var lastQuestion = gamePattern[answerNumber];
  if (lastAnswer != lastQuestion) {
    gameOver();
  } else if (userClickedPattern.length == gamePattern.length) {
    clickable = false;
    setTimeout(function() {
      nextSequence();
      clickable = true;
    }, 1000);
  }
}

/*
function checkAnswer(color) {

  if (userClickedPattern.length == gamePattern.length) {
    // debugger;

    console.log("---");
    console.log("userClickedPattern: " + userClickedPattern);
    console.log("gamePattern: " + gamePattern);

    for (var i = 0; i < gamePattern.length; i++) {
      var question = gamePattern[i];
      var answer = userClickedPattern[i];

      console.log(i + ". question: " + question);
      console.log(i + ". answer: " + answer);

      if (answer != question) {
        gameOver();
        break;
      }

    }

    if (!isGameOver) {
      clickable = false;
      setTimeout(function() {
        nextSequence();
        clickable = true;
      }, 1000);
    }

  }
}
*/

function gameOver() {
  console.log("GAME OVER");
  playSound("wrong");
  var gameOverText = "Game Over at Level " + level;
  $("#level-title").text(gameOverText);
  $("#level-title").addClass("game-over");
  isGameOver = true;
  gameStarted = false;
}

function addClickEventListener() {
  // Adds click event listener to all buttons
  $(".btn").on("click", function() {
    var userChosenColor = $(this).attr("id");
    console.log(userChosenColor + " is clicked.");
    handleClick(userChosenColor);
  });
}

$(document).ready(function() {
  /*
  // https://stackoverflow.com/a/8489802/3780985

  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', 'http://www.soundjay.com/misc/sounds/bell-ringing-01.mp3');

  audioElement.addEventListener('ended', function() {
    this.play();
  }, false);

  audioElement.addEventListener("canplay",function(){
    $("#length").text("Duration:" + audioElement.duration + " seconds");
    $("#source").text("Source:" + audioElement.src);
    $("#status").text("Status: Ready to play").css("color","green");
  });

  audioElement.addEventListener("timeupdate",function(){
    $("#currentTime").text("Current second:" + audioElement.currentTime);
  });

  $('#play').click(function() {
    audioElement.play();
    $("#status").text("Status: Playing");
  });

  $('#pause').click(function() {
    audioElement.pause();
    $("#status").text("Status: Paused");
  });

  $('#restart').click(function() {
    audioElement.currentTime = 0;
  });
  */
});
