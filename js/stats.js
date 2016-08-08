function onLoad(){
	sendQuery(true);
}

function successQueryMinimal(configs){
	fillChart(configs);
}

function fillChart(configs){
	nbConfigsChart(configs);
	bigConfigsChart(configs);
}

function getBigConfigs(configs){
	var providerOrder = [];
	var bigConfigs = [];
	for(var i=0 ; i<configs.length ; i++){
		var config = configs[i];
		if(!providerOrder.includes(config.providername.value)){
			providerOrder.push(config.providername.value);
			bigConfigs.push(config);
		}
		var j = providerOrder.indexOf(config.providername.value);
		if(parseFloat(config.price.value) > parseFloat(bigConfigs[j].price.value)){
			bigConfigs[j] = config;
		}
	}
	var datasets = [];
	for(var i=0 ; i<bigConfigs.length ; i++){
		var config = bigConfigs[i];
		var triplet = [Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255)];
		var elem = {
			label : config.providername.value,
			backgroundColor: "rgba("+triplet[0]+","+triplet[1]+","+triplet[2]+",0.2)",
            borderColor: "rgba("+triplet[0]+","+triplet[1]+","+triplet[2]+",1)",
            data: [{x:config.cpu.value, y:config.ram.value, r:config.price.value}]
		};
		datasets.push(elem);
	}
	return datasets;
}

function bigConfigsChart(configs){
	result = getBigConfigs(configs);
	labels = ["CPU", "RAM", "HDD", "SSD", "Price"];
	var ctx = document.getElementById("bigConfigsChart");
	var myRadarChart = new Chart(ctx, {
		type: 'bubble',
		data: {
			datasets: result
		},
		options: {
		}
	});
}

/**
return is : [labels:List, numbers:List] in the same order
*/
function getNbConfigs(configs){
	var labels = [];
	var numbers = [];
	var colors = [];
	var borders = [];
	for(var i=0 ; i<configs.length ; i++){
		var config = configs[i];
		if(!labels.includes(config.providername.value)){
			var triplet = [Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255)];
			labels.push(config.providername.value);
			numbers.push(0);
			colors.push('rgba('+triplet[0]+', '+triplet[1]+', '+triplet[2]+', 0.2)');
			borders.push('rgba('+triplet[0]+', '+triplet[1]+', '+triplet[2]+', 1)');
		}
		var j = labels.indexOf(config.providername.value);
		numbers[j] = numbers[j]+1;
	}
	return [labels, numbers, colors, borders];
}

function nbConfigsChart(configs){
	result = getNbConfigs(configs);
	console.log(result);
	var ctx = document.getElementById("nbConfigsChart");
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: result[0],
			datasets: [{
				label: 'Number of configurations',
				data: result[1],
				backgroundColor: result[2],
				borderColor: result[3],
				borderWidth: 1
			}]
		},
		options: {
			maintainAspectRatio:false,
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero:true
					}
				}]
			}
		},
	});
}