// Sliders : http://seiyria.com/bootstrap-slider/

/* ============================================================ */

var URI = "http://www.ic4.ie/SIPS/";
var FusekiServerAdress = "http://localhost:3030/ds/query";

/* ============================================================ */

/* Return the value of CPU slider */
function getCpuValue(){
	return $('[name=cpuSlider]').slider().slider("getValue");
}

function getRamValue(){
	return $('[name=ramSlider]').slider().slider("getValue");
}

function getDiskValue(){
	return $('[name=diskSlider]').slider().slider("getValue");
}

function getTransferValue(){
	return $('[name=transferSlider]').slider().slider("getValue");
}

/* Return the complete Query String */
function getSparqlQuery(){
	var sparqlQuery = "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\
Select ?s ?cpu ?ram ?disk ?transfer ?price ?providername\n\
Where{\n\
	?s <"+URI+"transferSpeed> ?transfer.FILTER(xsd:float(?transfer)>="+getTransferValue()+" || xsd:float(?transfer)=-1) .\n\
	{\n\
		Select ?s ?cpu ?ram ?disk ?price ?providername\n\
		Where{\n\
			?s <"+URI+"ssd> ?disk.FILTER(xsd:float(?disk)>="+getDiskValue()+" || xsd:float(?disk)=-1) .\n\
			{\n\
				Select ?s ?cpu ?ram ?price ?providername\n\
				Where{\n\
					?s <"+URI+"ram> ?ram.FILTER(xsd:float(?ram)>="+getRamValue()+" || xsd:float(?ram)=-1) .\n\
					{\n\
						Select ?s ?cpu ?price ?providername\n\
						Where{\n\
							?s <"+URI+"providerName> ?providername .\n\
							{\n\
								Select ?s ?cpu ?price\n\
								Where{\n\
								  ?s <"+URI+"price> ?price .\n\
								  {\n\
									Select ?s ?cpu\n\
									Where {\n\
									  ?s <"+URI+"cpu> ?cpu.FILTER(xsd:float(?cpu)>="+getCpuValue()+" || xsd:float(?cpu)=-1)\n\
									}\n\
								  }\n\
								}\n\
							}\n\
						}\n\
					}\n\
				}\n\
			}\n\
		}\n\
	}\n\
}\n\
";
	return sparqlQuery;
}

function affectValue(value){
	if(value==-1){
		return "Not available";
	}
	else{
		return value;
	}
}

/* Argument is one configuration 
 Return a constructed <div></div>*/
function getProviderDiv(config){
	//TODO add the switch for the currency
	var img = "img/"+config.providername.value+".png";
	var cpu = affectValue(config.cpu.value);
	var ram = affectValue(config.ram.value);
	var disk = affectValue(config.disk.value);
	var transfer = affectValue(config.transfer.value);
	var div = '\
	<div class="config">\n\
		<img src="'+img+'" alt="Provider image">\n\
		<p>Processor <b>'+cpu+' CPUs</b></p>\n\
		<p>Ram <b>'+ram+'GB</b></p>\n\
		<p>Disk <b>'+disk+'GB</b></p>\n\
		<p>Transfer <b>'+transfer+'TB</b></p>\n\
		<p> --------- </p>\n\
		<p id=writtenPrice>'+config.price.value+'$</p>\n\
	</div>'
	
	return div;
}	

/* ============================================================ */

/* Main function, Query button pressed */
function sendQuery(){
	var configs = getResultFromQuery();
	console.log(configs);
	configs = getOptimizedConfigs(configs);
	console.log(configs);
	var providersDiv = document.getElementById("providers");
	$('#providers').html(''); //JQuery //Remove the old configurations
	for(var i=0 ; i<configs.length ; i++){
		var config = configs[i];
		var div = getProviderDiv(config);
		providersDiv.insertAdjacentHTML( 'beforeend', div );
	}
}

/* Fill the textArea with the Query String */
function fillTextArea(){
	$('[name=query]').val(getSparqlQuery());
}

/* Send the Query to the server and return the list of configurations as a result */
function getResultFromQuery(){
	var configs;
	fillTextArea();
	console.log("getResultFromQuery");
	$.ajax({
		async: false,
		url: FusekiServerAdress, // url where to submit the request
		type : "GET", // type of action POST || GET
		dataType : 'json', // data type
		data : $("#sparql-form").serialize(), // post data || get data
		success : function(result) {
			console.log("getResultFromQuery : SUCCESS")
			configs = result.results.bindings;
			console.log("getResultFromQuerySuccess : configs = ");
			console.log(configs);
			queryOver = true;
		},
		error: function(xhr, resp, text) {
			console.log("getResultFromQuery : ERROR")
			console.log(xhr, resp, text);
			queryOver = true;
		}
	})
	return configs;
}

/* Return a new list of configs, with only the cheapest for each provider 
 The list is sorted, so that it will always be the same provider order */
function getOptimizedConfigs(configs){
	var newConfigs = [];
	for(var i=0 ; i< configs.length ; i++){
		var config = configs[i];
		var isProviderInNewConfig = false;
		for(var j=0 ; j<newConfigs.length ; j++){
			if(config.providername.value == newConfigs[j].providername.value){
				isProviderInNewConfig = true;
				if(config.price.value < newConfigs[j].price.value){
					newConfigs[j] = config;
				}
			}
		}
		if(!isProviderInNewConfig){
			console.log("Push : "+config.providername.value);
			newConfigs.push(config);
		}
	}
	newConfigs = newConfigs.sort();
	return newConfigs;
}

/* ============================================================ */