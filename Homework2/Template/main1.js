let abFilter = 25
const width = window.innerWidth;
const height = window.innerHeight;

let scatterLeft = 0, scatterTop = 0;
let scatterMargin = { top: 60, right: 30, bottom: 0, left: 900 },
    scatterWidth = 1200 - scatterMargin.left - scatterMargin.right,
    scatterHeight = 350 - scatterMargin.top - scatterMargin.bottom;

let distrLeft = 400, distrTop = 0;
let distrMargin = { top: 10, right: 30, bottom: 30, left: 900 },
    distrWidth = 1200 - distrMargin.left - distrMargin.right,
    distrHeight = 350 - distrMargin.top - distrMargin.bottom;

let teamLeft = 0, teamTop = 500;
let teamMargin = { top: 30, right: 30, bottom: 30, left: 60 },
    teamWidth = (width - teamMargin.left - teamMargin.right) / 2,
    teamHeight = (height - 430 - teamMargin.top - teamMargin.bottom)/2;


    let parallelLeft = 0
    let parallelTop = 0;
    let parallelMargin = { top: 100, right: 60, bottom: 10, left: 100 },
      parallelWidth = 500 - parallelMargin.left - parallelMargin.right,
      parallelHeight = 350 - parallelMargin.top - parallelMargin.bottom;

