var FusekiServerAdress = "http://romain.hopto.org:3030";
var ajaxTest = true;

function onLoad(){
	$("#sparql-form").attr("action", FusekiServerAdress+"/ds/query");
}

function doSubmit(){
	console.log("ajaxTest : "+ajaxTest);
	if(ajaxTest){
		ajaxTest = false; //This way, the test is only done once
		$.ajax({
			async: true,
			url: FusekiServerAdress+"/ds/query", // url where to submit the request
			type : "GET", // type of action POST || GET
			dataType : 'json', // data typeform").serialize(), // post data || get data
			timeout: 2000, //milliseconds
			success : function(result) {
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
}