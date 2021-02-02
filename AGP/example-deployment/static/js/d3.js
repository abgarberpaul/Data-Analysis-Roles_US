// SVG wrapper dimensions are determined by the current width
// and height of the browser window.
var svgWidth = 1200;
var svgHeight = 660;

var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;

var svg = d3.select(".chart")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// either works!
// url = "http://127.0.0.1:5000/pizzas"
url = "/pizzas"

d3.json(url).then(function(data) {
  console.log(data);
  var months = [];
  var pizzasEatenByMonth = [];
  
  data.forEach(function(d) {
    d.pizza = +d.pizza;
  })

  // scales
  var xScale = d3.scaleBand()
    .domain(data.map(d => d.month))
    .range([0, width]);

  var yScale = d3.scaleLinear()
    .domain([0, d3.max(data.map(d => d.pizza))])
    .range([height, 0]);

  // line generator
  var line = d3.line()
    .x(d => xScale(d.month))
    .y(d => yScale(d.pizza));

  // create path
  chartGroup.append("path")
    .attr("d", line(data))
    .attr("fill", "none")
    .attr("stroke", "green");

  // append circles to data points
  var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", "10")
    .attr("fill", "red");

  // Event listeners with transitions
  circlesGroup.on("mouseover", function() {
    d3.select(this)
      .transition()
      .duration(1000)
      .attr("r", 20)
      .attr("fill", "lightblue");
  })
    .on("mouseout", function() {
      d3.select(this)
        .transition()
        .duration(1000)
        .attr("r", 10)
        .attr("fill", "red");
    });

  // transition on page load
  chartGroup.selectAll("circle")
    .transition()
    .duration(2000)
    .attr("cx", d => xScale(d.month))
    .attr("cy", d => yScale(d.pizza));
})