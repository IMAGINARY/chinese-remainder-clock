
L = new MultiHandClock60( {N:60,radius:50, ticks: tickMarksBigClock(), hands: handsBigClock() } , "#Clock1", function(){});


function ticker(){
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  L.setPositions([hour,hour,minute,minute,minute,second,second,second]);
}

 ticking = setInterval(ticker,1000);
