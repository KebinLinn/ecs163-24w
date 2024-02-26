let abFilter = 25
const width = window.innerWidth;
const height = window.innerHeight;

let scatterLeft = 0, scatterTop = 0;
let scatterMargin = { top: 100, right: 30, bottom: 0, left: 900 },
  scatterWidth = 1200 - scatterMargin.left - scatterMargin.right,
  scatterHeight = 350 - scatterMargin.top - scatterMargin.bottom;

let scatterLeft2 = scatterWidth + scatterMargin.left + scatterMargin.right + 100;

let distrLeft = 400, distrTop = 0;
let distrMargin = { top: 10, right: 30, bottom: 30, left: 900 },
  distrWidth = 1200 - distrMargin.left - distrMargin.right,
  distrHeight = 350 - distrMargin.top - distrMargin.bottom;

  let teamLeft = 0, teamTop = 500;
  let teamMargin = { top: 30, right: 20, bottom: 30, left: 70 },
      shrinkFactor = 0.6, // Factor to reduce the dimensions by 20%
      teamWidth = ((width - teamMargin.left - teamMargin.right) / 1.4) * shrinkFactor,
      teamHeight = ((height - 430 - teamMargin.top - teamMargin.bottom) / 2) * shrinkFactor;
  
let parallelLeft = 0
let parallelTop = 0;
let parallelMargin = { top: 100, right: 60, bottom: 10, left: 100 },
  parallelWidth = 500 - parallelMargin.left - parallelMargin.right,
  parallelHeight = 350 - parallelMargin.top - parallelMargin.bottom;

document.body.style.backgroundColor = "#1e1e21";

