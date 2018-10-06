function buildMetadata(sample) {
	d3.json(`metadata/${sample}`).then(function (data) {
		console.log("inbuilddata")
		console.log(data)
		//});
		var panel = d3.select("#sample-metadata");

		// Use `.html("") to clear any existing metadata
		panel.html("");
		// Use `Object.entries` to add each key and value pair to the panel
		// Hint: Inside the loop, you will need to use d3 to append new
		// tags for each key-value in the metadata.

		Object.entries(data).map(([key, value]) => {
			panel.append("h6").text(`${key} ${value}`)
		});

		// @TODO: Complete the following function that builds the metadata panel

		// Use `d3.json` to fetch the metadata for a sample
		// Use d3 to select the panel with id of `#sample-metadata`

		// BONUS: Build the Gauge Chart
		// buildGauge(data.WFREQ);
	})
}

function pie(dynamic) {
	var url = "/samples/" + dynamic;


	d3.json(url).then(function (data) {
		console.log(data)

		var pieDiv = document.getElementById("pie");

		var sliceValues = data.sample_values.slice(0, 10);
		var sliceLabels = data.otu_ids.slice(0, 10);

		console.log("slice values" + sliceValues);
		console.log("slice labels " + sliceLabels);

		var traceA = {
			type: "pie",
			values: data.sample_values.slice(0, 10),
			labels: data.otu_ids.slice(0, 10)
		};

		var data = [traceA];

		var layout = {
			title: "Top 10"
		};

		Plotly.newPlot(pieDiv, data, layout);

	});
}

function bubble(dynamic) {
	var url = "/samples/" + dynamic;

	d3.json(url).then(function (data) {
		console.log(data)
		var bubbleDiv = document.getElementById("bubble");

		var traceA = {
			type: "scatter",
			mode: "markers",
			x: data.otu_ids,
			y: data.sample_values,
			marker: {
				size: data.sample_values,
				color: data.otu_ids
			}
		};

		var data = [traceA];

		var layout = {
			title: "A Bubble Chart in Plotly"
		};

		Plotly.newPlot(bubbleDiv, data, layout);

	});
}


function buildCharts(sample) {
	pie(sample);
	bubble(sample);

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
