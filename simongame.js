var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = []; //to store the button clicked by user
var started = false; // need a way to know wether the game started a not so that to invoke func nextSeq
var level = 0;

$(document).keypress(function(){ // NO NOT TYPO ON THE EVENT CALLING
    if(!started){
        $("#level-title").text("Level " + level);
        nextSeq();
        started = true;
    }
});

//user click and choose the colour of the button 
$(".btn").click(function(){
    //$(this).attr("id") = target this var,s attributes (which is the id) when click function is triggered.
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    //console.log(userClickedPattern);
    playSound(userChosenColor);//catch the sound name of the user chosen color
    animatePress(userChosenColor);
    checkAns(userClickedPattern.length-1);
});

function checkAns(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){ // compare the game pattern with user clicked pattern
        console.log("Success");
        if(gamePattern.length === userClickedPattern.length){ // if correct then call for the next sequence and go along in 1000 ms
            setTimeout(function(){
                nextSeq();
            },1000);
        }
    }else{
        playSound("wrong");//use this as the function has been called at below.
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over").append("<br />" + "Press Any Key to Restart");//use this incase want to breakline in jQuery
            startOver();//start over function being called if the user click the wrong button
    }
}

function nextSeq(){
    userClickedPattern = []; //to reset the array and ready for next level
    
    level++;//to increase the level
    $("#level-title").text("Level " + level);//incoprate the level value from above the line
    var randNum = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randNum];
    gamePattern.push(randomChosenColor);
    //flash animated to the button 
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    //add audio to the button when flash
    playSound(randomChosenColor);  //catch the sound name of the random color chosen
    
}

function startOver(){
//reset all the value needed to track down the game progress including the current level, click progress and started variables.
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3"); // to catch the name of the color passed from nextSeq and click, which is same as mp3 name
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");//("#" + item) where item = element selected by user 
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);// 100 is representative of 100 miliseconds
}


