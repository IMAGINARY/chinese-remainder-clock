
function AppQ2(parentId){
  var handsCRC =
          [	{N:3, img:"./art/cigarette/HandHour-L.svg", id: "Hour3", type:"hand3"} ,
            {N:4, img:"./art/cigarette/HandHour-H.svg", id: "Hour4", type:"hand4"} ,
            {N:3, img:"./art/cigarette/HandMinute-L.svg", id: "Minute3", type:"hand3"} ,
            {N:4, img:"./art/cigarette/HandMinute-M.svg", id: "Minute4", type:"hand4"} ,
            {N:5, img:"./art/cigarette/HandMinute-H.svg", id: "Minute5", type:"hand5"} ,
          ];

  var handsUsual =
          [	{N:12, img:"./art/cigarette/HandHour-L.svg", id: "Hour3", type:"handBlack"} ,
            {N:60, img:"./art/cigarette/HandMinute-L.svg", id: "Minute3", type:"handBlack"} ,
          ];

  var templateCRC = [   {N:3, type: "hand3", padSymbol: '!'}, ' ',
                        {N:4, type: "hand4", padSymbol: '!'}, ':',
                        {N:3, type: "hand3", padSymbol: '!'}, ' ',
                        {N:4, type: "hand4", padSymbol: '!'}, ' ',
                        {N:5, type: "hand5", padSymbol: '!'}
                    ];

  var parent = d3.select(parentId);

  var container1 = parent.append("span").attr("class","subImageQuiz").attr("id","CRC2");
  parent.append("span").style("min-width","3em").style("display","inline-block");
  var container2 = parent.append("span").attr("class","subImageQuiz").attr("id","Usual2");
  parent.append("br");

  var checkButton = parent.append("button").text("Check");
  checkButton.on("click",checkAnswer);

  var result = parent.append("span").attr("class","testResult");


  var CRC = new MultiHandClock60( {radius:50, ticks: tickMarksBigClock(), hands: handsCRC } , "#CRC2", function(){});

  var digiCRC = new DigitalClockMulti(templateCRC,0,"#CRC2");

  var Usual = new MultiHandClock60( {radius:50, ticks: tickMarks60in12(), hands: handsUsual } , "#Usual2", function(){});

  var digital = new DigitalClockInputs([12,':',60],Usual,"#Usual2");


  var hour, minute;

  function getRandomHM(){
    hour = Math.floor(Math.random()*12);
    minute = Math.floor(Math.random()*60);
    CRC.setPositions([hour,hour,minute,minute,minute]);
    digiCRC.setValues([hour,hour,minute,minute,minute]);

    //Solution
    console.log("(hour,minute) = (" + hour +','+ minute +')');

    result.text("");
  }

  function checkAnswer(){
    var inputHour = digital.values[0];
    var inputMinute = digital.values[1];
    if ((inputHour == hour) && (inputMinute == minute)) {
        result.text("Well done! Try a new one!")
        setTimeout(()=>{getRandomHM();}, 1500);
      }
    else {
      result.text("Wrong!")
      setTimeout(()=>{result.text("");}, 1500);
    }
  }

  getRandomHM();

}
