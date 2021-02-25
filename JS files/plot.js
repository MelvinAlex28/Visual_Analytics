function fileFun(data) {
// create the drop down menu of cities
    var selector = d3.select("body")
        .append("select")
        .attr("id", "cityselector")
        .selectAll("option")
        .data(data)
        .enter().append("option")
        .text(function (d) {
            return d.filename;
        })
        .attr("value", function (d, i) {
            return i;
        });

    // generate a random index value and set the selector to the file
    // at that index value in the data array
    var index = Math.round(Math.random() * data.length);
    d3.select("#cityselector").property("selectedIndex", index);

    // append a paragraph tag to the body that shows the file name and it's data
    d3.select("body")
        .append("p")
    /*	.data(data)

        .text(function(d){
            return data[index]['filename'] + " -  " + data[index]['DATA'];
        })

*/
    // when the user selects a file, set the value of the index variable
    // and call the update(); function
    d3.select("#cityselector")
        .on("change", function (d) {
            //console.log(d)
            index = this.value;
            update(data);
        })

    // update the paragraph text to match the selection made by the user
    function update(data) {
        var input = document.createElement("input");
        input.type = "text"
        var id = data[index]['filename']

        selP = d3.select("p")
        selP.append("div")
            .attr("id", id)
            .style("position", "absolute")
            .style("height", "auto")
            .style("width", "900px")
            .append("text")
            .attr("type", "text")
            .text(function (d) {
                return data[index]['filename'] + " -  " + data[index]['DATA'];
            })
    }

    div = d3.selectAll('p')

    div.call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))

    function dragstarted(d) {
        console.log("started")
        //console.log((d3.select(this)._groups[0]))
        //console.log(d3.selectAll("div"))
        d3.select("div").raise().classed("active", true);
    }

    function dragged(d) {
        //console.log((parseFloat(event.pageX)*0.1))
        d3.select("div")
            .style("left", (parseFloat(event.pageX)-280) + "px")
            .style("top", (parseFloat(event.pageY)-50) + "px");
    }

    function dragended(d) {
        console.log("ended")
        d3.select("div").classed("active", false);
    }
}