


function App1(parentId){
  var parent = d3.select(parentId);

  var container1 = parent.append("span").attr("class","subImage");
  var container2 = parent.append("span").attr("class","subImage");
  var container3 = parent.append("span").attr("class","subImage");

  // <span id="Clock1" class="subImage"></span>
  // <span id="Clock2" class="subImage"></span>
  // <span id="Clock3" class="subImage"></span>
  //

  var c = 12;
  var a = 3;
  var b = 4;

  var [g,m,n] = xgcd(a,b);
  //console.log("gcd: ",g);

  var C = new Clock( {N:c, radius:50, ticks:tickMarksN(c)} , container1, updateSmalls);
  var A = new Clock( {N:a, radius:35, ticks:tickMarksN(a)} , container2, updateBig );
  var B = new Clock( {N:b, radius:35, ticks:tickMarksN(b)} , container3, updateBig );


  function updateSmalls(){
    var x = C.position;
    A.setPosition(x);
    B.setPosition(x);
  }

  function updateBig(){
    var x = A.position;
    var y = B.position;
    C.setPosition( a*m*y + b*n*x );
  }

  var i=0;
  function ticker(){
    C.setPosition(i);
    updateSmalls();
    i++;
  }

  //setInterval(ticker,1000);
}
