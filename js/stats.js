function onLoad(){
	sendQuery(true);
}

function successQueryMinimal(configs){
	$("#loading-image").css("display", "none");
	$("#green-part").css("display", "inline-block");
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
			bigConfigs.push([]);
		}
		var j = providerOrder.indexOf(config.providername.value);
		bigConfigs[j].push(config);
	}
	var datasets = [];
	for(var i=0 ; i<bigConfigs.length ; i++){
		var configList = bigConfigs[i];
		var triplet = [Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255)];
		var data = [];
		for(var j=0 ; j<configList.length ; j++){
			var config = configList[j];
			data.push({x:config.cpu.value, y:config.ram.value, r:config.price.value/100});
		}
		var hidden = true;
		if(configList[0].providername.value=="Linode" || configList[0].providername.value=="CloudSigma"){
			hidden = false;
		}
		var elem = {
			label : config.providername.value,
			hidden: hidden,
			backgroundColor: "rgba("+triplet[0]+","+triplet[1]+","+triplet[2]+",0.2)",
            borderColor: "rgba("+triplet[0]+","+triplet[1]+","+triplet[2]+",1)",
			hoverRadius: 0.5,
            data: data
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
			maintainAspectRatio:false
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