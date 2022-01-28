var buttonColors = ["red","blue","green","yellow"];
var userClickedPattern = [];

var gamePattern = [];

var started = false;
var level = 0;

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})


$(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSoundClick(userChosenColor);
    animatePress(userChosenColor);
    var index = userClickedPattern.length - 1;
    checkAnswer(index);
})




function playSound(color){
        var blink = new Audio("sounds/" + color + ".mp3");
        blink.play();
}

function playSoundClick(name){
    var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
}


function nextSequence(){
    userClickedPattern.length = 0;
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){$("#"+currentColor).removeClass("pressed")},100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]=== gamePattern[currentLevel]){
        if(currentLevel === gamePattern.length - 1){
           setTimeout(function(){
                 nextSequence()
               }, 1000);
        }
    }else{
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },2000);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();    
    }
}

function startOver(){
    level = 0;
    started = false;
    gamePattern.length = 0;
}