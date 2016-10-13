var valueSelectService;

$(document).ready(function() {
   $("#selFallas").hide();
   getServices();
});


function getServices(){
	
	$.ajax({
		url:"http://192.168.15.104:8080/WSAtnCiu/getServicios",
		type:"GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
        	i=0;
        	var obj = $.parseJSON(data);
            $.each(obj, function(key, value){
            	$("#selServicios").append("<option value='" + obj[i].servicioId + "'>" + obj[i].descripcion + "</option>");
			});

        },

        error: function () {
            alert("Error: getServices.");
        }
	})

    $("#selFallas").show();
}

function getIdSelect(v){
	valueSelectService=v.servicioId;
	getFails(valueSelectService);
}

function getFails(v) {
		$.ajax({
		url:"http://192.168.15.104:8080/WSAtnCiu/getFallas/" + v,
		type:"GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
        	var obj = $.parseJSON(data);
            $.each(obj, function(key, value){
            	$("#selServicios").append("<option value='" + obj[i].servicioId + "'>" + obj[i].descripcion + "</option>");
			});
        },

        error: function () {
            alert("Error: getFails.");
        }
	})
}