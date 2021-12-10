
const mod = (x, n) => (x % n + n) % n;

async function loadArt(parent,url){
	const newsvg = await d3.svg(url);
	var svgNode = newsvg.getElementById("layer1");
	parent.node().appendChild(svgNode);
}


function sectorPath(theta, r, R){
	var s = Math.sin(theta*Math.PI/180);
	var c = Math.cos(theta*Math.PI/180);

	 //	//counterclockwise
	 // return "M"+ r +" 0 "
	 // 		+"L"+ R +" 0 "
	 // 		+"A"+ R +' '+ R +" 0 0 0 "+ R*c +' '+ -R*s
	 // 		+" L"+ r*c +' '+ -r*s
	 // 		+"A" + r +' '+ r +" 0 0 1 "+r +" 0";

	 // clockwise
	 return "M"+ r +" 0 "
	 		+"L"+ R +" 0 "
	 		+"A"+ R +' '+ R +" 0 0 1 "+ R*c +' '+ R*s
	 		+" L"+ r*c +' '+ r*s
	 		+"A" + r +' '+ r +" 0 0 0 "+r +" 0";
}

function circleText(text, radius, angle, parent){
  var cnv = document.createElement("canvas").getContext('2d');
  //cnv.font = '40px Palatino'
  var chars = text.split("");
  var origin =  angle - (cnv.measureText(text).width / radius * 180/Math.PI)/2;
  var pos = 0;
  chars.forEach((c) =>
        { var wid = cnv.measureText(c).width;
          var ang = wid/radius * 180/Math.PI;
          parent.append("text").text(c)
          .attr("text-anchor","middle")
          .attr("class","degRoles")
          .attr("transform", "rotate(" + (origin + pos + ang/2) +") translate(" + radius + ") rotate(90)");
          pos += ang;
        }
      )
}

function tickMarksBigClock(){
  var ticks = [];
  var i;
  // ticks.push({ angle: 0 , length: 2, offset: 0, label: undefined, type: "tick3" })
  // ticks.push({ angle: 0 , length: 2, offset: 2, label: undefined, type: "tick4" })
  // ticks.push({ angle: 0 , length: 2, offset: 4, label: undefined, type: "tick5" })
	ticks.push({ angle: 0 , length: 2, offset: 0, label: 0, type: "tick0" })
  for (i=1; i<3; i++)
    {ticks.push({ angle: i*360/3 , length: 2, offset: 0, label: i, type: "tick3" })}
  for (i=1; i<4; i++)
    {ticks.push({ angle: i*360/4 , length: 2, offset: 0, label: i, type: "tick4" })}
  for (i=1; i<5; i++)
    {ticks.push({ angle: i*360/5 , length: 2, offset: 0, label: i, type: "tick5" })}
  return ticks;
}

function tickMarks60by5(){
  var ticks = [];
  var i, label;
  for (i=0; i<60; i++) {
    label = (mod(i,5)==0) ? i : undefined;
    ticks.push({ angle: i*360/60 , length: 3, offset: 0, label: label, type: "tick0" })
    }
  return ticks;
}

function tickMarks60in12(){
  var ticks = [];
  var i, label;
  for (i=0; i<60; i++) {
    label = (mod(i,5)==0) ? i/5 : undefined;
    ticks.push({ angle: i*360/60 , length: 3, offset: 0, label: label, type: "tickBlack" })
    }
  return ticks;
}

function tickMarksN(N){
  var ticks = [];
  var i;
  for (i=0; i<N; i++) {
    ticks.push({ angle: i*360/N , length: 3, offset: 0, label: i, type: "tick0" })
    }
  return ticks;
}

function handsBigClock(){
  return [	{N:3, img:"./art/cigarette/HandHour-L.svg", id: "Hour3", type:"hand3"} ,
						{N:4, img:"./art/cigarette/HandHour-H.svg", id: "Hour4", type:"hand4"} ,
            {N:3, img:"./art/cigarette/HandMinute-L.svg", id: "Minute3", type:"hand3"} ,
            {N:4, img:"./art/cigarette/HandMinute-M.svg", id: "Minute4", type:"hand4"} ,
            {N:5, img:"./art/cigarette/HandMinute-H.svg", id: "Minute5", type:"hand5"} ,
						{N:3, img:"./art/cigarette/HandSecond.svg", id: "Second3", type:"hand3"} ,
            {N:4, img:"./art/cigarette/HandSecond.svg", id: "Second4", type:"hand4"} ,
            {N:5, img:"./art/cigarette/HandSecond.svg", id: "Second5", type:"hand5"} ,
          ];
}

