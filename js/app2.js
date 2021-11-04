

function App2(parentId){
  var parent = d3.select(parentId);

  var container1 = parent.append("span").attr("class","subImage");
  var container2 = parent.append("span").attr("class","subImage");
  var container3 = parent.append("span").attr("class","subImage");
  var container4 = parent.append("span").attr("class","subImage");

  var l = 60;
  var a = 3;
  var b = 4;
  var c = 5;

  // [g,m,n,o] = xgcd3(a,b,c);
  //console.log("gcd: ",g);

  var L = new Clock( {N:l, radius:50, ticks:tickMarks60by5()} , container1, updateSmalls);
  var A = new Clock( {N:a, radius:35, ticks:tickMarksN(a)} , container2, updateBig );
  var B = new Clock( {N:b, radius:35, ticks:tickMarksN(b)} , container3, updateBig );
  var C = new Clock( {N:c, radius:35, ticks:tickMarksN(c)} , container4, updateBig );


  function updateSmalls(){
    var x = L.position;
    A.setPosition(x);
    B.setPosition(x);
    C.setPosition(x);
  }

  function updateBig(){
    var x = A.position;
    var y = B.position;
    var z = C.position;

    // modular inverses
    var bc_inv_a = xgcd(b*c,a)[1]
    var ac_inv_b = xgcd(a*c,b)[1]
    var ab_inv_c = xgcd(a*b,c)[1]

    var w = x * b * c * bc_inv_a + y * a * c * ac_inv_b + z * a * b * ab_inv_c;
    // console.log(b * c * bc_inv_a , a * c * ac_inv_b , a * b * ab_inv_c);
    // console.log(bc_inv_a , ac_inv_b , ab_inv_c);

    L.setPosition(w);
  }

  var i=0;
  function ticker(){
    L.setPosition(i);
    updateSmalls();
    i++;
  }

  // setInterval(ticker,1000);
}
