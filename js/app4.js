


function App4(parentId){
  var parent = d3.select(parentId);

  var container1 = parent.append("span").attr("class","subImage");
  parent.append("span").style("width","2em").style("display","inline-block");
  var container2 = parent.append("span").attr("class","subImage");
  var container3 = parent.append("span").attr("class","subImage");

  var containerCorresp = parent.append("div").attr("class","correspondence");

  var resetButton = parent.append("button").text("↻")
      .on("click",()=>{corresps.clear(); containerCorresp.node().innerHTML = "";});

  const corresps = new Set();

  var c = 12;
  var a = 2;
  var b = 6;

  var [g,m,n] = xgcd(a,b);

  var ap = a/g;
  var bp = b/g;

  var C = new Clock( {N:c, radius:50, ticks:tickMarksN(c)} , container1, updateSmalls);
  var A = new Clock( {N:a, radius:35, ticks:tickMarksN(a)} , container2, updateBig );
  var B = new Clock( {N:b, radius:35, ticks:tickMarksN(b)} , container3, updateBig );

  var txt;

  function updateSmalls(){
    var x = C.position;
    A.setPosition(x);
    B.setPosition(x);

    txt = C.position + "  ⟶  (" + A.position + " , " + B.position + ")"
    corresps.add(txt);

    printCorresps();
  }

  function updateBig(){
    var x = A.position;
    var y = B.position;

    if (mod(y-x,g) !=0) {
      C.setPosition(null);
      txt = " ❌  ⟶  (" + x + " , " + y + ")"
    } else {
      var w = ap*m*y + bp*n*x;
      C.setPosition(w);
      txt =String(w);
      for (var i=1; i<g; i++) {txt+= ( "  &  " + (w+i*c/g) )}
      txt += " ⟶  (" + x + " , " + y + ")"
    }
    corresps.add(txt);

    // C.setPosition( a*m*y + b*n*x );
    printCorresps();
  }

  var i=0;
  function ticker(){
    C.setPosition(i);
    updateSmalls();
    i++;
  }

//⟷ ⟵ ⟶
  function printCorresps(){
    containerCorresp.node().innerHTML = "";
    for (let item of corresps) {
      containerCorresp.node().innerHTML += (item + "<br>");
    }
  }




  //setInterval(ticker,1000);


}
