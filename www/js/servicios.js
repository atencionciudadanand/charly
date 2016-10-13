var optionSelService;

$(document).ready(function() {
   $("#selFallas").hide();
   getServices();
   //$("#selServicios").on("change", getFails);
});


function getServices(){
	$("#selServicios").remove('option');
	
	$.ajax({
		url:"http://192.168.15.104:8080/WSAtnCiu/getServicios",
		type:"GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            alert("Exito: Consulta Exitosa");
            $.each(jason, function(key, value))
            alert(key + ": " + value);
            $('#selServicios').append($('<option>').text(value).attr('value',value));
        },

        error: function () {
            alert("Error: Algo fallo y no se que fue.");
        }
	})
    //$("#selFallas").show();
}


function getFails(option) {

}