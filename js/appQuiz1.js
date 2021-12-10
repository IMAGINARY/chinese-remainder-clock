// to use:    https://codepen.io/komarovdesign/pen/PPRbgb

function AppTest(parentId){
var template = [  {N:4, type: "hand3", padSymbol: '!'},
                  ':',
                  {N:60, type: "hand4", padSymbol: '0'},
                  ':',
                  {N:60, type: "hand5", padSymbol: '!'},
                  ' ',
                  {N:60, type: "handBlack", padSymbol: '!'},
                ];

  var parent = d3.select(parentId);

  L= new DigitalClockMulti(template,0,parentId);
  L.setValues([1,5,10,5]);
}



function AppQ1(parentId){
  var handsCRC =
          [	{N:3, img:"./art/cigarette/HandHour-L.svg", id: "Hour3", type:"hand3"} ,
            {N:4, img:"./art/cigarette/HandHour-H.svg", id: "Hour4", type:"hand4"} ,
          ];

  var handsUsual =
          [	{N:12, img:"./art/cigarette/HandHour-L.svg", id: "Hour3", type:"handBlack"} ,
          ];

  var templateCRC = [   {N:3, type: "hand3", padSymbol: '!'}, ' ',
                        {N:4, type: "hand4", padSymbol: '!'},
                    ];

  var parent = d3.select(parentId);

  var container1 = parent.append("span").attr("class","subImageQuiz").attr("id","CRC");
  parent.append("span").style("min-width","3em").style("display","inline-block");
  var container2 = parent.append("span").attr("class","subImageQuiz").attr("id","Usual");
  parent.append("br");

  var checkButton = parent.append("button").text("Check");
  checkButton.on("click",checkAnswer);

  var result = parent.append("span").attr("class","testResult");


  var CRC = new MultiHandClock60( {radius:50, ticks: tickMarksBigClock_H(), hands: handsCRC } , "#CRC", function(){});

  var digiCRC = new DigitalClockMulti(templateCRC,0,"#CRC");

  var Usual = new MultiHandClock60( {radius:50, ticks: tickMarks60in12(), hands: handsUsual } , "#Usual", function(){});

  var digital = new DigitalClockInputs([12],Usual,"#Usual");


  var hour, minute;

  function getRandomTime(){
    hour = Math.floor(Math.random()*12);
    CRC.setPositions([hour,hour]);
    digiCRC.setValues([hour,hour]);

    //Solution
    console.log("hour = " + hour );

    result.text("");
  }

  function checkAnswer(){
    var inputHour = digital.values[0];
    if (inputHour == hour) {
        result.text("Well done! Try a new one!")
        setTimeout(()=>{getRandomTime();}, 1500);
      }
    else {
      result.text("Wrong!")
      setTimeout(()=>{result.text("");}, 1500);
    }
  }

  getRandomTime();

}
