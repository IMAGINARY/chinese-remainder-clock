// to use:    https://codepen.io/komarovdesign/pen/PPRbgb

// function AppTest(parentId){
// var template = [  {N:4, type: "hand3", padSymbol: '!'},
//                   ':',
//                   {N:60, type: "hand4", padSymbol: '0'},
//                   ':',
//                   {N:60, type: "hand5", padSymbol: '!'},
//                   ' ',
//                   {N:60, type: "handBlack", padSymbol: '!'},
//                 ];
//
//   var parent = d3.select(parentId);
//
//   L= new DigitalClockMulti(template,0,parentId);
//   L.setValues([1,5,10,5]);
// }

function AppQ1(parentId){
  // Templates of clocks
  var handsCRC =
          [	{N:3, img:"./art/cigarette/HandHour-L.svg", id: "Hour3", type:"hand3"} ,
            {N:4, img:"./art/cigarette/HandHour-H.svg", id: "Hour4", type:"hand4"} ,
          ];

  var handsUsual =
          [	{N:12, img:"./art/cigarette/HandHour-H.svg", id: "Hour3", type:"handBlack"} ,
          ];

  var templateCRC = [   {N:3, type: "hand3", padSymbol: '!'}, ' ',
                        {N:4, type: "hand4", padSymbol: '!'},
                    ];

  var parent = d3.select(parentId);

  // Layout
  var container1 = parent.append("span").attr("class","subImageQuiz").attr("id","CRC");
  parent.append("span").style("min-width","3em").style("display","inline-block");
  var container2 = parent.append("span").attr("class","subImageQuiz").attr("id","Usual");
  parent.append("br");

  var quizPanel = parent.append("div").attr("class","quizPanel");

  var livesPanel = quizPanel.append("span").attr("class","livesPanel");
  var checkButton = quizPanel.append("button").text("Check");
  var scorePanel = quizPanel.append("span").attr("class","scorePanel");

  livesPanel.append("span").attr("class","quizDisplay Tries");
  scorePanel.append("span").attr("class","quizDisplay Wins");
  scorePanel.append("span").attr("class","quizDisplay Losses");


  checkButton.on("click",checkAnswer);

  var result = parent.append("div").attr("class","testResult");

  // Clocks setup
  var analogCRC = new MultiHandClock60( {radius:50, ticks: tickMarksBigClock_H(), hands: handsCRC } , "#CRC", function(){});

  var digitalCRC = new DigitalClockMulti(templateCRC,0,"#CRC");

  var analogUsual = new MultiHandClock60( {radius:50, ticks: tickMarks60in12(), hands: handsUsual } , "#Usual", function(){});

  var digitalUsual = new DigitalClockInputs([12],analogUsual,"#Usual");

  // Game functions
  var hour;
  var lives = 3;
  var wins = 0;
  var losses = 0;

  function getRandomTime(){
    hour = Math.floor(Math.random()*12);
    analogCRC.setPositions([hour,hour]);
    digitalCRC.setValues([hour,hour]);

    //Solution
    console.log("hour = " + hour );

    result.text("");
    lives = 3;
    analogUsual.setPositions([0]);
    digitalUsual.setValues([0]);
    drawLivesScore();
  }

  function checkAnswer(){
    checkButton.property("disabled",true);
    lives -= 1;
    var inputHour = digitalUsual.values[0];

    if (inputHour == hour) {
        result.text("Well done! Try a new one!")
        wins += 1;
        setTimeout(()=>{
          getRandomTime();
          checkButton.property("disabled",false);
            }, 2000);
      }
    else if (lives==0){
      result.text("Sorry, the answer was " + hour + ". Try a new one!");
      analogUsual.setPositions([hour]);
      digitalUsual.setValues([hour]);
      losses += 1;
      setTimeout(()=>{
          getRandomTime();
          checkButton.property("disabled",false);
            }, 4000);
    }
    else {
      if(lives==1){result.text("Wrong! You still have 1 try.")}
      else{result.text("Wrong! You still have " + lives + " tries.")}
      setTimeout(()=>{
          result.text("");
          checkButton.property("disabled",false);
            }, 2000);

    }
    console.log("lives,wins,losses = ",lives,wins,losses)
    drawLivesScore();
  }

  function drawLivesScore(){
    livesPanel.select(".Tries").text("Tries: " + lives);
    scorePanel.select(".Wins").text("Wins: " + wins);
    scorePanel.select(".Losses").text("Fails: " + losses);
  }

  getRandomTime();

}