//document.body.style.backgroundColor = "#00000";
d3.csv("pokemon.csv").then(rawData => {
    console.log("rawData", rawData);
    rawData.forEach(function (d) {
        d.speed = Number(d.Speed);
        d.weight = Number(d.Weight_kg);
    });
    rawData = rawData.filter(d => !isNaN(d.weight) && d.weight != "");

    //plot 1
    
    const svg = d3.select("svg")

    const g1 = svg.append("g")
        .attr("width", scatterWidth + scatterMargin.left + scatterMargin.right)
        .attr("height", scatterHeight + scatterMargin.top + scatterMargin.bottom)
        .attr("transform", `translate(${scatterMargin.left}, ${scatterMargin.top})`)

        g1.append("text")
        .attr("x", scatterWidth / 2)
        .attr("y", -scatterMargin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .text("Pokemon Weight and Height Scatterplot");
    // X label
    g1.append("text")
        .attr("x", scatterWidth / 2)
        .attr("y", scatterHeight + 50)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("Weight (kg)")

    // Y label
    g1.append("text")
        .attr("x", -(scatterHeight / 2))
        .attr("y", -40)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Speed")

    // X ticks
    const x1 = d3.scaleLinear()
        .domain([0, d3.max(rawData, d => d.weight)])
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

    // Y ticks
    const y1 = d3.scaleLinear()
        .domain([0, d3.max(rawData, d => d.speed)])
        .range([scatterHeight, 0])

    const yAxisCall = d3.axisLeft(y1)
        .ticks(13)
    g1.append("g").call(yAxisCall)

    const rects = g1.selectAll("circle").data(rawData)

    rects.enter().append("circle")
        .attr("cx", function (d) {
            return x1(d.weight);
        })
        .attr("cy", function (d) {
            return y1(d.speed);
        })
        .attr("r", 3)
        .attr("fill", "#69b3a2")

    //space
    const g2 = svg.append("g")
        .attr("width", distrWidth + distrMargin.left + distrMargin.right)
        .attr("height", distrHeight + distrMargin.top + distrMargin.bottom)
        .attr("transform", `translate(${distrLeft}, ${distrTop})`)

    //plot 2

    q = rawData.reduce((s, { Type_1 }) => (s[Type_1] = (s[Type_1] || 0) + 1, s), {});
    r = Object.keys(q).map((key) => ({ Type_1: key, count: q[key] }));
    console.log(r);
    
    const g3 = svg.append("g")
        .attr("width", teamWidth + teamMargin.left + teamMargin.right)
        .attr("height", teamHeight + teamMargin.top + teamMargin.bottom)
        .attr("transform", `translate(${teamMargin.left}, ${teamTop})`)
    
     g3.append("text")
    .attr("x", teamWidth / 2)
    .attr("y", -teamMargin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .text("Frequency count of Pokemon Type 1");

    const colorScale = d3.scaleOrdinal()
        .range(["green", "red", "blue", "#90ee90", "#FFE5B4", "#A020F0", "yellow", "brown", "pink",
            "#C4A484", "#CBC3E3", "#5C4033", "#301934", "#ADD8E6", "#00008B", "black", "silver",
            "#87CEEB"]);

    // X label
    g3.append("text")
        .attr("x", teamWidth / 2)
        .attr("y", teamHeight + 50)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("Type 1")


    // Y label
    g3.append("text")
        .attr("x", -(teamHeight / 2))
        .attr("y", -40)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Count")

    // X ticks
    const x2 = d3.scaleBand()
        .domain(r.map(d => d.Type_1))
        .range([0, teamWidth])
        .paddingInner(0.3)
        .paddingOuter(0.2)

    const xAxisCall2 = d3.axisBottom(x2)
    g3.append("g")
        .attr("transform", `translate(0, ${teamHeight})`)
        .call(xAxisCall2)
        .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)")

    // Y ticks
    const y2 = d3.scaleLinear()
        .domain([0, d3.max(r, d => d.count)])
        .range([teamHeight, 0])

    const yAxisCall2 = d3.axisLeft(y2)
        .ticks(6)
    g3.append("g").call(yAxisCall2)

    const rects2 = g3.selectAll("rect").data(r)

    rects2.enter().append("rect")
        .attr("y", d => y2(d.count))
        .attr("x", (d) => x2(d.Type_1))
        .attr("width", x2.bandwidth)
        .attr("height", d => teamHeight - y2(d.count))
        .attr("fill", d => colorScale(d.Type_1))

    //plot3 
  var color = d3.scaleOrdinal().range(["#00ccff", "#ffff00", "#ff6600",
  "#ff00ff", "#ffcc00", "#ff9966",
  "#3366ff", "#ccffff", "#ff0066",
  "#996633", "#0099cc", "#e0e0eb",
  "#ff66cc", "#3366ff", "#80ccff",
  "#b30000", "#00ff00", "#ffff99",
  "#ccff99", "#cccc00", "#660066",
  "#000066", "#d1e0e0", "#9900cc",
  "#660033", "#00cc99", "#000000",
  "#6600ff", "#00cc66", "#00ffcc",
  "#ff9966", "#00ffff", "#993333",
  "#336600", "#006600", "#0000cc",
  "#c0c0c0", "#4d4d00", "#662900",
  "#336699", "#ff66ff", "#330000",
  "#336600", "#ffccff", "#cccc00",
  "#cc0000"
]);

d3.csv("pokemon.csv").then(rawData => {
  console.log("rawData", rawData);
  rawData.forEach(function (d) {
    d.hp = Number(d.HP);
    d.attack = Number(d.Attack);
    d.defense = Number(d.Defense);
    d.sp_atk = Number(d.Sp_Atk);
    d.sp_def = Number(d.Sp_Def);
    d.speed = Number(d.Speed);
    d.name = d.Name;
  });
  const filteredData = rawData.filter(d => d.isLegendary === "True");
  const svg = d3.select("svg");

  const g1 = svg.append("g")
    .attr("transform", `translate(${parallelMargin.left}, ${parallelMargin.top})`);

  const dimensions = ['hp', 'attack', 'defense', 'sp_atk', 'sp_def', 'speed'];
    g1.append("text")
    .attr("x", scatterWidth)
    .attr("y", -scatterMargin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .text("Pokemon Parallel Coordinates Plot");
  const y = {};
  dimensions.forEach(function (key) {
    y[key] = d3.scaleLinear()
      .domain(d3.extent(filteredData, function (d) { return +d[key]; }))
      .range([parallelHeight, 0]);
  });

  const x = d3.scalePoint()
    .domain(dimensions)
    .range([0, parallelWidth]);

  const line = function (d) {
    return d3.line()(dimensions.map(function (key) { return [x(key), y[key](d[key])]; }));
  };

  const foreground = g1.append("g")
    .attr("class", "foreground")
    .selectAll("path")
    .data(filteredData)
    .enter().append("path")
    .attr("d", function (d) { return line(d); })
    .style("stroke", function (d, i) { return color(i); })
    .style("fill", "none");

  const g = g1.selectAll(".dimension")
    .data(dimensions)
    .enter().append("g")
    .attr("class", "dimension")
    .attr("transform", function (d) { return "translate(" + x(d) + ")"; })
    .call(d3.drag()
      .on("start", function (d) {
      })
      .on("drag", function (d) {
        dragging[d] = Math.min(parallelWidth, Math.max(0, d3.event.x));
        foreground.attr("d", line);
        dimensions.sort(function (a, b) { return position(a) - position(b); });
        g.attr("transform", function (d) { return "translate(" + position(d) + ")"; });
      })
      .on("end", function (d) {
        transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
        transition(foreground).attr("d", line);
        background
          .attr("d", line)
          .transition()
          .delay(500)
          .duration(0)
          .attr("visibility", null);
      }));

  g.append("g")
    .attr("class", "axis")
    .each(function (d) { d3.select(this).call(d3.axisLeft().scale(y[d])); })
    .append("text")
    .style("text-anchor", "middle")
    .attr("fill", "black")
    .attr("font-size", "12")
    .attr("y", -9)
    .text(function (d) { return d; });
  const legend = svg.append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${parallelWidth + parallelMargin.left + 10}, ${parallelMargin.top})`);

  const legendRectSize = 13;
  const legendSpacing = 4;
  const columnWidth = 100;
  const legends = legend.selectAll(".legend")
    .data(filteredData)
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("font-size", "12")
    .attr("transform", (d, i) => `translate(${i % 3 * columnWidth}, ${Math.floor(i / 3) * (legendRectSize + legendSpacing)})`);

  legends.append("rect")
    .attr("width", legendRectSize)
    .attr("height", legendRectSize)
    .style("fill", (d, i) => color(i));

  legends.append("text")
    .attr("x", legendRectSize + legendSpacing)
    .attr("y", legendRectSize - legendSpacing)
    .text(d => d.name);
}).catch(function (err) {
  console.error(err);
});





}).catch(function (error) {
    console.log(error);
});

