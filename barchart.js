function barChart() {

    // All options that should be accessible to caller
    var width = 500;
    var height = 300;
    var barPadding = 1;
    var fillColor = 'coral';
    var data = [];

    var updateWidth;
    var updateHeight;
    var updateFillColor;
    var updateData;

    function chart(selection){
        selection.each(function () {
            
            var maxValue = d3.max(data);
            var heightScale = d3.scale.ordinal()
							.domain(d3.range(data.length))
							.rangeRoundBands([0, height], 0.05);
            var widthScale = d3.scale.linear()
							.domain([0, maxValue])
							.range([0, width]);

            var dom = d3.select(this);
            var svg = dom.append('svg')
                .attr('class', 'bar-chart')
                .attr('height', height)
                .attr('width', width)
                .style('fill', fillColor);

            var bars = svg.selectAll('rect.display-bar')
                .data(data)
                .enter()
                .append('rect')
                .attr('class', 'display-bar')
                .attr('y', function (d, i) { return heightScale(i);  })
                .attr('height', heightScale.rangeBand())
                .attr('x', 0)
                .attr('width', function (d) { return widthScale(d); });


            // update functions
            updateWidth = function() {
                widthScale = d3.scale.linear()
							.domain([0, maxValue])
							.range([0, width]);;
                bars.transition().duration(1000).attr('width', function(d) { return widthScale(d); });
                svg.transition().duration(1000).attr('width', width);
            };

            updateHeight = function() {
                var heightScale = d3.scale.ordinal()
							.domain(d3.range(data.length))
							.rangeRoundBands([0, height], 0.05);
                bars.transition().duration(1000).attr('y', function (d, i) { return heightScale(i);  })
                    .attr('height', heightScale.rangeBand());
                svg.transition().duration(1000).attr('height', height);

            };

            updateFillColor = function() {
                svg.transition().duration(1000).style('fill', fillColor);
            };

            updateData = function() {
                var maxValue = d3.max(data);
                var heightScale = d3.scale.ordinal()
							.domain(d3.range(data.length))
							.rangeRoundBands([0, height], 0.05);
                var widthScale = d3.scale.linear()
							.domain([0, maxValue])
							.range([0, width]);

                var update = svg.selectAll('rect.display-bar')
                    .data(data);

                update
                    .transition()
                    .duration(1000)
                    .attr('y', function (d, i) { return heightScale(i);  })
                    .attr('height', heightScale.rangeBand())
                    .attr('x', 0)
                    .attr('width', function (d) { return widthScale(d); });

                update.enter()
                    .append('rect')
                    .attr('class', 'display-bar')
                    .attr('y', function (d, i) { return heightScale(i);  })
                    .attr('height', heightScale.rangeBand())
                    .attr('x', 0)
                    .attr('width', 0)
                    .style('opacity', 0)
                    .transition()
                    .duration(1000)
                    .delay(function(d, i) { return (data.length - i) * 40; })
                    .attr('width', function(d) { return widthScale(d); })
                    .style('opacity', 1);

                update.exit()
                    .transition()
                    .duration(650)
                    .delay(function(d, i) { return (data.length - i) * 20; })
                    .style('opacity', 0)
                    .attr('height', 0)
                    .attr('x', 0)
                    .attr('width', 0)
                    .remove();
            }

        });
    }

    chart.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        if (typeof updateWidth === 'function') updateWidth();
        return chart;
    };

    chart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        if (typeof updateHeight === 'function') updateHeight();
        return chart;
    };

    chart.fillColor = function(value) {
        if (!arguments.length) return fillColor;
        fillColor = value;
        if (typeof updateFillColor === 'function') updateFillColor();
        return chart;
    };

    chart.data = function(value) {
        if (!arguments.length) return data;
        data = value;
        if (typeof updateData === 'function') updateData();
        return chart;
    };

    return chart;
}