function handsUsualClock(){
  return [	{N:12, img:"./art/cigarette/HandHour-L.svg", id: "Hour3", type:"hand3"} ,
            {N:60, img:"./art/cigarette/HandMinute-L.svg", id: "Minute3", type:"hand3"} ,
						{N:60, img:"./art/cigarette/HandSecond.svg", id: "Second3", type:"hand3"} ,
          ];
}


class Clock {
  constructor(params,parent,callback = function (){} ){
    this.N = parseInt(params.N);
    this.R = parseFloat(params.radius);
    this.position = 0;
    var R = this.R;
    var N = this.N;
    // var position = this.position;
    var This = this;
    var stepAngle = 360/N;

    this.svg = parent.append("svg")
									.attr("class","Clock")
                  .attr("height","100%")
									// .attr("viewBox","-55 -65 110 140");
									.attr("viewBox",
									" " + (-R-5) + " " + (-65) + " " + (2*R+10) +" " + (140) + " ");

// Border of the clock
    this.svg.append("circle").attr("class","border")
      .attr("r",R);

// Tick Marks
    var tickMarks = this.svg.append("g")
        .attr("id","tickMarks").attr("class","tickLine")
        .selectAll("g").data(params.ticks).enter().append("g");

    tickMarks.append("line")
        .attr("class",function(d){return d.type})
        .attr("x1",0)
        .attr("y1",function(d){return -(R - d.length - d.offset) })
        .attr("x2",0)
        .attr("y2",function(d){return -(R - d.offset) })

    tickMarks.append("text").attr("class","tickLabels")
        .text(function(d){return d.label})
        .attr("text-anchor","middle")
        .attr("alignment-baseline","middle")
        .attr("transform",function(d,i,nodes){
            return "translate(0 " + (-R+7) +
                   "),rotate(" + ( - d.angle) + ")"})

    tickMarks.attr("transform",function(d,i,nodes){
        return "rotate("+  d.angle +")" });

// Clock Header
    var clkHeader = this.svg.append("g").attr("class","clkHeader");

    clkHeader.append("path").attr("d",sectorPath(40,R,R+12)).attr("transform","rotate(-110)");

    clkHeader.append("text")
              .attr("class","tickLabels")
              .attr("text-anchor","middle")
              .text(N)
              .attr("transform","translate(0 "+ (-R -4) + ")");

// Clock Footer

var clkFooter = this.svg.append("g").attr("class","clkFooter");

var footerCharsLength = String(N-1).length;

clkFooter.append("rect")
		.attr("x",-footerCharsLength*6-2)
		.attr("width",footerCharsLength*12 + 4)
		.attr("height",18)
		.attr("transform","translate(0 "+ (R +4) + ")");

this.displaybg = clkFooter.append("text")
					.attr("class","footerLabelsBg")
					.attr("text-anchor","middle")
					.attr("transform","translate(0 "+ (R + 18) + ")")
					.text("8".repeat(footerCharsLength));

this.display = clkFooter.append("text")
					.attr("class","footerLabels")
					.attr("text-anchor","middle")
					.attr("transform","translate(0 "+ (R + 18) + ")")
					// .text(this.position);

 this.setDigital();


// Hand
    this.handPlate = this.svg.append("g");

    this.handPlate.append("circle")
      .attr("r",R).attr("opacity",0);

    // this.handPlate.append("line").attr("class","hand")
    //     .attr("x1",0).attr("y1",5)
    //     .attr("x2",0).attr("y2",-(R-20));

    async function loadHand(url){
      const newsvg = await d3.svg(url);
      var svgNode = newsvg.getElementById("layer1");
      This.handPlate.node().appendChild(svgNode);
      This.handPlate.select("#layer1").attr("transform","scale("+(R/55)+")")
    }

    loadHand("./art/hand2.svg");

    var drag = d3.drag()
    				.on("start", dragstarted)
    				.on("drag", dragged)
    				.on("end", dragended);

    var init_position, init_pointer_angle, pointer_angle, delta_pointer_angle, current_wheel_angle;

    function dragstarted(event){
    		init_position = This.position;
    		init_pointer_angle = Math.atan2(event.y, event.x)* 180/Math.PI;
    }

    function dragged(event){
    		pointer_angle = Math.atan2(event.y, event.x)* 180/Math.PI;
        delta_pointer_angle = pointer_angle - init_pointer_angle;
        // current_wheel_angle = init_wheel_angle + delta_pointer_angle;

        var new_position = mod(
            init_position + Math.round(delta_pointer_angle/stepAngle)
            ,N);

        if (new_position != This.position) {
          This.position = new_position;
          This.handPlate.transition().duration(100)
            .attr("transform","rotate("+ (This.position * stepAngle) +')');
          This.setDigital();
          callback();
          }
    }

    function dragended(event){
       return 0;
    }
    this.handPlate.call(drag);
  }