d3.csv("pokemon.csv").then(rawData => {
  console.log("rawData", rawData);
  rawData.forEach(function (d) {
    d.attack = Number(d.Attack);
    d.defense = Number(d.Defense);
    d.sp_attack = Number(d.Sp_Atk);
    d.sp_defense = Number(d.Sp_Def);
    d.name = (d.Name)
  });


  //plot 1
  var color = d3.scaleOrdinal().range(["#527ef6"])
  const svg = d3.select("svg")

  const g1 = svg.append("g")
    .attr("width", scatterWidth + scatterMargin.left + scatterMargin.right)
    .attr("height", scatterHeight + scatterMargin.top + scatterMargin.bottom)
    .attr("transform", `translate(${scatterMargin.left}, ${scatterMargin.top})`)

  g1.append("text")
    .attr("x", scatterWidth  + 50)
    .attr("y", -scatterMargin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("fill", "white") 
    .text("Generation 1 Pokemon Attack vs Defense / Special Attack vs Special Defense Scatterplot (Brushing Animation)");
    g1.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", -scatterMargin.top / 2 + 20) 
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("fill", "purple")
    .text("Drag and highlight desired area on Graph 1");
  // X label
  g1.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", scatterHeight + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .style("fill", "white")
    .text("Defense");

  // Y label
  g1.append("text")
    .attr("x", -(scatterHeight / 2))
    .attr("y", -40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .style("fill", "white")
    .text("Attack");

  // X ticks
  const x1 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.defense)])
    .range([0, scatterWidth])

  const xAxisCall = d3.axisBottom(x1)
    .ticks(7)
  g1.append("g")
    .attr("transform", `translate(0, ${scatterHeight})`)
    .call(xAxisCall)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)")
    .style("fill", "white");
  g1.selectAll(".domain").style("stroke", "white");
  g1.selectAll("line").style("stroke", "white")
  // Y ticks
  const y1 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.attack)])
    .range([scatterHeight, 0])

  const yAxisCall = d3.axisLeft(y1)
    .ticks(13)
  g1.append("g").call(yAxisCall)
    .selectAll("text")
    .style("fill", "white");
  g1.selectAll(".domain").style("stroke", "white");
  g1.selectAll("line").style("stroke", "white");
  const rects = g1.selectAll("circle").data(rawData)

  rects.enter().append("circle")
    .attr("cx", function (d) {
      return x1(d.defense);
    })
    .attr("cy", function (d) {
      return y1(d.attack);
    })
    .attr("r", 3)
    .style("fill", "#527ef6");
  // plot 2 
  const g2 = svg.append("g")
    .attr("width", scatterWidth + scatterMargin.left + scatterMargin.right)
    .attr("height", scatterHeight + scatterMargin.top + scatterMargin.bottom)
    .attr("transform", `translate(${scatterLeft2}, ${scatterMargin.top})`);
  g2.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", scatterHeight + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .style("fill", "white")
    .text("Special Defense");

  // Y label for g2
  g2.append("text")
    .attr("x", -(scatterHeight / 2))
    .attr("y", -40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .style("fill", "white")
    .text("Special Attack");

  const x2 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.sp_defense)])
    .range([0, scatterWidth])

  const xAxisCall2 = d3.axisBottom(x2)
    .ticks(7)
  g2.append("g")
    .attr("transform", `translate(0, ${scatterHeight})`)
    .call(xAxisCall2)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)")
    .style("fill", "white");
  g2.selectAll(".domain").style("stroke", "white");
  g2.selectAll("line").style("stroke", "white")

  const y2 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.sp_attack)])
    .range([scatterHeight, 0])

  const yAxisCall2 = d3.axisLeft(y2)
    .ticks(13)
  g2.append("g").call(yAxisCall2)
    .selectAll("text")
    .style("fill", "white");
  g2.selectAll(".domain").style("stroke", "white");
  g2.selectAll("line").style("stroke", "white");
  const rects2 = g2.selectAll("circle").data(rawData)

  rects2.enter().append("circle")
    .attr("cx", function (d) {
      return x2(d.sp_defense);
    })
    .attr("cy", function (d) {
      return y2(d.sp_attack);
    })
    .attr("r", 3)
    .style("fill", function (d, i) { return color(i); })

  // Add this after setting up your scales and axes
  var brush = d3.brush()
    .extent([[0, 0], [scatterWidth, scatterHeight]])
    .on("brush", brushed);

  g1.append("g")
    .attr("class", "brush")
    .call(brush);

  function brushed() {
    var selection = d3.brushSelection(this);
    let selectedNames = [];
    g1.selectAll("circle")
      .style("fill", function (d) {
        var cx = x1(d.defense),
          cy = y1(d.attack);
        var isSelected = (selection[0][0] <= cx && cx <= selection[1][0]
          && selection[0][1] <= cy && cy <= selection[1][1]);
        if (isSelected) selectedNames.push(d.name); // Add name to the array if selected
        return isSelected ? "yellow" : "#527ef6";
      });

    g2.selectAll("circle")
      .style("fill", function (d) {
        var isHighlighted = selectedNames.includes(d.name);
        return isHighlighted ? "yellow" : "#527ef6"; // If highlighted, color it red, otherwise blue
  })
}

    // Barplot 
    const gen1Data = rawData.filter(function(d) {
      return +d.Generation === 1 || +d.Generation === 2 || +d.Generation === 3;
  });
  
  gen1Data.forEach(function (d) {
      d.name = d.Name;
      d.total = +d.Total; // Convert 'Total' to number
  });
  
  const r = gen1Data.map(({ name, total }) => ({ name, total }));

    const g3 = svg.append("g")
      .attr("width", teamWidth + teamMargin.left + teamMargin.right)
      .attr("height", teamHeight + teamMargin.top + teamMargin.bottom)
      .attr("transform", `translate(${teamMargin.left}, ${teamTop})`);
      
    const titleText = "All Pokemon Total Stats (Focused)";
    const titleWidth = titleText.length * 8; // Rough estimation of title width, adjust as needed
    const titleX = (teamWidth - titleWidth) / 2; // Calculate x-coordinate for centering

    g3.append("text")
      .attr("x", titleX)
      .attr("y", -teamMargin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("fill", "white")
      .text(titleText);
g3.selectAll(".domain, .tick line").attr("stroke", "white"); 
g3.selectAll(".domain, .tick line").attr("stroke", "white"); 
g3.selectAll(".domain, .tick line").attr("stroke", "white");
g3.append("text")
.attr("x", teamWidth-300) 
.attr("y", -teamMargin.top / 2)
.attr("text-anchor", "end") 
.style("font-size", "16px")
.style("fill", "purple") 
.text("Use scroll wheel to zoom in and out ");

    const colorScale = d3.scaleOrdinal()
      .range(["#527ef6"]);

    // X label
    g3.append("text")
      .attr("x", teamWidth / 2)
      .attr("y", teamHeight + 80)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .style("fill", "white")
      .text("Pokemon Name");

    // Y label
    g3.append("text")
      .attr("x", -(teamHeight / 2))
      .attr("y", -40)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .style("fill", "white")
      .text("Total");

    // X ticks
    const x3 = d3.scaleBand()
      .domain(r.map(d => d.name))
      .range([0, teamWidth])
      .paddingInner(0.3)
      .paddingOuter(0.2);

    const xAxisCall3 = d3.axisBottom(x3);
    g3.append("g")
      .attr("transform", `translate(0, ${teamHeight})`)
      .call(xAxisCall3)
      .selectAll("text")
      .attr("y", "10")
      .attr("x", "-5")
      .attr("text-anchor", "end")
      .style("fill", "white")
      .attr("transform", "rotate(-40)");
    g3.selectAll(".domain, .tick line").attr("stroke", "white"); 

    // Y ticks
    const y3 = d3.scaleLinear()
      .domain([0, d3.max(r, d => d.total)])
      .range([teamHeight, 0]);

    const yAxisCall3 = d3.axisLeft(y3)
      .ticks(6);
      const yAxis = g3.append("g").call(yAxisCall3);

yAxis.selectAll(".domain, .tick line").attr("stroke", "white"); 
yAxis.selectAll("text").style("fill", "white");
    const rects3 = g3.selectAll("rect").data(r);

    rects3.enter().append("rect")
      .attr("y", d => y3(d.total))
      .attr("x", (d) => x3(d.name))
      .attr("width", x3.bandwidth)
      .attr("height", d => teamHeight - y3(d.total))
      .attr("fill", d => colorScale(d.name));
      
const zoom = d3.zoom()
  .scaleExtent([1, 10])
  .on("zoom", zoomed);

g3.call(zoom);

let isZoomedIn = false;

function handleBarClick(d) {
  if (isZoomedIn) {
    g3.transition().duration(500).call(zoom.transform, d3.zoomIdentity);
    isZoomedIn = false;
  } else {
    const x = xScale(d.name) + xScale.bandwidth() / 2;
    const y = yScale(d.total);
    const k = 5;
    g3.transition().duration(500).call(zoom.transform, d3.zoomIdentity.translate(teamWidth / 2 - x * k, teamHeight / 2 - y * k).scale(k));
    isZoomedIn = true;
  }
}

function zoomed(event) {
  g3.attr("transform", event.transform);
}

g3.selectAll(".bar")
  .on("click", handleBarClick);














      
    //plot3 
    d3.csv("pokemon.csv").then(rawData => {
      console.log("rawData", rawData);
      rawData.forEach(function (d) {
        d.hp = +d.HP;
        d.attack = +d.Attack;
        d.defense = +d.Defense;
        d.sp_atk = +d.Sp_Atk;
        d.sp_def = +d.Sp_Def;
        d.speed = +d.Speed;
        d.name = d.Name;
        d.isLegendary = d.isLegendary === "True";
      });

      const filteredData = rawData.filter(d => d.Generation === "1");
      const svg = d3.select("svg");
      const color = d3.scaleOrdinal()
        .domain([true, false])
        .range(["yellow", "#527ef6"]);

      // Define the area on the right side for displaying the Pokémon name
      const infoAreaX = parallelWidth + 100; // Adjust this value as needed

      // Add a text element for the Pokémon name display
      svg.append("text")
        .attr("id", "pokemonNameDisplay")
        .attr("x", 500)
        .attr("y", 150) // Adjust this to position the text vertically where you want it
        .attr("text-anchor", "start")
        .style("font-size", "16px")
        .attr("fill", "purple")
        .text("Click on a Pokémon (line)  ");

      const dimensions = ['hp', 'attack', 'defense', 'sp_atk', 'sp_def', 'speed'];

      const y = {};
      dimensions.forEach(function (key) {
        y[key] = d3.scaleLinear()
          .domain(d3.extent(filteredData, function (d) { return +d[key]; }))
          .range([parallelHeight, 0]);
      });

      const x = d3.scalePoint()
        .domain(dimensions)
        .range([0, parallelWidth]);

      const line = d => d3.line()(dimensions.map(function (key) { return [x(key), y[key](d[key])]; }));

      const g1 = svg.append("g")
        .attr("transform", `translate(${parallelMargin.left}, ${parallelMargin.top})`);

      g1.append("text")
        .attr("fill", "#FFFFFF")
        .attr("x", parallelWidth / 2)
        .attr("y", -parallelMargin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .text("Generation 1 Pokemon Parallel Coordinates Plot (Selection)");

      g1.append("g").attr("class", "foreground")
        .selectAll("path")
        .data(filteredData)
        .enter().append("path")
        .attr("d", line)
        .style("stroke", function (d) { return color(d.isLegendary); })
        .style("fill", "none")
        .on("click", function (event, d) {
          d3.select("#pokemonNameDisplay").selectAll("*").remove();
          d3.select("#pokemonNameDisplay")
            .append("tspan")
            .attr("x", 500)
            .attr("dy", "1.2em")
            .attr("fill", "white")
            .text(`Name: ${d.name}`);

          // Add other attributes as tspans
          const attributes = [`HP: ${d.hp}`, `Attack: ${d.attack}`, `Defense: ${d.defense}`, `Sp. Atk: ${d.sp_atk}`, `Sp. Def: ${d.sp_def}`, `Speed: ${d.speed}`];

          attributes.forEach((attr, index) => {
            d3.select("#pokemonNameDisplay")
              .append("tspan")
              .attr("x", 500)
              .attr("dy", "1.2em")
              .attr("fill", "white")
              .text(attr);
          });
        });
      const g = g1.selectAll(".dimension")
        .data(dimensions)
        .enter().append("g")
        .attr("class", "dimension")
        .attr("transform", function (d) { return "translate(" + x(d) + ")"; });

      g.append("g")
        .attr("class", "axis")
        .each(function (d) { d3.select(this).call(d3.axisLeft(y[d])); })
        .append("text")
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("y", -9)
        .attr("fill", "white") // set the axis labels to white
        .text(function (d) { return d; });
      g.selectAll(".axis path, .axis line")
        .attr("stroke", "white");
      g.selectAll(".axis text")
        .attr("fill", "white");
    }).catch(function (err) {
      console.error(err);
    });
  })
