const svg = d3.select("svg")

svg
  .attr("width", 800)
	.attr("height", data.length * 150)

const dataPoints = svg
	.selectAll("g.data-point")
	.data(data)
	.enter()
	.append("g")
	.attr("class", "data-point")
	.attr("transform", (d, i) => { return `translate(0, ${i*150})`;})

dataPoints
	.append("text")
	.attr("x", 175)
	.attr("y", 80)
	.attr("class", "city")
	.text((d, i) => {return d.city;})


dataPoints
	.append("text")
	.attr("x", 175)
	.attr("y", 100)
	.attr("class", "country")
	.text((d,i) => {return d.country})

const months = dataPoints
	.append("g")
	.attr("class", "months")
	.attr("transform", "translate(200, 0)")

const monthGroups = months
	.selectAll("g.month")
	.data((d, i) => {return d.months})
	.enter()
	.append("g")
	.attr("class", "g.month")
	.attr("transform", (d, i) => {return `translate(${i*50}, 0)`})

const colorScale = d3.scaleLinear()
    .domain([-10, 0, 7, 14, 21, 25])
    .range(["#814ee7", "#3f24ec","#79e87C","#fbe157","#ff9737","#fe3b3b"]);

const boxScale = d3.scaleLinear()
	.domain([-20, 45])
	.range([150, 0])

monthGroups
	.append("rect")
	.attr("x",0)
	.attr("y",0)
	.attr("width", 50)
	.attr("height", 150)
	.style("fill", (d, i) => { return colorScale(d)})

monthGroups
	.append("circle")
	.attr("cx", 25)
    .attr("cy", (d, i) => { return boxScale(d) })
	.attr("r", 15)
	.attr("fill", "white")
	
const temperatures = monthGroups
	.append("text")
	.attr("x", 25)
	.attr("y", (d, i) => {return boxScale(d)+2})
	.text( (d, i) => {return d})
	.attr("class", "temperature")
	.style("fill", (d, i) => { return colorScale(d)})
    
    

const lineGenerator = d3.line()
	.x( (d, i) => { return 25 + 50*i})
	.y( (d, i) => { return boxScale(d)})

const monthPaths = dataPoints
	.append("path")
	.datum( (d, i) => {return d.months})
    .attr("d", (d, i) => {return lineGenerator(d)})
    .attr("transform", "translate(200, 0)")
    

const unitScale = d3.scaleLinear()
	.domain([-273, 100])
	.rangeRound([-459, 212])

const selectTag = document.querySelector("select")
selectTag.addEventListener( "input" , function(){
  if (this.value === "c"){
  	temperatures.text( (d, i) => {return d})  
  }else if (this.value === "f"){
    temperatures.text( (d, i) => {return unitScale(d)})  
  }
})

