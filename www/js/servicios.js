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
        success: function (json) {
            $.each(jason, function(key, value))
            $('#selServicios').append($('<option>').text(value).attr('value',value));
        },

        error: function () {
            alert("Error: Algo fallo y no se que fue.");
        }
	})
	
    $("#selFallas").show();
}

function getIdSelect(v){
	valueSelectService=v.value;
	getFails(valueSelectService);
}

function getFails(v) {
		$.ajax({
		url:"http://192.168.15.104:8080/WSAtnCiu/getFallas/" + v,
		type:"GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            $.each(jason, function(key, value))
            $('#selFallas').append($('<option>').text(value).attr('value',value));
        },

        error: function () {
            alert("Error: Algo fallo y no se que fue.");
        }
	})
}