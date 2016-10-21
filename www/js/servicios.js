var valueSelectService;
var alrtId;

$(document).ready(function() {
   $("#btnGeo").hide();
   getServices();
});

$( document ).on( "pageinit", "#servicios", function(e,data) {

    var defaultPos = new google.maps.LatLng(19.289168, -99.653440);

    if (navigator.geolocation) {
		function exito(pos) {
			MuestraMapa(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
		}
        function falla(error) {
            //si falla mostrar mpara en posicion por defecto
                MuestraMapa(defaultPos);
            }

        //maximumAge- Guarda la posicion por 5 minutos
        //enableHighAccuracy: Se tratan de obtener los mejores resultados posible del GPS
        //timeout: el tiempo maximo que se espera para obtener la posicion en este caso 5 segundos
            var options = {maximumAge: 500000, enableHighAccuracy:true, timeout: 5000};
            navigator.geolocation.getCurrentPosition(exito, falla, options );
    }//FIN IF
	else {
        MuestraMapa(defaultPos);  // No soporta geolocalizacion y dibuja el mapa en posicion Default
         }

         //FUNCION DIBUJAR MAPa
	function MuestraMapa(latlng) {

		//Asignación del longitud y latitud para la persistencia de la ubicación.
		sessionStorage.setItem("latlng", latlng);
		
		var myOptions = {
        zoom: 16,
        center: latlng,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP};

        var map = new google.maps.Map(document.getElementById("geoServicios"), myOptions);
        var infowindow = new google.maps.InfoWindow({
			position: latlng,
			content: '<p>Tu posición actual</p>'+latlng
		});

        var marker = new google.maps.Marker({
			position: latlng,
            map: map,
            title: "Mi posición",
            animation: google.maps.Animation.DROP
		});
		
		google.maps.event.addListener(marker, 'click', function() {infowindow.open(map,marker);});

	}// Fin muestra mapa

});

function getServices(){
	$.ajax({
		url:"http://189.210.245.211:7080/WSAtnCiu/getServicios",
		type:"GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
        	for(var i = 0; i<data.length; i++){
        		$("#selServicios").append("<option value='" + data[i].servicioId + "'>" + data[i].descripcion + "</option>");
        	}
        },

        error: function () {
            alert("Error: No se cargaron los servicios correctamente.");
        }
	})
}

function getIdSelect(v){
	valueSelectService=v.value;
	getFails(valueSelectService);
}

function getFails(v) {
		$.ajax({
		url:"http://189.210.245.211:7080/WSAtnCiu/getFallas/" + v,
		type:"GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
			for(var i = 0; i<data.length; i++){
        		$("#selFallas").append("<option value='" + data[i].servicioId + "'>" + data[i].descripcion + "</option>");
        	}
        },

        error: function () {
			console.dialog("Error: No se cargaron las fallas correctamente.");
        }
	})
}

function sendReport(){
	
    var idServicio = $( "#selFallas option:selected" ).val();
    var GPS = sessionStorage.getItem("latlng");
    var idEstatusServicio;
    var idZona;
	var fecha = new Date();
    var fechaAlt = padStr(fecha.getFullYear()) + "-" +
                  padStr(1 + fecha.getMonth()) + "-" +
                  padStr(fecha.getDate());
	var descripcion = $( "#textArea" ).val();

    var contact = 	'{'+
					'"rpcFolioReporte":"FOL001",'+
					'"rpcIdUsuario":15,'+
					'"rpcIdServicio":{'+'"servicioId":'+idServicio+'},'+
					'"rpcGps":"'+GPS+'",'+
					'"rpcIdEstatusServ":{'+'"estIdEstatus":'+1+'},'+
					'"rpcIdZona":1,'+
					'"rpcFechaAlta":"'+ fechaAlt +'",'+
					'"rpcUsuAlta":1,'+
					'"rpcEstatus":1,'+
					'"rpcDescripcion":"'+descripcion+'"'+
					'}';
					
	jQuery.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "http://189.210.245.211:7080/WSAtnCiu/getRelPerSerAlert",
        data: contact.toString(),
        dataType: "json",
        success: function (data, status, jqXHR) {
            alert("Exito: Su reporte se a enviado correctamente");
            window.location.href ="#home";
			alrtId = data.alertId;
        },
        error: function (data, jqXHR, status) {
			alert("Error: intente de nuevo mas tarde");
            window.location.href ="#servicios";
        },
        done: function (e) {
            console.log("DONE");
        }
    });
}

