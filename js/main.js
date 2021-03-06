// Sliders : http://seiyria.com/bootstrap-slider/
// Switchs : http://www.bootstrap-switch.org/

function myOnLoad(){
	$("[id=closeModal]").on('click', closeModal);
	$("[id=buttonModal]").on('click', openModal);
	$("[id=aboutModal]").on('click', closeModalAbout);
	$("[id=closeContactModal]").on('click', closeModal);
	$("[id=buttonContactModal]").on('click', openContactModal);
	$("[id=contactModal]").on('click', closeModalAbout);
}

var baseURI = "http://www.ic4.ie/SIPS/";
var FusekiServerAdress = "http://sips.hopto.org:3030";

var URI_windows = "http://dbpedia.org/page/Microsoft_Windows";
var URI_linux = "http://dbpedia.org/page/Linux";

var csvContent;
var navOpened = false;

var configsMinimal;

var links = {
	CloudWare : "https://client.cloudware.bg/index.php?/cart/-lang-c_cloudservers-/&step=0&languagechange=English",
	Atlantic : "https://www.atlantic.net/cloud-hosting/pricing/",
	CloudSigma : "https://www.cloudsigma.com/pricing/",
	VirtualServer : "https://www.virtual-server.net/home/",
	SecureRack : "https://my.securerack.com/index.php?/cart/vdatacenter/",
	EApps : "https://portal.eapps.com/order/index.php?pid=74&skip=true",
	E24Cloud : "https://www.e24cloud.com/en/price-list/",
	VpsNet : "https://www.vps.net/products/ssd-vps2",
	ExoScale :"https://www.exoscale.ch/pricing/",
	ZippyCloud : "https://zippycloud.com/",
	ZettaGrid : "https://account.zettagrid.com/catalog/product/configure/230/3",
	RackSpace : "https://www.rackspace.com/cloud/servers/pricing",
	ElasticHosts : "https://www.elastichosts.com/pricing/#70+20000,8192,0,0,/,1862,/,-1,-1,0,/,/,0,0,0dal-a",
	Storm : "https://www.stormondemand.com/manage/signup/configure.html?product=XD.VM&config_id=517&zone_id=27#ssd",
	CityCloud : "https://www.citycloud.com/pricing-gen-one/",
	DreamHost : "https://www.dreamhost.com/hosting/dedicated/#pricing",
	CloudWatt : "https://www.cloudwatt.com/en/pricing.html",
	CloudAndHeat : "https://www.cloudandheat.com/en/products.html#iaas",
	VexxHost : "https://vexxhost.com/public-cloud/servers/",
	LiquidWeb : "https://www.liquidweb.com/dedicated/",
	Linode : "https://www.linode.com/pricing",
	Joyent : "https://www.joyent.com/pricing",
	Gigenet : "http://gigenet.com/dedicated-servers/all-servers/",
	MicrosoftAzure : "https://azure.microsoft.com/en-us/pricing/details/virtual-machines/#Linux",
	DimensionData : "http://cloud.dimensiondata.com/saas-solutions/services/public-cloud/pricing",
	UnitedStack : "https://www.ustack.com/us/uos/price/",
	Numergy : "https://www.numergy.com/tarifs-cloud-simulateur-prix",
	Google : "https://cloud.google.com/products/calculator/",
	Amazon : "https://aws.amazon.com/ec2/pricing/",
};

var URI = {
	europe : "http://dbpedia.org/page/Europe",
	northAmerica : "http://dbpedia.org/page/North_America",
	southAmerica : "http://dbpedia.org/page/South_America",
	africa : "http://dbpedia.org/page/Africa",
	asia : "http://dbpedia.org/page/Asia",
	australia : "http://dbpedia.org/page/Australia",
	antartica : "http://dbpedia.org/page/Antarctica",
	year : "http://dbpedia.org/page/Year",
	yearDuration : 12,
	month : "http://dbpedia.org/page/Month",
	monthDuration : 1,
	week : "http://dbpedia.org/page/Week",
	weekDuration : (1/30.416)*7,
	day : "http://dbpedia.org/page/Day",
	dayDuration : 1/30.416,
	hour : "http://dbpedia.org/page/Hour",
	hourDuration : (1/30.416)/24,
	minute : "http://dbpedia.org/page/Minute",
	minuteDuration : ((1/30.416)/24)/60,
	second : "http://dbpedia.org/page/Second",
	secondDuration : (((1/30.416)/24)/60)/60,
}

