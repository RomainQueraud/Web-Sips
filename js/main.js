// Sliders : http://seiyria.com/bootstrap-slider/
// Switchs : http://www.bootstrap-switch.org/

var URI_windows = "http://dbpedia.org/page/Microsoft_Windows";
var URI_linux = "http://dbpedia.org/page/Linux";

var links = {
	CloudWare : "https://client.cloudware.bg/index.php?/cart/-lang-c_cloudservers-/&step=0&languagechange=English",
	Atlantic : "https://www.atlantic.net/cloud-hosting/pricing/",
	CloudSigma : "https://www.cloudsigma.com/pricing/",
	VirtualServer : "https://www.virtual-server.net/home/",
};

function onLoad(){
	sendQuery();
	$('[name=cpuSlider]').slider().on('slideStop', sendQuery);
	$('[name=ramSlider]').slider().on('slideStop', sendQuery);
	$('[name=diskSlider]').slider().on('slideStop', sendQuery);
	$('[name=transferSlider]').slider().on('slideStop', sendQuery);
	$("[name='os-checkbox']").bootstrapSwitch();
	$("[name='os-checkbox']").on('switchChange.bootstrapSwitch', sendQuery); 
}

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

function getOsValue(){
	var checked = ($('[name=os-checkbox]').bootstrapSwitch('state'));
	if(checked){
		return "windows";
	}
	else{
		return "linux";
	}
}

//?s <"+URI+"os> ?os.FILTER (CONTAINS(LCASE(?os), '"+getOsValue()+"') ||CONTAINS(?os, '')) .\n\

/* Return the complete Query String */
function getSparqlQuery(){
	var sparqlQuery = "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\
Select ?s ?id ?cpu ?ram ?disk ?transfer ?os ?price ?providername ?comment\n\
Where{\n\
	?s <"+URI+"os> ?os.FILTER (CONTAINS(LCASE(str(?os)), '"+getOsValue()+"') || ?os='') .\n\
	{\n\
		Select ?s ?id ?cpu ?ram ?disk ?transfer ?price ?providername ?comment\n\
		Where{\n\
			?s <"+URI+"id> ?id .\n\
			{\n\
				Select ?s ?cpu ?ram ?disk ?transfer ?price ?providername ?comment\n\
				Where{\n\
					?s <"+URI+"comment> ?comment .\n\
					{\n\
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
	if(value==-1 || value==""){
		return "Not available";
	}
	else if(value==URI_windows){
		return "Windows";
	}
	else if(value==URI_linux){
		return "Linux";
	}
	else{
		return value;
	}
}

/* Argument is one configuration 
 Return a constructed <div></div>*/
function getProviderDiv(config){
	//TODO add the switch for the currency
	var s = config.s.value;
	var id = config.id.value;
	var providerName = config.providername.value;
	var img = "img/"+config.providername.value+".png";
	var cpu = affectValue(config.cpu.value);
	var ram = affectValue(config.ram.value);
	var disk = affectValue(config.disk.value);
	var transfer = affectValue(config.transfer.value);
	var os = affectValue(config.os.value);
	var comment = config.comment.value;
	
	var div = '\
	<div class="config" onmouseover="displayAdditionalInfo('+id+')" onmouseout="hideAdditionalInfo('+id+')">\n\
		<a href="'+links[providerName]+'">\n\
			<img src="'+img+'" alt="Provider image">\n\
		</a>\n\
		<div class="details">\n\
			<p>Processor <b>'+cpu+' CPUs</b></p>\n\
			<p>Ram <b>'+ram+'GB</b></p>\n\
			<p>Disk <b>'+disk+'GB</b></p>\n\
			<p>Transfer <b>'+transfer+'TB</b></p>\n\
			<p> --------- </p>\n\
			<p id=writtenPrice>'+config.price.value+'$</p>\n\
			<div class="addInfo" id='+id+'>\n\
				<p>Os <b>'+os+'</b>\n\
				<p>'+comment+'</p>\n\
			</div>\n\
		</div>\n\
	</div>';
	
	return div;
}

function displayAdditionalInfo(s){
	$("#"+s).css("display", "inline"); 
}

function hideAdditionalInfo(s){
	$("#"+s).css("display", "none"); 
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
		providersDiv.insertAdjacentHTML('beforeend', div);
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
				if(parseFloat(config.price.value) < parseFloat(newConfigs[j].price.value)){
					newConfigs[j] = config;
				}
			}
		}
		if(!isProviderInNewConfig){
			newConfigs.push(config);
		}
	}
	newConfigs = newConfigs.sort();
	return newConfigs;
}

/* ============================================================ */