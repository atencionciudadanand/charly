var valueSelectService;
var alerId;

$(document).ready(function() {
   $("#btnGeo").hide();
   getServices();
});

$( document ).on( "pageinit", "#servicios", function(e,data) {

    var defaultPos = new google.maps.LatLng(19.289168, -99.653440);

    if (navigator.geolocation) {
		
        //maximumAge- Guarda la posicion por 5 minutos
        //enableHighAccuracy: Se tratan de obtener los mejores resultados posible del GPS
        //timeout: el tiempo maximo que se espera para obtener la posicion en este caso 5 segundos
        var options = {maximumAge: 500000, enableHighAccuracy:true, timeout: 5000};
		navigator.geolocation.getCurrentPosition(exito, falla, options );
			
		function exito(pos) {
			MuestraMapa(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
		}
        function falla(error) {
            //si falla mostrar mpara en posicion por defecto
                MuestraMapa(defaultPos);
            }
    }//FIN IF
	else {
        MuestraMapa(defaultPos);  // No soporta geolocalizacion y dibuja el mapa en posicion Default
         }

         //FUNCION DIBUJAR MAPa
	function MuestraMapa(latlng) {

		//Asignaci&oacute;n del longitud y latitud para la persistencia de la ubicaci&oacute;n.
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

        $("#selFallas").empty();

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
	
	var usuarioId = sessionStorage.getItem("IdUsuario");

    var contact = 	'{'+
					'"rpcFolioReporte":"",'+
					'"rpcIdUsuario":{"usuarioId":'+usuarioId+'},'+
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
            alert("Éxito: Su reporte se ha enviado correctamente");          
		alerId = data.alertId;
		codificarIMGtoBase64();
		window.location.href ="#home"; 
        },
        error: function (data, jqXHR, status) {
			alert("Error: Intente de nuevo más tarde");
            window.location.href ="#servicios";
        },
        done: function (e) {
            console.log("DONE");
        }
    });
}

function cancelReport(){
    window.location.href ="#home";
    window.location.reload();
}