  // Methods
  setPosition(x){
    this.position = mod(x,this.N);

    this.handPlate.transition().duration(100).
      attr("transform","rotate("+ (this.position * 360/this.N) +')');
    // this.display.text(this.position);
		this.setDigital();
  }

	setDigital(){
    var This = this;
    This.display.text(String(This.position).padStart(String(This.N-1).length , "!"));
  }

}



//params
// {ticks, hands =[], }

class MultiHandClock60 {
  constructor(params,parentId,callback = function (){} ){
		this.mods = [];
		params.hands.forEach((item, i) => { this.mods[i] = item.N });
		// [3,4,3,4,5,3,4,5]

    this.R = 65;
    this.positions = new Array(this.mods.length).fill(0);

    var R = this.R;
    var This = this;

    this.svg = d3.select(parentId).append("svg")
                  .attr("width","100%")
                  .attr("viewBox","-70 -70 140 160");

//Linear Gradient for "rainbow fill"
		var gradient = this.svg.append("defs")
				.append("linearGradient")
					.attr("id","rainbowGradient")
					.attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",1);

		gradient.append("stop")
					.attr("offset",0.3).attr("stop-color","rgb(0,200,0)");
		gradient.append("stop")
					.attr("offset",0.31).attr("stop-color","rgb(200,0,0)");
		gradient.append("stop")
					.attr("offset",0.6).attr("stop-color","rgb(200,0,0)");
		gradient.append("stop")
					.attr("offset",0.61).attr("stop-color","rgb(0,0,200)");


// Backplate of the clock
		// var bp = this.svg.append("g");
		// loadArt(bp,"./art/backplate.svg")
    this.svg.append("circle").attr("class","backplate")
      .attr("r",R);

// Tick Marks
    var i;

    var tickMarks = this.svg.append("g")
        .attr("id","tickMarks").attr("class","tickLine")
        .selectAll("g").data(params.ticks).enter().append("g");

    // tickMarks.append("line")
    //     .attr("class",function(d){return d.type})
    //     .attr("x1",0)
    //     .attr("y1",function(d){return -(R - d.length - d.offset) })
    //     .attr("x2",0.001) //this is to avoid degenerate bbox for linearGradient.
    //     .attr("y2",function(d){return -(R - d.offset) })

    tickMarks.append("text")
				.attr("class",function(d){return "tickLabelsBigClock "+ d.type})
        .text(function(d){return d.label})
        .attr("text-anchor","middle")
        .attr("alignment-baseline","middle")
        .attr("transform",function(d,i,nodes){
            return "translate(0 " + (-R+6.5) +
                   "),rotate(" + ( - d.angle) + ")"})

    tickMarks.attr("transform",function(d,i,nodes){
        return "rotate("+  d.angle +")" });

// Border of the clock
    this.svg.append("circle").attr("class","border")
      .attr("r",R);

// Clock Header
    // var clkHeader = this.svg.append("g").attr("class","clkHeader");
		//
    // clkHeader.append("path").attr("d",sectorPath(70,R,R+12)).attr("transform","rotate(-125)");
		//
    // var clkHeaderText = clkHeader.append("g").attr("class","tickLabels");
    // // clkHeader.append("text")
    // //           .attr("class","tickLabels")
    // //           .attr("text-anchor","middle")
    // //           .text(this.mods)
    // //           .attr("transform","translate(0 "+ (-R -4) + ")");
		//
    // // var text =  this.mods.slice(0,2).toString() + ' : ' +
    // //             this.mods.slice(2,5).toString() + ' : ' +
    // //             this.mods.slice(5,8).toString();
		// var text = "(3,4,5)	- Clock"
    // circleText(text, (R+4), -90, clkHeaderText);

// Clock Footer
    var clkFooter = this.svg.append("g").attr("class","clkFooter");
		var footerCharsLength = this.mods.reduce((a,b)=> a + String(b-1).length ,0 );
		// console.log("footerCharsLength",footerCharsLength);

		clkFooter.append("rect")
				.attr("x",-footerCharsLength*6-2)
				.attr("width",footerCharsLength*12 + 4)
				.attr("height",18)
				.attr("transform","translate(0 "+ (R +4) + ")");

		this.displaybg = clkFooter.append("text")
							.attr("class","footerLabelsBg")
							.attr("text-anchor","middle")
							.attr("transform","translate(0 "+ (R + 18) + ")")
							// .text("8".repeat(footerCharsLength));
							.text("8 8 : 8 8 8 : 8 8 8")

    this.display = clkFooter.append("text")
              .attr("class","footerLabels")
              .attr("text-anchor","middle")
              .attr("transform","translate(0 "+ (R + 18) + ")")
              // .text(this.positions);

    this.displayCell = [];
    this.displayCell[0] = this.display.append("tspan").attr("class","hand3");
    this.displayCell[1] = this.display.append("tspan").attr("class","hand4");
    this.display.append("tspan").text(": ");
    this.displayCell[2] = this.display.append("tspan").attr("class","hand3");
    this.displayCell[3] = this.display.append("tspan").attr("class","hand4");
    this.displayCell[4] = this.display.append("tspan").attr("class","hand5");
    this.display.append("tspan").text(": ");
    this.displayCell[5] = this.display.append("tspan").attr("class","hand3");
    this.displayCell[6] = this.display.append("tspan").attr("class","hand4");
    this.displayCell[7] = this.display.append("tspan").attr("class","hand5");

    this.setDigital();

// Hands

    this.handPlate = this.svg.append("g").attr("id","handPlate");


    // this.handPlate.append("circle")
    //   .attr("r",R).attr("opacity",0);

    // this.handPlate.append("line").attr("class","hand")
    //     .attr("x1",0).attr("y1",5)
    //     .attr("x2",0).attr("y2",-(R-20));


    params.hands.forEach((d, i) => {
      // if (i==5) {this.handPlate.append("circle").attr("r",4)};

      var h = this.handPlate.append("g")
                    .attr("id",d.id)
                    .attr("class","hand "+d.type);
      loadArt(h, d.img);
    });
    this.handPlate.append("circle").attr("r",2).attr("class","cap")
    // loadHand("./art/hand2.svg");


    // var drag = d3.drag()
    // 				.on("start", dragstarted)
    // 				.on("drag", dragged)
    // 				.on("end", dragended);
    //
    // var init_position, init_pointer_angle, pointer_angle, delta_pointer_angle, current_wheel_angle;
    //
    // function dragstarted(event){
    // 		init_position = This.position;
    // 		init_pointer_angle = Math.atan2(event.y, event.x)* 180/Math.PI;
    // }
    //
    // function dragged(event){
    // 		pointer_angle = Math.atan2(event.y, event.x)* 180/Math.PI;
    //     delta_pointer_angle = pointer_angle - init_pointer_angle;
    //     // current_wheel_angle = init_wheel_angle + delta_pointer_angle;
    //
    //     var new_position = mod(
    //         init_position + Math.round(delta_pointer_angle/stepAngle)
    //         ,N);
    //
    //     if (new_position != This.position) {
    //       This.position = new_position;
    //       This.handPlate.transition().duration(100)
    //         .attr("transform","rotate("+ (This.position * stepAngle) +')');
    //       This.display.text(This.position);
    //       callback();
    //       }
    // }
    //
    // function dragended(event){
    //    return 0;
    // }
    // this.handPlate.call(drag);
  }

  // Methods
  setPositions(v){
    var This = this;
    this.positions = v.map( (x,i)=> mod(x,this.mods[i]) )
    this.handPlate.selectAll(".hand").data(this.positions)
          .transition().duration(500)
          .attr("transform", function(d,i){
            return "rotate("+ (This.positions[i] * 360/This.mods[i]) +')'
          });
    this.setDigital();
  }

  setDigital(){
    var This = this;
    this.positions.forEach(function(item, i) {This.displayCell[i].text(item + ' ')});
  }

}
