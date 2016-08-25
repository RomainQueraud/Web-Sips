function onLoad(){
	myOnLoad();
}

function beforeDomComplete(){
	if($(window).width() < 815){
		$('[name=cpuSlider]').attr("data-slider-orientation", "horizontal");
		$('[name=cpuSlider]').attr("data-slider-reversed", "false");
		$('[name=ramSlider]').attr("data-slider-orientation", "horizontal");
		$('[name=ramSlider]').attr("data-slider-reversed", "false");
		$('[name=diskSlider]').attr("data-slider-orientation", "horizontal");
		$('[name=diskSlider]').attr("data-slider-reversed", "false");
		$('[name=transferSlider]').attr("data-slider-orientation", "horizontal");
		$('[name=transferSlider]').attr("data-slider-reversed", "false");
		$(".slider").css("margin-top", "0px");
		$(".slider").css("margin-bottom", "0px");
		$(".slider p").css("margin-top", "0px");
		$(".slider p").css("margin-bottom", "0px");
		$(".nav").addClass("nav-stacked");
	}
}

$(document).ready(function() {
	var mobile = $(window).width() < 815;
	if(window.location.href.includes("github")){
		window.location.href = "http://ic4-sips.s3-website-eu-west-1.amazonaws.com/";
	}
	$(".slider-tick").removeClass("in-selection").removeClass("round").removeClass("slider-tick");
	$("#print-btn").on('click', printReport);
	$("#csv-btn").on('click', exportToCsv);
	$("#more-btn").on('click', openNav);
	$(".additional-checkbox").on('click', sendQuery);
	$('[name=cpuSlider]').slider().on('slideStop', sendQuery);
	$('[name=ramSlider]').slider().on('slideStop', sendQuery);
	$('[name=diskSlider]').slider().on('slideStop', sendQuery);
	$('[name=transferSlider]').slider().on('slideStop', sendQuery);
	$("[name='os-checkbox']").bootstrapSwitch('state', false);
	$("[name='os-checkbox']").on('switchChange.bootstrapSwitch', sendQuery); 
	$("[name='currency-checkbox']").bootstrapSwitch('state', false);
	$("[name='currency-checkbox']").on('switchChange.bootstrapSwitch', sendQuery);
	$("[name='display-checkbox']").bootstrapSwitch('state', !mobile); //false if mobile, true if desktop
	$("[name='display-checkbox']").on('switchChange.bootstrapSwitch', sendQuery);
	$("#continent-select").on('change', sendQuery); 
	$("#billing-select").on('change', sendQuery); 
	//$("#sparqlA").attr("href", FusekiServerAdress+"/control-panel.tpl");
	$("#sparql-form").attr("action", FusekiServerAdress+"/ds/query");
	
	sendQuery();
});

$(window).resize(function() {
    if( $(this).width() < 815 ) {
    }
});

function addStepper(name){
	var tickStr = $('[name='+name+'Slider]').attr("data-slider-ticks"); //Get list from the associated bootstrap slider
	var tickList = JSON.parse(tickStr);
	var actualValue = parseInt($("#"+name+"-number-input").attr("value"));
	var actualIndex = tickList.indexOf(actualValue);
	var nextValue = (actualIndex+1<tickList.length)?tickList[actualIndex+1]:tickList[actualIndex];
	$("#"+name+"-number-input").attr("value", nextValue);
	setSliderValue(name, nextValue);
}

function minusStepper(name){
	var tickStr = $('[name='+name+'Slider]').attr("data-slider-ticks"); //Get list from the associated bootstrap slider
	var tickList = JSON.parse(tickStr);
	var actualValue = parseInt($("#"+name+"-number-input").attr("value"));
	var actualIndex = tickList.indexOf(actualValue);
	var nextValue = (actualIndex-1>=0)?tickList[actualIndex-1]:tickList[actualIndex];
	$("#"+name+"-number-input").attr("value", nextValue);
	setSliderValue(name, nextValue);
}