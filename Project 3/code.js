Array.prototype.enorm = function () {
    return Math.sqrt(this.reduce(function(prev,cur) { return prev + cur*cur; },0));
}

dist = function(a,b){
    return (a.add(b.mult(-1))).enorm();
}

Array.prototype.add = function (b) {
    var s = Array(this.length);
    for (var ind = 0; ind < this.length; ind++)
    {
  if (typeof(b)=="number")
	{
	    s[ind] = this[ind]+ b;
	}
	else
	{
	    s[ind] = this[ind]+ b[ind];
	}
    }
    return s;
};

Array.prototype.mult = function (b) {
    var s = Array(this.length);
    for (var ind = 0; ind < this.length; ind++)
    {
	if (typeof(b)=="number")
	{
	    s[ind] = this[ind]* b;
	}
	else
	{
	    s[ind] = this[ind]* b[ind];
	}
    }
    return s;
};


Array.prototype.norm = function () {
    var s = 0;
    for (var ind = 0; ind < this.length; ind++)
    {
	s[ind] = this[ind] + b[ind];
    }
    return s;
};

Array.prototype.max = function () {
    return Math.max.apply(Math, this);
};

Array.prototype.min = function () {
    return Math.min.apply(Math, this);
};
Array.prototype.range = function () {
    return [this.min(), this.max()];
};
function project(a,b,r)
{
    var d = a.add(b.mult(-1));
    var rat=r/d.enorm();
    return b.add(d.mult(rat));
}

function recompute_positions(ind,X,D)
{
    var d = D[ind],Xc = Array(X.length),x = [X[ind].x,X[ind].y];
    for (i = 0; i < X.length; i++)
    {
	if (i != ind)
	{
	    var tmp = project([X[i].x,X[i].y],x,d[i]);
	    Xc[i] = {'x': tmp[0],'y': tmp[1]};
	}
	else
	{
	    Xc[ind] = X[ind];
	}
	
    }
    return Xc;
}





//Used to expand slightly the plotting window
expand = function(r)
{
    var d = r[1] - r[0],alpha=.1;
    return r.add([-alpha*d, alpha*d]);
}

d3scatterplot = function(svg,X,D,cities) {
    var nPix= 480,n=X.length,mar = [50,60,40,40];
	
    var xv = X.map(function(e) { return e.x;}),xRange=expand(xv.range());
    var yv = X.map(function(e) { return e.y;}),yRange=expand(yv.range());
    svg.attr("width", nPix+mar[0]+mar[2])
	.attr("height", nPix+mar[1]+mar[3]);   
	
	  
	


    var sg = svg.append("g")
	.attr("transform", "translate("
	      + mar[0] + ","
	      + mar[1] + ")");


    
        
    var xScale = d3.scale.linear()
	.range([0, nPix])
	.domain(xRange);
    
    var yScale = d3.scale.linear()
	.range([nPix, 0])
  	.domain(yRange);
    
    
    var labels = sg.selectAll(".labels")
	.data(X).enter()
	.append("text")
	.attr("class", "label")  
	.attr("x",function(d) {return xScale(d.x);})
	.attr("y",function(d) {return yScale(d.y);})
	.text(function(d,i) {return cities[i];})
	.attr("font-size",10)
	.attr("id",function(d,i) {return "label" + i});
    


    var dots = sg.selectAll(".datapoint")
	.data(X).enter()
	.append("circle")
	.attr("class", "datapoint")  
	.attr("cx",function(d) {return xScale(d.x);})
	.attr("cy",function(d) {return yScale(d.y);})
	.attr("id",function(d,i) {return "point" + i})
	.on("click", function(d){
		d3.select(this).attr("fill", "rgb(0,"+d+",0)")
	})
	
	.on("mouseover",function(d,i){
		d3.select(this).transition()
						.attr("fill", "orange");
	})
	.on("mouseout", function(d,i){
		d3.select(this).transition()
						.attr("fill", "black");
	});
    
  var ghosts = sg.selectAll(".ghost")
	.data(X).enter()
	.append("circle")
	.attr("class", "ghost")  
	.attr("cx",function(d) {return xScale(d.x);})
	.attr("cy",function(d) {return yScale(d.y);})
	.attr("r",3);
  
    
    

    var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(4);
    svg.append("g").call(xAxis)
	.attr("class", "axis")  //Assign "axis" class
	.attr("transform","translate(" + mar[0] + "," + (nPix+mar[1])  + ")");

    var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(4);
    svg.append("g").call(yAxis)
	.attr("class", "axis")  //Assign "axis" class
	.attr("transform","translate(" + mar[0] + "," + (mar[3])  + ")");

	
	// ghosts.on("mouseover", function(d,i){
		
	// 	d3.select(dots)
	// 	.attr("fill", "orange")
	// })
	

//     ghosts.on("mouseover",function(d,i)
// 	    {
			

			

// 		labels.data(Xn)
// 		    .transition()
// 			.style('fill', 'orange')
// 		    .attr("x",function(d) {return xScale(d.x);})
// 		    .attr("y",function(d) {return yScale(d.y);});

// 	    });

   
    

    
//     ghosts.on("mouseout",reset);
//     svg.on("mouseout",reset); //Reset also if the mouse leaves the frame, the capture of "mouseout" events being rather unreliable

 }

	
d3.json("data.js", function(data) {
    var  svg = d3.select("#d3plot").append("svg");
	

    d3scatterplot(svg,data.X,data.D,data.cities);

	

	
				
});

d3.json("data.json", function(data){
	var ul = d3.select("ul").classed('sortable',true).append('li').classed('list',true);

	ul.selectAll('li')
	.data(Object.keys(data))
	.enter()
	.append('li')
	.append('p')
	.attr('id',function(d){
		return d;

	})
	.html(function(d){
		return d;
	})

	.on('click',function(d){
		text = d3.select('#workspace').append('div').classed('doclist',true);
		text.append('div').classed('text',true).append('p').html(function(){
			return[d +":"+data[d]];
		})
	});

});