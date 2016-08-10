var FusekiServerAdress = "http://sips.hopto.org:3030";
var ajaxTest = true;

$(document).ready(function() {
         $('.carousel').carousel({
             interval: 3000
         })
    }
);    

function onLoad(){
	myOnLoad();
	console.log("href : "+window.location.href );
	if(window.location.href.includes("github")){
		window.location.href = "http://ic4-sips.s3-website-eu-west-1.amazonaws.com/endpoint.html";
	}
	$("#sparql-form").attr("action", FusekiServerAdress+"/ds/query");
	$(".form-based-height").css("height", $("#sparql-form").css("height"));
}

function doSubmit(){
	/*
	console.log("ajaxTest : "+ajaxTest);
	if(ajaxTest){
		ajaxTest = false; //This way, the test is only done once
		$.ajax({
			async: false,
			url: FusekiServerAdress+"/ds/query", // url where to submit the request
			type : "GET", // type of action POST || GET
			dataType : 'json', // data typeform").serialize(), // post data || get data
			timeout: 4000, //milliseconds
			success : function(result) {
				console.log("Success");
				$("#sparql-form").submit();
			},
			error: function(xhr, resp, text) {
				FusekiServerAdress = "http://localhost:3030";
				$("#sparql-form").attr("action", FusekiServerAdress+"/ds/query");
				console.log("FusekiServerAdress changed");
				$("#sparql-form").submit();
			}
		})
	}
	return false; //if true, the form is submitted with the html
	*/
	$("#sparql-form").submit();
}