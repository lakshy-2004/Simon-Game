var buttonColours = ["red" ,"blue" , "green" , "yellow"];

var gamePattern =[];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function(event){

    if(!started){
        $("#level-title").text("Level "+ level);    
        nextSequence();
        started = true;
    }else if(event.key > 0 && event.key < 5){
        var userChosennumber = event.key;
        // console.log(userChosennumber);
        var userChosenColour;
        if(userChosennumber==1){
            userChosenColour="green";
        }else if(userChosennumber==2){
            userChosenColour="red";
        }else if(userChosennumber==3){
            userChosenColour="yellow";
        }else if(userChosennumber==4){
            userChosenColour="blue";
        }

        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);
        animatePress(userChosenColour);

        checkAnswer(userClickedPattern.length-1);

    }

});



$(".btn").click(function(){
    
    var userChosenColour = $(this).attr("id");
    // console.log(userChosenColour);

    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        // console.log("success"); 

        if(userClickedPattern.length==gamePattern.length){

            setTimeout(function(){
                nextSequence();
            }, 1000);

        }

    }else {
        // console.log("wrong");
        // alert("this is wrong");
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }

}


function nextSequence(){

    userClickedPattern= [];
    level++;

    $("#level-title").text("Level "+ level);

    var randomNumber = Math.floor(Math.random() * 4);
    // randomNumber = Math.floor(randomNumber);
    // console.log(randomNumber);
    
    var randomChosenColour = buttonColours[randomNumber];
    // console.log(randomChosenColour);

    gamePattern.push(randomChosenColour);

    // showing next step and adding sounds

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
   
}


function playSound(name){

    var newaudio = new Audio("./sounds/"+name+".mp3");
    newaudio.play();

}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}

function startOver(){

    level = 0;
    gamePattern=[];
    started=false;

}


