var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function (event) {
    if (started === false) {
        "alert('You pressed a key');"
        started = true;
        
        nextSecquence();
    }
    
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    console.log(userClickedPattern);

});


function nextSecquence(){
    var randomNumber = Math.floor(Math.random()*4);
    'console.log(randomNumber)'
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level " + level);
    console.log(gamePattern);
    userClickedPattern = []
}


function playSound(name){
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

 function animatePress(currentColour) {
    $('#' + currentColour).addClass("pressed");

    setTimeout(function(){
        $('#' + currentColour).removeClass("pressed");}, 100);
    }



function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSecquence()}, 1000);
                  
        }
    }

    else {
        $("h1").text("You Lose, press a key to try again.");
        var loseAudio = new Audio('sounds/wrong.mp3');
        loseAudio.play();
        gameOver()
        started = false;
        level = 0;
        gamePattern = [];
    }
}

function gameOver() {
    $('body').addClass("game-over");

    setTimeout(function(){
        $('body').removeClass("game-over");}, 200);
    }