function codificarIMGtoBase64(){
	var imgOriginal = JSON.stringify('iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAIElEQVRoge3BAQEAAACCIP+vbkhAAQAAAAAAAAAAwKMBJ0IAAWSOMT4AAAAASUVORK5CYII=');

    // Mostrar div mediante ID
    $('#fotoEdit2').show();

    var imgElem = document.getElementById('fotoEdit_img1Env');
    var imgData = JSON.stringify(getBase64Image(imgElem, 250));


	var imgElem1 = document.getElementById('fotoEdit_img2Env');
    var imgData1 = JSON.stringify(getBase64Image(imgElem1, 250));


	var imgElem2 = document.getElementById('fotoEdit_img3Env');
    var imgData2 = JSON.stringify(getBase64Image(imgElem2, 250));


	var imgElem3 = document.getElementById('fotoEdit_img4Env');
	var imgData3 = JSON.stringify(getBase64Image(imgElem3, 250));

    // Ocultar div mediante ID
    $('#fotoEdit2').hide();

	var fecha = new Date();
    var fechaAlt = padStr(fecha.getFullYear()) + "-" +
                  padStr(1 + fecha.getMonth()) + "-" +
                  padStr(fecha.getDate());
	
	
	if(imgOriginal != imgData){
		var contact = '{'+
			'"arcNombre":"Imagen 1",'+
			'"arcTipoDocto":"JPG",'+
			'"arcIdRelUsuCatServ":	{'+
										'"rpcIdusucatser":'+alerId+
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
				//success
			},
		
			error: function (jqXHR, status) {            
				//error
			}
		});
	}
	
	if(imgOriginal != imgData1){
		var contact = '{'+
			'"arcNombre":"Imagen 2",'+
			'"arcTipoDocto":"JPG",'+
			'"arcIdRelUsuCatServ":	{'+
										'"rpcIdusucatser":'+alerId+
									'},'+
			'"arcFechaAlta":"2016-10-18",'+
			'"arcUsuAlta":2,'+
			'"arcEstatus":1,'+
			'"archivoStr":'+imgData1+
			'}';
		
		jQuery.ajax({
			type: "POST",
			url: "http://189.210.245.211:7080/WSAtnCiu/getRelPerSerArchivos",
			data: contact.toString(),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data, status, jqXHR) {
				//success
			},
		
			error: function (jqXHR, status) {            
				//error
			}
		});
	}
	
	if(imgOriginal != imgData2){
		var contact = '{'+
			'"arcNombre":"Imagen 3",'+
			'"arcTipoDocto":"JPG",'+
			'"arcIdRelUsuCatServ":	{'+
										'"rpcIdusucatser":'+alerId+
									'},'+
			'"arcFechaAlta":"2016-10-18",'+
			'"arcUsuAlta":2,'+
			'"arcEstatus":1,'+
			'"archivoStr":'+imgData2+
			'}';
		
		jQuery.ajax({
			type: "POST",
			url: "http://189.210.245.211:7080/WSAtnCiu/getRelPerSerArchivos",
			data: contact.toString(),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data, status, jqXHR) {
				//success
			},
		
			error: function (jqXHR, status) {            
				//error
			}
		});	
	}
	
	if(imgOriginal != imgData3){
		var contact = '{'+
			'"arcNombre":"Imagen 4",'+
			'"arcTipoDocto":"JPG",'+
			'"arcIdRelUsuCatServ":	{'+
										'"rpcIdusucatser":'+alerId+
									'},'+
			'"arcFechaAlta":"2016-10-18",'+
			'"arcUsuAlta":2,'+
			'"arcEstatus":1,'+
			'"archivoStr":'+imgData3+
			'}';
		
		jQuery.ajax({
			type: "POST",
			url: "http://189.210.245.211:7080/WSAtnCiu/getRelPerSerArchivos",
			data: contact.toString(),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data, status, jqXHR) {
				//success
			},
		
			error: function (jqXHR, status) {            
				//error
			}
		});	
	}
}

function getBase64Image(imgElem, newWidth) {
   var oc = document.createElement('canvas'), octx = oc.getContext('2d');
   oc.width = imgElem.width;
   oc.height = imgElem.height;
   octx.drawImage(imgElem, 0, 0);
   while (oc.width * 0.5 > newWidth) {
     oc.width *= 0.5;
     oc.height *= 0.5;
     octx.drawImage(oc, 0, 0, oc.width, oc.height);
   }
   oc.width = newWidth;
   oc.height = oc.width * imgElem.height / imgElem.width;
   octx.drawImage(imgElem, 0, 0, oc.width, oc.height);
   var dataURL = oc.toDataURL("image/png");
   return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function guardarUbicacionEmergencia(){
    var IdUsuario = sessionStorage.getItem("IdUsuario");
    var f = new Date();
    var fechaActual = f.getFullYear() + '-' + f.getMonth() + '-' + f.getDate();
    var idEmergencia = sessionStorage.getItem("idEmergencia");
    var coordenadas = sessionStorage.getItem("coordenadas");
    var emergencia = '{' +
        '"remGps" : "' + coordenadas + '", ' +
        '"remUsuAlta" : ' + IdUsuario + ', ' +
        '"remEstatus" : 1, ' +
        '"remIdUsuario" : {' +
            '"usuarioId" : ' + IdUsuario +
        '}, ' +
        '"remIdEmergencia" : {' +
            '"emgIdEmergencia" : ' + idEmergencia +
        '}' +
    '}';
    jQuery.ajax({
			type: "POST",
			url: "http://189.210.245.211:7080/WSAtnCiu/insertarDatosBotonPanico",
			data: emergencia.toString(),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data, status, jqXHR) {
				//success
			},
			error: function (jqXHR, status) {
				//error
			}
		});	
}