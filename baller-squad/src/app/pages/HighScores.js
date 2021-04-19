// Home page for app
import React, {useEffect, useState, useContext} from "react";
import * as d3 from "d3";
const data = [{"grade":'A', "frequency": 0.5},
  {"grade":'B', "frequency": 0.7},
  {"grade": 'C', "frequency": 0.4},
  {"grade":'D', "frequency": 0.3},
  {"grade": 'F', "frequency": 0.2}]

export const HighScores = () => {
  
  useEffect( () => {
    
    drawChart(data, "graph");
    drawChart(data, "graph1");
    drawChart(data, "graph2");
  }, [data])

  

  const drawChart = (data, graph) =>{
    const margin = 70;
    const width = 500;
    const height = 400;
    const chartWidth = width - 2 * margin;
    const chartHeight = height - 2 * margin;

    const svg = d3.select(`#${graph}`).append("svg")
        .attr("width", width)
        .attr("height", height);
    svg.append("text")
        .attr("transform", "translate(100,0)")
        .attr("x", 50)
        .attr("y", 50)
        .attr("font-size", "24px")
        .style('fill', 'white')
        .text("High Scores");
    const chart = svg.append('g')
        .attr('transform', `translate(${margin}, ${margin})`);

    var xScale = d3.scaleBand().range([0, chartWidth]).padding(0.4),
    yScale = d3.scaleLinear().range([chartHeight, 0]);

    xScale.domain(data.map(function(d){return d.grade;}));
    yScale.domain([0, d3.max(data, function(d) { return d.frequency; })+0.1]);
    chart.append('g')
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(d3.axisBottom(xScale));

    chart.append("g")
         .call(d3.axisLeft(yScale).tickFormat(function(d){
             return d;
         }).ticks(10));
         const colourScale = d3.scaleLinear()
         .domain([0, 0.5])
         .range(['white', 'red']);
    svg.append('text')
    .attr('x', -(height / 2))
    .attr('y', 50 / 2)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .style('fill', 'white')
    .text('Score');
     
    svg.append('text')
        .attr('x', chartWidth / 2 + margin)
        .attr('y', 380)
        .attr('text-anchor', 'middle')
        .style('fill', 'white')
        .text('Level');

    chart.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return xScale(d.grade); })
         .attr("y", function(d) { return yScale(d.frequency); })
         .attr("width", xScale.bandwidth())
         .attr("height", function(d) { return chartHeight - yScale(d.frequency); })
         .attr("fill", (data) => colourScale(data.frequency));
    } 

  return (
    <div className={`w-full h-full p-5 text-white`}>
      <div className={`grid grid-cols-3 gap-4 h-full w-full text-white`}>
      <div id="graph" classsName="flex flex-col items-left justify-center h-full">
      </div>
      <div id="graph1" classsName="flex flex-col items-left justify-center h-full">

      </div>
      <div id="graph2" classsName="flex flex-col items-left justify-center h-full">

      </div>
      </div>
    </div>
  )
};
