var buttonColours = ["red", "blue", "green", "yellow"]; //Stores all the colors that are in the game
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


//Creating an on-click listener for each button
$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");   //Fetches the id of the clicked color
  userClickedPattern.push(userChosenColor);   //Add the choosen color at last of userClickedPattern array

  var audioFileName = "sounds/"+userChosenColor+".mp3"; //Fetches audio file to be played
  playSound(audioFileName); //Plays an audio corresponding to userChosenColor
  animatePress(userChosenColor); //Applies an effect to the clicked button

  checkAnswer(userClickedPattern.length - 1);
});

//Creating an event listener for keep presses
$(document).on("keydown", function(){
  if(!started)
  {
    nextSequence();
    started = true;
  }
});

function nextSequence()
{
  level++; //Incrasing the value of level everytime this function is called
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4); //Generates a random number between 0 & 3
  var randomChosenColour = buttonColours[randomNumber]; //Using the generated random number, we are choosing a color from buttonColours array
  gamePattern.push(randomChosenColour); //Pushing the randomly generated color in the randomChosenColour array

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); //Provides a fadeIn fadeOut effect on the randomChosenColour button

  var audioFileName = "sounds/"+randomChosenColour+".mp3"; //Fetches audio file to be played
  playSound(audioFileName); //Plays an audio corresponding to randomChosenColor

  userClickedPattern = [];
  currentIndex = 0;
}

//Function to play an audio file corresponding to the name
function playSound(name)
{
  var audio = new Audio(name);
  audio.play();

}

//Function to animate the button when its pressed
function animatePress(currenColor)
{
  $("#"+currenColor).addClass("pressed");

  //This function will run the code afer a time delay
  setTimeout(function (){
    $("#"+currenColor).removeClass("pressed");
  }, 100);
}

//Function to check the answer
function checkAnswer(currentLevel)
{
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
  {
    if(userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else
  {
    playSound("sounds/wrong.mp3");
    $("body").addClass("game-over");
    setTimeout(function (){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver()
{
  level = 0;
  gamePattern = [];
  started = false;
}
