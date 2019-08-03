function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
var metaurl = `/metadata/%{sample}`;
  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
var metadatapanel = d3.select('#sample_metadata');
    // Use `.html("") to clear any existing metadata
metadatapanel.html(" ");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
d3.json(metaurl).then(function(entry) {
  Object.defineProperties(entry).forEach(([key, value]) => {
  console.log(entry);
  metadatapanel.append("h6").text(`${key}: ${value}`);
});
});
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
    function gaugeChart(data) {
      var angle = parseInt(data.WFREQ)*(18);
      var dial = angle;
      var torque = 180 - dial,
      radius = 1.0;
      var radians = (torque * Math.PI)/180;
      var x = radius*Math.cos(radians);
      var y = radius*Math.sin(radians);
    }
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data
function bubleChart(data){
  var x = data.otu_ids;
  var y = data.sample_values;
  var markersize = data.sample_values;
  var colors = data.otu_ids;
  var labelValues = data.otu_labels;

  var trace1 = {
    x: data.otu_ids,
    y: data.sample_values,
    mode: "markers",
    labels: data.otu_labels,
    marker: {
      color: colors,
      size: markersize,
      colorscale: "Spring"
    }
  };
  var trace1 = [trace1];
  var layout = {
    title: "OTU sample points",
    xaxis: {
      title: "OTU_IDs"
    },
    yaxis: {
      title: "Sample Values"
    },
    autosize: true,
    showlegend: "Bubble Chart"
  };

  Plotly.newPlot("Bubble Chart", trace1, layout, {responsive:true});
}
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
