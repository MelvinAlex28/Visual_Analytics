d3.json("/dataset/data.json").then(function (data){
    var ul = d3.select('ul').classed('list',true).append('li').classed('list',true);
    //https://stackoverflow.com/questions/4187032/get-list-of-data-attributes-using-javascript-jquery
    ul.selectAll('li')
        .data(Object.keys(data))
        .enter()
        .append('li')
        .append('p')
        .attr('id',function(d){
            //console.log(d);
            return d;
        })

        .html(function (d){
            return d;
        })
    
    .on('click',function(d){
        text = d3.select('#workarea').append('div')
        console.log(text)


        text.append('div').classed('text', true).append('p')
        .html(function () {
            return [d , data[d]];
        })
    });
            
    $(function(){
        $('#workspace').sortable();
    })

        
})/*
function fileFun(data) {
// create the drop down menu of filename
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
            .style("left", (parseFloat(event.pageX)-270) + "px")
            .style("top", (parseFloat(event.pageY)-80) + "px");
    }

    function dragended(d) {
        console.log("ended")
        d3.select("div").classed("active", false);
    }
}
*/