function codificarIMGtoBase64(){
	var imgOriginal = JSON.stringify('iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAIElEQVRoge3BAQEAAACCIP+vbkhAAQAAAAAAAAAAwKMBJ0IAAWSOMT4AAAAASUVORK5CYII=');
	
	var imgElem = document.getElementById('fotoEdit_img1');
	var imgData = JSON.stringify(getBase64Image(imgElem));
	var imgElem1 = document.getElementById('fotoEdit_img2');
	var imgData1 = JSON.stringify(getBase64Image(imgElem1));
	var imgElem2 = document.getElementById('fotoEdit_img3');
	var imgData2 = JSON.stringify(getBase64Image(imgElem2));
	var imgElem3 = document.getElementById('fotoEdit_img4');
	var imgData3 = JSON.stringify(getBase64Image(imgElem3));
	
	var fecha = new Date();
    var fechaAlt = padStr(fecha.getFullYear()) + "-" +
                  padStr(1 + fecha.getMonth()) + "-" +
                  padStr(fecha.getDate());
	
	
	if(imgOriginal != imgData){
		var contact = '{'+
			'"arcNombre":"Imagen 1",'+
			'"arcTipoDocto":"JPG",'+
			'"arcIdRelUsuCatServ":	{'+
										'"rpcIdusucatser":33'+
									'},'+
			'"arcFechaAlta":"2016-10-18",'+
			'"arcUsuAlta":2,'+
			'"arcEstatus":1,'+
			'"archivoStr":'+imgData+
			'}';
		
		jQuery.ajax({
			type: "POST",
			url: "http://189.210.245.211:7080/WSAtnCiu/getRelPerSerArchivos",
			data: contact.toString(),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data, status, jqXHR) {
				alert("success 1");
			},
		
			error: function (jqXHR, status) {            
				// rest
			}
		});
	}
	
	if(imgOriginal != imgData1){
		var contact = '{'+
			'"arcNombre":"Imagen 1",'+
			'"arcTipoDocto":"JPG",'+
			'"arcIdRelUsuCatServ":	{'+
										'"rpcIdusucatser":33'+
									'},'+
			'"arcFechaAlta":"2016-10-18",'+
			'"arcUsuAlta":2,'+
			'"arcEstatus":1,'+
			'"archivoStr":'+imgData+
			'}';
		
		jQuery.ajax({
			type: "POST",
			url: "http://189.210.245.211:7080/WSAtnCiu/getRelPerSerArchivos",
			data: contact.toString(),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data, status, jqXHR) {
				alert("success 2");
			},
		
			error: function (jqXHR, status) {            
				// rest
			}
		});
	}
	
	if(imgOriginal != imgData2){
		var contact = '{'+
			'"arcNombre":"Imagen 1",'+
			'"arcTipoDocto":"JPG",'+
			'"arcIdRelUsuCatServ":	{'+
										'"rpcIdusucatser":33'+
									'},'+
			'"arcFechaAlta":"2016-10-18",'+
			'"arcUsuAlta":2,'+
			'"arcEstatus":1,'+
			'"archivoStr":'+imgData+
			'}';
		
		jQuery.ajax({
			type: "POST",
			url: "http://189.210.245.211:7080/WSAtnCiu/getRelPerSerArchivos",
			data: contact.toString(),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data, status, jqXHR) {
				alert("success 3");
			},
		
			error: function (jqXHR, status) {            
				// rest
			}
		});	
	}
	
	if(imgOriginal != imgData3){
		var contact = '{'+
			'"arcNombre":"Imagen 1",'+
			'"arcTipoDocto":"JPG",'+
			'"arcIdRelUsuCatServ":	{'+
										'"rpcIdusucatser":33'+
									'},'+
			'"arcFechaAlta":"2016-10-18",'+
			'"arcUsuAlta":2,'+
			'"arcEstatus":1,'+
			'"archivoStr":'+imgData+
			'}';
		
		jQuery.ajax({
			type: "POST",
			url: "http://189.210.245.211:7080/WSAtnCiu/getRelPerSerArchivos",
			data: contact.toString(),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data, status, jqXHR) {
				alert("success 4");
			},
		
			error: function (jqXHR, status) {            
				// rest
			}
		});	
	}
}

function getBase64Image(imgElem) {
	// imgElem must be on the same server otherwise a cross-origin error will be thrown "SECURITY_ERR: DOM Exception 18"
   var canvas = document.createElement("canvas");
   canvas.width = imgElem.clientWidth;
   canvas.height = imgElem.clientHeight;
   var ctx = canvas.getContext("2d");
   ctx.drawImage(imgElem, 0, 0);
   var dataURL = canvas.toDataURL("image/png");
   return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
	
function padStr(i) {
    return (i < 10) ? "0" + i : "" + i;
}