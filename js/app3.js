


function App3(parentId){
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
  var a = 3;
  var b = 4;

  var [g,m,n] = xgcd(a,b);

  var C = new Clock( {N:c, radius:50, ticks:tickMarksN(c)} , container1, updateSmalls);
  var A = new Clock( {N:a, radius:35, ticks:tickMarksN(a)} , container2, updateBig );
  var B = new Clock( {N:b, radius:35, ticks:tickMarksN(b)} , container3, updateBig );

  function updateSmalls(){
    var x = C.position;
    A.setPosition(x);
    B.setPosition(x);
    printMapto();
  }

  function updateBig(){
    var x = A.position;
    var y = B.position;
    C.setPosition( a*m*y + b*n*x );
    printMapto();
  }

  var i=0;
  function ticker(){
    C.setPosition(i);
    updateSmalls();
    i++;
  }

//⟷ ⟵ ⟶
  function printMapto(){
    var txt = C.position + "  ⟷  (" + A.position + " , " + B.position + ")"
    //console.log(txt);
    corresps.add(txt);

    containerCorresp.node().innerHTML = "";
    for (let item of corresps) {
      containerCorresp.node().innerHTML += (item + "<br>");
    }
  }

  printMapto();
  //setInterval(ticker,1000);


}
