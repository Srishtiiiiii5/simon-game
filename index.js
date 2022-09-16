var userClickedPattern=[];
var gamePattern= [];
var buttonColours= [ "green", "red",  "yellow",  "blue"];

var started= false;

var level=0;

$(document).keypress( function(){
    if(!started){
        nextSequence();
        started=true;
        
        
    }
});


function nextSequence(){
    userClickedPattern = [];
    level++;

    $("#title").text("level"+ level);
    var randomNumber= Math.floor( Math.random() *4 );
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" +randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}
function playSound(randomChosenColour){
    var audio= new Audio(randomChosenColour+".mp3");
    audio.play();
}


$(".btn").click(function(){
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);


        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);



});



function animatePress(currentColour){
    var activeButton= document.querySelector("#" + currentColour );

    activeButton.classList.add("pressed");

    setTimeout(function(){
        activeButton.classList.remove("pressed");
    }, 100);
}


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
    }
    else{
        $("body").addClass("game-over");

        $("#title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      
      startOver();

    }


}

function startOver(){
    level=0;
    started=false;
    gamePattern=[];
}