
d3.json("data.json").then(function (data){
    var ul = d3.select('ul').classed('sortable',true).append('li').classed('list',true);

    ul.selectAll('li')
        .data(Object.keys(data))
        .enter()
        .append('li')
        .append('draggable',true)
        .append('p')
        .attr('id',function(d){
            return d;
        })

        .html(function (d){
            return d;
        })
    


        .on('click',function(d){


                text = d3.select('#workspace').append('div').classed('doclist', true);



                text.append('div').classed('text', true).append('p').html(function () {
                    return [d , data[d]];
                })











    });



})