/* ============================================================ */

function openModal(){
	//$(".modal").css("display", "block");
	$("#aboutModal").attr("class", "modal displayed");
	return false;
}

function openContactModal(){
	$("#contactModal").attr("class", "modal displayed");
	return false;
}

function closeModalAbout(e){
	if(!$(e.target).is("#modal-text") && !$(e.target).is("#modal-title")){
		closeModal();
	}
}

function closeModal(){
    $(".modal").attr("class", "modal");
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
	if(!navOpened){
		navOpened = true;
		document.getElementById("mySidenav").style.width = "10%";
		document.getElementById("main").style.width = "90%";
	}
	else{
		navOpened = false;
		document.getElementById("mySidenav").style.width = "0%";
		document.getElementById("main").style.width = "100%";
	}
	return false;
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

/*
$(document).scroll(function(){
    if($(this).scrollTop() > 100)
    {   
        $('.sidenav').css({"top":"0px"});
		$('.sidenav').css({"margin-top":"0px"});
    }
	else{
		$('.sidenav').css({"top":""});
		$('.sidenav').css({"margin-top":"0px"});
	}
});
*/

function printReport(){
	window.print();
	return false;
}

/* ============================================================ */

function setSliderValue(name, value){
	console.log("setSliderValue("+name+", "+value+")");
	$('[name='+name+'Slider]').slider("setValue", value);
	sendQuery();
}

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

function getContinentValue(){
	var sel = document.getElementById('continent-select');
	switch(sel.value){
		case "Africa" : return URI["africa"];
		break;
		case "Australia" : return URI["australia"];
		break;
		case "Asia" : return URI["asia"];
		break;
		case "Europe" : return URI["europe"];
		break;
		case "North America" : return URI["northAmerica"];
		break;
		case "South America" : return URI["southAmerica"];
		break;
		case "Any location" : return "Any location";
		break;
		default : throw "Unknown continent";
	}
}

function getBillingDurationValue(){
	var sel = document.getElementById('billing-select');
	switch(sel.value){
		case "Billing any" : return 1000; //Max value
		break;
		case "Billing year" : return URI["yearDuration"];
		break;
		case "Billing month" : return URI["monthDuration"];
		break;
		case "Billing day" : return URI["dayDuration"];
		break;
		case "Billing hour" : return URI["hourDuration"];
		break;
		case "Billing minute" : return URI["minuteDuration"];
		break;
		case "Billing second" : return URI["secondDuration"];
		break;
		default : throw "Unknown billing";
	}
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

function isCurrencyDollar(){
	var checked = ($('[name=currency-checkbox]').bootstrapSwitch('state'));
	if(checked){
		return true;
	}
	else{
		return false;
	}
}

function isDisplayBoxs(){
	var checked = ($('[name=display-checkbox]').bootstrapSwitch('state'));
	if(checked){
		return true;
	}
	else{
		return false;
	}
}

function getAdditionalQueryPart(){
	var query = "";
	if($('#freeTrial:checked').val()=="t") { query+="?providerUri <"+baseURI+"freeTrial> ?freeTrial .\n" }
	if($('#phoneSupport:checked').val()=="t") { query+="?providerUri <"+baseURI+"phoneSupport> ?phoneSupport .\n" }
	if($('#multipleIp:checked').val()=="t") { query+="?providerUri <"+baseURI+"multipleIp> ?multipleIp .\n" }
	if($('#webAccess:checked').val()=="t") { query+="?providerUri <"+baseURI+"webAccess> ?webAccess .\n" }
	if($('#burstResource:checked').val()=="t") { query+="?providerUri <"+baseURI+"burstResource> ?burstResource .\n" }
	if($('#customizableCpu:checked').val()=="t") { query+="?providerUri <"+baseURI+"customizableCpu> ?customizableCpu .\n" }
	if($('#api:checked').val()=="t") { query+="?providerUri <"+baseURI+"api> ?api .\n" }
	if($('#customizableConfiguration:checked').val()=="t") { query+="?providerUri <"+baseURI+"customizableConfiguration> ?customizableConfiguration .\n" }
	if($('#backup:checked').val()=="t") { query+="?providerUri <"+baseURI+"backup> ?backup .\n" }
	if($('#payAsYouGo:checked').val()=="t") { query+="?providerUri <"+baseURI+"payAsYouGo> ?payAsYouGo .\n" }
	if($('#prepaid:checked').val()=="t") { query+="?providerUri <"+baseURI+"prepaid> ?prepaid .\n" }
	if($('#multipleUsers:checked').val()=="t") { query+="?providerUri <"+baseURI+"multipleUsers\> ?multipleUsers .\n" }
	if($('#detailledSecurity:checked').val()=="t") { query+="?providerUri <"+baseURI+"detailledSecurity> ?detailledSecurity .\n" }
	if($('#terminalAccess:checked').val()=="t") { query+="?providerUri <"+baseURI+"terminalAccess> ?terminalAccess .\n" }
	if($('#uptimeGuarantee:checked').val()=="t") { query+="?providerUri <"+baseURI+"uptimeGuarantee> ?uptimeGuarantee .\n" }
	if($('#dedicatedServer:checked').val()=="t") { query+="?providerUri <"+baseURI+"dedicatedServer> ?dedicatedServer .\n" }
	if($('#paypal:checked').val()=="t") { query+="?providerUri <"+baseURI+"paypal> ?paypal .\n" }
	if($('#alwaysSupport:checked').val()=="t") { query+="?providerUri <"+baseURI+"alwaysSupport> ?alwaysSupport .\n" }
	if($('#environment:checked').val()=="t") { query+="?providerUri <"+baseURI+"environment> ?environment .\n" }
	return query;
}

/**
For all the conditional information ticked on the left panel, check if the corresponding property exist for the config.
Return true if the config pass the test, false on the other case.
*/
function isOkForAdditional(config){
	if($('#freeTrial:checked').val()=="t" && config.freeTrial.value=="") { return false; }
	if($('#phoneSupport:checked').val()=="t" && config.phoneSupport.value=="") { return false; }
	if($('#multipleIp:checked').val()=="t" && config.multipleIp.value=="") { return false; }
	if($('#webAccess:checked').val()=="t" && config.webAccess.value=="") { return false; }
	if($('#burstResource:checked').val()=="t" && config.burstResource.value=="") { return false; }
	if($('#customizableCpu:checked').val()=="t" && config.customizableCpu.value=="") { return false; }
	if($('#api:checked').val()=="t" && config.api.value=="") { return false; }
	if($('#customizableConfiguration:checked').val()=="t" && config.customizableConfiguration.value=="") { return false; }
	if($('#backup:checked').val()=="t" && config.backup.value=="") { return false; }
	if($('#payAsYouGo:checked').val()=="t" && config.payAsYouGo.value=="") { return false; }
	if($('#prepaid:checked').val()=="t" && config.prepaid.value=="") { return false; }
	if($('#multipleUsers:checked').val()=="t" && config.multipleUsers.value=="") { return false; }
	if($('#detailledSecurity:checked').val()=="t" && config.detailledSecurity.value=="") { return false; }
	if($('#terminalAccess:checked').val()=="t" && config.terminalAccess.value=="") { return false; }
	if($('#uptimeGuarantee:checked').val()=="t" && config.uptimeGuarantee.value=="") { return false; }
	if($('#dedicatedServer:checked').val()=="t" && config.dedicatedServer.value=="") { return false; }
	if($('#paypal:checked').val()=="t" && config.paypal.value=="") { return false; }
	if($('#alwaysSupport:checked').val()=="t" && config.alwaysSupport.value=="") { return false; }
	if($('#environment:checked').val()=="t" && config.environment.value=="") { return false; }
	//console.log($('#environment:checked').val());
	return true;
}

function getSparqlQueryMinimal(){
	var sparqlQuery = "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\
Select ?providerUri ?configUri ?id ?cpu ?ram ?disk ?hdd ?transfer ?continent ?os ?priceEuro ?price ?providername ?comment ?billing ?billingDuration ?date\
 ?freeTrial ?phoneSupport ?multipleIp ?webAccess ?burstResource ?customizableCpu ?api ?customizableConfiguration ?backup ?payAsYouGo ?prepaid ?multipleUsers\
 ?detailledSecurity ?terminalAccess ?uptimeGuarantee ?dedicatedServer ?paypal ?alwaysSupport ?environment\n\
Where{\n\
	?configUri <"+baseURI+"hdd> ?hdd .\n\
	?configUri <"+baseURI+"cpu> ?cpu .\n\
	?configUri <"+baseURI+"price> ?price .\n\
	?configUri <"+baseURI+"providerName> ?providername .\n\
	?configUri <"+baseURI+"ram> ?ram .\n\
	?configUri <"+baseURI+"ssd> ?disk .\n\
	?configUri <"+baseURI+"transferSpeed> ?transfer .\n\
	?configUri <"+baseURI+"comment> ?comment .\n\
	?configUri <"+baseURI+"id> ?id .\n\
	?configUri <"+baseURI+"os> ?os .\n\
	?providerUri <"+baseURI+"continent> ?continent .\n\
	?providerUri <"+baseURI+"date> ?date .\n\
	?providerUri <"+baseURI+"config> ?configUri .\n\
	?providerUri <"+baseURI+"billingDuration> ?billingDuration.\n\
	?providerUri <"+baseURI+"billing> ?billing .\n\
	?configUri <"+baseURI+"priceEuro> ?priceEuro\n\
}\n\
";
	return sparqlQuery;
}

/* Return the complete Query String */
function getSparqlQuery(){
	var sparqlQuery = "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\
Select ?providerUri ?configUri ?id ?cpu ?ram ?disk ?hdd ?transfer ?continent ?os ?priceEuro ?price ?providername ?comment ?billing ?billingDuration ?date\
 ?freeTrial ?phoneSupport ?multipleIp ?webAccess ?burstResource ?customizableCpu ?api ?customizableConfiguration ?backup ?payAsYouGo ?prepaid ?multipleUsers\
 ?detailledSecurity ?terminalAccess ?uptimeGuarantee ?dedicatedServer ?paypal ?alwaysSupport ?environment\n\
Where{\n\
	"+getAdditionalQueryPart()+"\
	?configUri <"+baseURI+"hdd> ?hdd .\n\
	?configUri <"+baseURI+"cpu> ?cpu .\n\
	?configUri <"+baseURI+"price> ?price .\n\
	?configUri <"+baseURI+"providerName> ?providername .\n\
	?configUri <"+baseURI+"ram> ?ram .\n\
	?configUri <"+baseURI+"ssd> ?disk .\n\
	?configUri <"+baseURI+"transferSpeed> ?transfer .\n\
	?configUri <"+baseURI+"comment> ?comment .\n\
	?configUri <"+baseURI+"id> ?id .\n\
	?configUri <"+baseURI+"os> ?os .\n\
	?providerUri <"+baseURI+"continent> ?continent .\n\
	?providerUri <"+baseURI+"date> ?date .\n\
	?providerUri <"+baseURI+"config> ?configUri .\n\
	?providerUri <"+baseURI+"billingDuration> ?billingDuration.\n\
	?providerUri <"+baseURI+"billing> ?billing .\n\
	?configUri <"+baseURI+"priceEuro> ?priceEuro\n\
	.FILTER((xsd:float(?billingDuration)<="+getBillingDurationValue()+")\
	  && (CONTAINS(LCASE(str(?os)), '"+getOsValue()+"') || ?os='')";
	  
	if(getContinentValue()!= "Any location"){
		sparqlQuery += "\
	  && (CONTAINS(str(?continent), '"+getContinentValue()+"') || ?continent='')";
	} 
	  
	sparqlQuery+= "\
	  && (xsd:float(?transfer)>="+getTransferValue()+" || xsd:float(?transfer)=-1)\
	  && (xsd:float(?ram)>="+getRamValue()+" || xsd:float(?ram)=-1)\
	  && (xsd:float(?cpu)>="+getCpuValue()+" || xsd:float(?cpu)=-1)\
	  && ((xsd:float(?disk)+xsd:float(?hdd))>="+getDiskValue()+" || ((xsd:float(?disk)=-1)\
	  && (xsd:float(?hdd)=-1)))) \n\
}\n\
";
	return sparqlQuery;
}

function affectValue(value){
	switch (value){
		case("-1.0") : return "NA";
		break;
		case("") : return "NA";
		break;
		case(URI_windows) : return "Windows";
		break;
		case(URI_linux) : return "Linux";
		break;
		case(URI["africa"]) : return "Africa";
		break;
		case(URI["asia"]) : return "Asia";
		break;
		case(URI["australia"]) : return "Australia";
		break;
		case(URI["europe"]) : return "Europe";
		break;
		case(URI["northAmerica"]) : return "North America";
		break;
		case(URI["southAmerica"]) : return "South America";
		break;
		case(URI["year"]) : return "Year";
		break;
		case(URI["month"]) : return "Month";
		break;
		case(URI["week"]) : return "Week";
		break;
		case(URI["day"]) : return "Day";
		break;
		case(URI["hour"]) : return "Hour";
		break;
		case(URI["minute"]) : return "Minute";
		break;
		case(URI["second"]) : return "Second";
		break;
		default : return removeComma(value);
	}
}

/* if value is an integer, set it as an integer */
function removeComma(value){
	if((value*10)%10 == 0){
		return parseInt(value);
	}
	else{
		return value;
	}
}

function affectValueDisk(ssd, hdd){
	if(ssd==-1 && hdd==-1){
		return "Not available";
	}
	else{
		if(ssd == "-1.0"){
			ssd=0;
		}
		if(hdd == "-1.0"){
			hdd=0;
		}
		return parseFloat(ssd) + parseFloat(hdd);
	}
}

function getSharedDiv(cpu){
	if(cpu < 1){
		return '<p>Shared <b>CPU</b></p>'
	}
	else{
		return '';
	}
}

function getTransferP(config){
	var transfer = affectValue(config.transfer.value);
	if(config.transfer.value=="-1.0" || config.transfer.value == "-1"){
		return '<p>Transfer <b> --- </b></p>';
	}
	else{
		return '<p>Transfer <b>'+transfer+'TB</b></p>';
	}
}

function getDisplayDiv(){
	if(isDisplayBoxs()){
		return "";
	}
	else{
		return " boxState"; //space is because it is the second class
	}
}

function resetCsvContent(){
	csvContent = "Name,CPU,RAM(GB),SSD(GB),HDD(GB),Transfer(TB),OS,Price(Euro),Date\n";
}

/* Argument is one configuration 
	box is true or false
 Return a constructed <div></div>*/
function getProviderDiv(config, box){
	//TODO add the switch for the currency
	var providerUri = config.providerUri.value;
	var configUri = config.configUri.value;
	var id = config.id.value;
	var providerName = config.providername.value;
	var img = "img/"+config.providername.value+".png";
	var cpu = affectValue(config.cpu.value);
	var ram = affectValue(config.ram.value);
	var disk = affectValueDisk(config.disk.value, config.hdd.value);
	var ssd = affectValue(config.disk.value);
	var hdd = affectValue(config.hdd.value);
	var transfer = affectValue(config.transfer.value);
	var continent = affectValue(config.continent.value);
	var os = affectValue(config.os.value);
	var comment = config.comment.value;
	var billingDuration = config.billingDuration.value;
	var billing = affectValue(config.billing.value);
	var date = affectValue(config.date.value);
	var price = affectValue(config.price.value);
	
	csvContent += providerName+","+cpu+","+ram+","+ssd+","+hdd+","+transfer+","+os+","+price+","+date+"\n";
	
	if(box){
		var div = '\
		<div class="config'+getDisplayDiv()+' animated zoomIn" onmouseover="displayAdditionalInfo('+id+')" onmouseout="hideAdditionalInfo('+id+')">\n\
			<a href="'+links[providerName]+'">\n\
				<img src="'+img+'" alt="'+providerName+'">\n\
				<p class="alt-img">'+providerName+'</p>\n\
			</a>\n\
			<div class="details">\n\
				<p>Processor <b>'+cpu+' CPUs</b></p>\n\
				<p>Ram <b>'+ram+'GB</b></p>\n\
				<p>Disk <b>'+disk+'GB</b></p>\n\
				'+getTransferP(config)+'\n\
				<p> --------- </p>\n\
				'+getPriceDiv(config)+'\n\
				<p class="config-date">Date <b>'+date+'</b></p>\n\
				<div class="addInfo" id='+id+'>\n\
					<p>Crawled <b>'+date+'</b>\n\
					<p>Continent <b>'+continent+'</b>\n\
					<p>Os <b>'+os+'</b>\n\
					<p>Billing <b>'+billing+'</b>\n\
					<p>'+comment+'</p>\n\
					'+getSharedDiv(cpu)+'\n\
				</div>\n\
			</div>\n\
		</div>';
	}
	else{ //Display line
		var div = '\
		<tr class="table-tr animated zoomIn">\n\
			<th scope="row">\n\
				<a href="'+links[providerName]+'">\n\
					<img src="'+img+'" alt="Provider image">\n\
					<p class="alt-img">'+providerName+'</p>\n\
				</a>\n\
			</th>\n\
			<td>'+cpu+'</td>\n\
			<td>'+ram+'</td>\n\
			<td>'+ssd+'</td>\n\
			<td>'+hdd+'</td>\n\
			<td class="desktop">'+transfer+'</td>\n\
			<td>'+getPriceDiv(config)+'</td>\n\
			<td class="config-date">'+date+'</td>\n\
			<td class="additional desktop">\n\
				<div style="overflow-y: scroll; height:90px">\n\
					<p>Continent <b>'+continent+'</b>\n\
					<p>Os <b>'+os+'</b>\n\
					<p>Billing <b>'+billing+'</b>\n\
					<p>'+comment+'</p>\n\
					'+getSharedDiv(cpu)+'\n\
					<p>Crawled <b>'+date+'</b>\n\
				</div>\n\
			</td>\n\
		</tr>';
	}
	
	return div;
}

/* return the price Div */
function getPriceDiv(config){
	if(isDisplayBoxs()){ //Boxs
		if(isCurrencyDollar()){//dollar
			return '<p id=writtenPrice>'+config.price.value+'$</p>'
		}
		else{//euro
			return '<p id=writtenPrice>'+config.priceEuro.value+'&euro;</p>'
		}
	}
	else{ //Lists
		if(isCurrencyDollar()){//dollar
			return '<p>'+config.price.value+'$</p>'
		}
		else{//euro
			return '<p>'+config.priceEuro.value+'&euro;</p>'
		}
	}
}

function displayAdditionalInfo(s){
	$("#"+s).css("display", "inline"); 
}

function hideAdditionalInfo(s){
	$("#"+s).css("display", "none"); 
}

/* ============================================================ */

/* Fill the textArea with the Query String */
function fillTextArea(){
	$('[name=query]').val(getSparqlQuery());
}

/* Send the Query to the server and return the list of configurations as a result */
function sendQuery(minimal){
	var out = 10000;
	var configs;
	$("[id=loading-image]").css("visibility", "visible"); 
	if(minimal==true){
		out=20000;
		$('[name=query]').val(getSparqlQueryMinimal());
	}
	else{
		$( ".tooltip-inner" ).each(function(index) {
			if($(this).text()=="0"){
				$(this).text("Any");
			}
		});
		fillTextArea();
	}
	$.ajax({
		async: true,
		url: FusekiServerAdress+"/ds/query", // url where to submit the request
		type : "GET", // type of action POST || GET
		dataType : 'json', // data type
		data : $("#sparql-form").serialize(), // post data || get data
		timeout: out, //milliseconds
		success : function(result) {
			configs = result.results.bindings;
			queryOver = true;
			if(minimal == true){
				successQueryMinimal(configs); //minimal is called by stats.js
			}
			else{
				successQuery(configs)
			}
			$("[id=loading-image]").css("visibility", "hidden"); 
		},
		error: function(xhr, resp, text) {
			if(FusekiServerAdress != "http://localhost:3030"){
				console.log(xhr, resp, text);
				console.log("Distant server not found, switching to localhost");
				FusekiServerAdress = "http://localhost:3030";
				sendQuery(minimal);
			}
			else{
				console.log(xhr, resp, text);
				queryOver = true;
				errorQuery();
				$("[id=loading-image]").css("visibility", "hidden"); 
			}
		}
	})
	return configs;
}

function errorQuery(){
	$("#green-part").css("display", "inline-block");
	var div = '<p id="serverError" class="config">Server is turned off, please contact the administrator</p>';
	$('.config').remove();
	var providersDiv = document.getElementById("green-part");
	providersDiv.insertAdjacentHTML('beforeend', div);
}

/**
Prerequesite : configs contains only one config for each provider
Function : update the modal-date div by removing the old date and adding the new one.
*/
function updateDate(configs){
	$('#modal-ul li').remove();
	var liDiv='';
	for(var i=0 ; i<configs.length ; i++){
		var config = configs[i];
		var li='<li>'+config.providername.value+' : '+config.date.value+'</li>';
		liDiv+=li;
	}
	var ul = document.getElementById("modal-ul");
	ul.insertAdjacentHTML('beforeend', liDiv);
}

function successQuery(configs){
	resetCsvContent();
	configs = getOptimizedConfigs(configs);
	configs = filterAdditionalConfigs(configs);
	configs = sortConfigs(configs);
	//updateDate(configs);
	var providersDiv = document.getElementById("green-part");
	$('.config').remove();
	$('.config boxState').remove();
	if(isDisplayBoxs()){
		for(var i=0 ; i<configs.length ; i++){
			var config = configs[i];
			var div = getProviderDiv(config, true);
			providersDiv.insertAdjacentHTML('beforeend', div);
		}
	}
	if(!isDisplayBoxs()){
		var div = '<div id="table-configs" class="table-responsive config">\
						<table class="table">\
						  <thead class="thead-inverse">\
							<tr>\
							  <th>Provider</th>\
							  <th>CPU</th>\
							  <th>RAM</th>\
							  <th>SSD</th>\
							  <th>HDD</th>\
							  <th class="desktop">Transfer</th>\
							  <th>Price</th>\
							  <th class="config-date">Date</th>\
							  <th class="additional desktop">Additional</th>\
							</tr>\
						  </thead>\
						  <tbody id="table-configs-tbody">\
						  </tbody>\
						</table>\
					</div>';
		providersDiv.insertAdjacentHTML('beforeend', div);
		providersDiv = document.getElementById("table-configs-tbody");
		for(var i=0 ; i<configs.length ; i++){
			var config = configs[i];
			var div = getProviderDiv(config, false);
			providersDiv.insertAdjacentHTML('beforeend', div);
		}
	}
	$("#sliders").addClass("animated fadeInRight");
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

/**
Return a new config list of all the configs that passed the additional properties test
*/
function filterAdditionalConfigs(configs){
	var newConfigs = [];
	for(var i=0 ; i<configs.length ; i++){
		if(isOkForAdditional(configs[i])){
			newConfigs.push(configs[i]);
		}
	}
	return newConfigs;
}

function sortConfigs(configs){
	for(var i=0 ; i<configs.length ; i++){
		for(var j=i ; j<configs.length ; j++){
			if(parseFloat(configs[j].price.value) < parseFloat(configs[i].price.value) && parseFloat(configs[i].price.value) != 0.0 && parseFloat(configs[j].price.value) != 0.0){
				var tmpConfig = configs[j];
				configs[j] = configs[i];
				configs[i] = tmpConfig;
			}
		}
	}
	return configs;
}

/* ============================================================ */
/**
Taken on Xavier John's post : http://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
*/
function exportToCsv() {
	var filename = "data.csv";
	var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
	if (navigator.msSaveBlob) { // IE 10+
		navigator.msSaveBlob(blob, filename);
	} else {
		var link = document.createElement("a");
		if (link.download !== undefined) { // feature detection
			// Browsers that support HTML5 download attribute
			var url = URL.createObjectURL(blob);
			link.setAttribute("href", url);
			link.setAttribute("download", filename);
			link.style.visibility = 'hidden';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	}
	return false;
}