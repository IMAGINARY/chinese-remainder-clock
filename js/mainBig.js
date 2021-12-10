var templateCRC =
        [ {N:3, type: "hand3", padSymbol: '!'}, ' ',
          {N:4, type: "hand4", padSymbol: '!'}, ':',
          {N:3, type: "hand3", padSymbol: '!'}, ' ',
          {N:4, type: "hand4", padSymbol: '!'}, ' ',
          {N:5, type: "hand5", padSymbol: '!'}, ':',
          {N:3, type: "hand3", padSymbol: '!'}, ' ',
          {N:4, type: "hand4", padSymbol: '!'}, ' ',
          {N:5, type: "hand5", padSymbol: '!'}
        ];

var handsCRC =
        [	{N:3, img:"./art/cigarette/HandHour-L.svg", id: "Hour3", type:"hand3"} ,
          {N:4, img:"./art/cigarette/HandHour-H.svg", id: "Hour4", type:"hand4"} ,
          {N:3, img:"./art/cigarette/HandMinute-L.svg", id: "Minute3", type:"hand3"} ,
          {N:4, img:"./art/cigarette/HandMinute-M.svg", id: "Minute4", type:"hand4"} ,
          {N:5, img:"./art/cigarette/HandMinute-H.svg", id: "Minute5", type:"hand5"} ,
          {N:3, img:"./art/cigarette/HandSecond.svg", id: "Second3", type:"hand3"} ,
          {N:4, img:"./art/cigarette/HandSecond.svg", id: "Second4", type:"hand4"} ,
          {N:5, img:"./art/cigarette/HandSecond.svg", id: "Second5", type:"hand5"} ,
        ];

L = new MultiHandClock60( {N:60,radius:50, ticks: tickMarksBigClock(), hands: handsCRC } , "#Clock1", function(){});

D = new DigitalClockMulti(templateCRC,0,"#Clock1");

// L = new MultiHandClock60( {radius:50, ticks: tickMarks60in12(), hands: handsUsualClock() } , "#Clock1", function(){});


function ticker(){
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  var v = [hour,hour,minute,minute,minute,second,second,second];
  L.setPositions(v);
  D.setValues(v)
  // L.setPositions([hour,minute,second]);
}

 ticking = setInterval(ticker,1000);
