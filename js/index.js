function onLoad(){
	if(window.location.href.includes("github")){
		window.location.href = "http://ic4-sips.s3-website-eu-west-1.amazonaws.com/";
	}
	$("#print-btn").on('click', printReport);
	$("#csv-btn").on('click', exportToCsv);
	$("#more-btn").on('click', openNav);
	$("#closeModal").on('click', closeModal);
	$("#buttonModal").on('click', openModal);
	$("#aboutModal").on('click', closeModalAbout);
	$(".additional-checkbox").on('click', sendQuery);
	$('[name=cpuSlider]').slider().on('slideStop', sendQuery);
	$('[name=ramSlider]').slider().on('slideStop', sendQuery);
	$('[name=diskSlider]').slider().on('slideStop', sendQuery);
	$('[name=transferSlider]').slider().on('slideStop', sendQuery);
	$("[name='os-checkbox']").bootstrapSwitch('state', false);
	$("[name='os-checkbox']").on('switchChange.bootstrapSwitch', sendQuery); 
	$("[name='currency-checkbox']").bootstrapSwitch('state', false);
	$("[name='currency-checkbox']").on('switchChange.bootstrapSwitch', sendQuery);
	$("[name='display-checkbox']").bootstrapSwitch('state', true);
	$("[name='display-checkbox']").on('switchChange.bootstrapSwitch', sendQuery);
	$("#continent-select").on('change', sendQuery); 
	$("#billing-select").on('change', sendQuery); 
	//$("#sparqlA").attr("href", FusekiServerAdress+"/control-panel.tpl");
	$("#sparql-form").attr("action", FusekiServerAdress+"/ds/query");
	$("[name='freeTrial-checkbox']").bootstrapSwitch('state', false);
	$("[name='phoneSupport-checkbox']").bootstrapSwitch('state', false);
	sendQuery();
}