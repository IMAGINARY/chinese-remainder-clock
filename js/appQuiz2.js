// to use:    https://codepen.io/komarovdesign/pen/PPRbgb


function AppQ2(parentId){
  // Templates of clocks
  var handsCRC =
          [	{N:3, img:"./art/cigarette/HandHour-L.svg", id: "Hour3", type:"hand3"} ,
            {N:4, img:"./art/cigarette/HandHour-H.svg", id: "Hour4", type:"hand4"} ,
            {N:3, img:"./art/cigarette/HandMinute-L.svg", id: "Minute3", type:"hand3"} ,
            {N:4, img:"./art/cigarette/HandMinute-M.svg", id: "Minute4", type:"hand4"} ,
            {N:5, img:"./art/cigarette/HandMinute-H.svg", id: "Minute5", type:"hand5"} ,
          ];

  var handsUsual =
          [	{N:12, img:"./art/cigarette/HandHour-H.svg", id: "Hour3", type:"handBlack"} ,
            {N:60, img:"./art/cigarette/HandMinute-H.svg", id: "Minute3", type:"handBlack"} ,
          ];

  var templateCRC = [   {N:3, type: "hand3", padSymbol: '!'}, ' ',
                        {N:4, type: "hand4", padSymbol: '!'}, ':',
                        {N:3, type: "hand3", padSymbol: '!'}, ' ',
                        {N:4, type: "hand4", padSymbol: '!'}, ' ',
                        {N:5, type: "hand5", padSymbol: '!'}
                    ];

  var parent = d3.select(parentId);

  // Layout
  var container1 = parent.append("span").attr("class","subImageQuiz").attr("id","CRC2");
  parent.append("span").style("min-width","3em").style("display","inline-block");
  var container2 = parent.append("span").attr("class","subImageQuiz").attr("id","Usual2");
  parent.append("br");

  var result = parent.append("div").attr("class","testResult");

  var quizPanel = parent.append("div").attr("class","quizPanel");

  var livesPanel = quizPanel.append("span").attr("class","livesPanel");
  var checkButton = quizPanel.append("button").text("Check");
  var scorePanel = quizPanel.append("span").attr("class","scorePanel");

  livesPanel.append("span").attr("class","quizDisplay Tries");
  scorePanel.append("span").attr("class","quizDisplay Wins");
  scorePanel.append("span").attr("class","quizDisplay Losses");


  checkButton.on("click",checkAnswer);


  // Clocks setup
  var analogCRC = new MultiHandClock60( {radius:50, ticks: tickMarksBigClock(), hands: handsCRC } , "#CRC2", function(){});

  var digitalCRC = new DigitalClockMulti(templateCRC,0,"#CRC2");

  var analogUsual = new MultiHandClock60( {radius:50, ticks: tickMarks60in12(), hands: handsUsual } , "#Usual2", function(){});

  var digitalUsual = new DigitalClockInputs([12,':',60],analogUsual,"#Usual2");

  // Game functions
  var hour, minute;
  var lives = 3;
  var wins = 0;
  var losses = 0;

  function getRandomTime(){
    hour = Math.floor(Math.random()*12);
    minute = Math.floor(Math.random()*60);
    analogCRC.setPositions([hour,hour,minute,minute,minute]);
    digitalCRC.setValues([hour,hour,minute,minute,minute]);

    //Solution
    console.log("(hour,minute) = (" + hour +','+ minute +')');

    result.text("");
    lives = 3;
    analogUsual.setPositions([0,0]);
    digitalUsual.setValues([0,0]);
    drawLivesScore();
  }

  function checkAnswer(){
    checkButton.property("disabled",true);
    lives -= 1;
    var inputHour = digitalUsual.values[0];
    var inputMinute = digitalUsual.values[1];

    if ((inputHour == hour) && (inputMinute == minute)) {
        result.text("Well done! Try a new one!")
        wins += 1;
        setTimeout(()=>{
          getRandomTime();
          checkButton.property("disabled",false);
            }, 2000);
      }
    else if (lives==0){
      result.text("Sorry, the answer was " + hour +":"+ minute + ". Try a new one!");
      analogUsual.setPositions([hour,minute]);
      digitalUsual.setValues([hour,minute]);
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
