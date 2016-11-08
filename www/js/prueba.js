$( document ).on( "pageinit", "#servicios", function(e,data) {

		var id, target, option;
		
		target = {
		  latitude : 19.289168,
		  longitude: -99.653440,
		}

		options = {
		  enableHighAccuracy: true, //enableHighAccuracy: Se tratan de obtener los mejores resultados posible del GPS
		  timeout: 5000, //timeout: el tiempo maximo que se espera para obtener la posicion en este caso 5 segundos
		  maximumAge: 500000 //maximumAge- Guarda la posicion por 5 minutos
		};
		
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error, options );
			
		function success(position) {
			var crd = position.coords;
			if (target.latitude != crd.latitude && target.longitude != crd.longitude) {//Valida que la latitud y la longitud sean diferentes de las establecidas por default
				alert("function success if");
				MuestraMapa(new google.maps.LatLng(crd.latitude, crd.longitude));
			}else{
				//navigator.geolocation.clearWatch(id);
				alert("function success else");
				//MuestraMapa(new google.maps.LatLng(target.latitude, target.longitude));
			}
		}
		
        function error(error) {
			//si falla mostrar mpara en posicion por defecto
			//alert('---code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
			alert("function error");
			MuestraMapa(new google.maps.LatLng(target.latitude, target.longitude));
		}
		
		
    }else {
        //MuestraMapa(defaultPos);  // No soporta geolocalizacion y dibuja el mapa en posicion Default
		alert("segundo else");
		MuestraMapa(new google.maps.LatLng(target.coords.latitude, target.coords.longitude));
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

/*$(document).ready(function() {
   $("#btnEliminar").hide();
   cargaReportes();
});*/

function showCheck(){
	$("#btnEliminar").show();
	$(".hide").show();
}

function cargaReportes(){
    var js = '{"idUsuario": 2}';
    var idUser = sessionStorage.getItem("IdUsuario");
    jQuery.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            //url: "http://189.210.245.211:7080/WSAtnCiu/getRelPerSerByIdUser/" + idUser,
			url: "http://189.210.245.211:7080/WSAtnCiu/getRelPerSerByIdUser/89",
            data: js.toString(),
            dataType: "json",
            success: function (data, jqXHR, status) {
                removeItemReg(0,1);
                var flDatos = data;
                sessionStorage.setItem("Datos", flDatos);
                window.location.href ="#reportes";
                mostrarReportes(flDatos);
            },
            error: function (data, jqXHR, status) {
                alert("Error: No se obtuvo respuesta del servidor.");
                console.log("data: " + data);
                window.location.href ="#home";
            },
            done: function (e) {
                console.log("DONE");
            }
    });
}
function mostrarReportes(vlDatos){
    //var flDatos = sessionStorage.getItem("Datos");
    var flDatos = vlDatos;
    var tablaDatos= $("#tblDatos");

    var flFolio="";
    var flStatus="";
    var flServicio="";
    var flFalla="";
	var flValue="";

    for(i=0; i<flDatos.length;i++){
        var regFila = flDatos[i];

        flFolio=regFila.rpcFolioReporte;
        flStatus=regFila.rpcIdEstatusServ.estDescripcion;
        flServicio=regFila.rpcIdServicio.padreId.descripcion;
        flFalla = regFila.rpcIdServicio.descripcion;
		flValue = regFila.rpcIdusucatser;

        if(flStatus == "Registrado"){
            var color = "#DF0101"
        }
        if(flStatus == "Sin iniciar"){
            var color = "#DF0101"
        } 
        if(flStatus == "En proceso"){
            var color = "#DF7401"
        }
        if(flStatus == "Atendido"){
            var color = "#04B404"
        }

        tablaDatos.append("<tr style='display:none' class='hide'><td rowspan='4' ><input type='checkbox' value='"+flValue+"'></td></tr>"
						+ "<tr><td><td><strong>Reporte: </strong></td><td>"+flFolio+"</td></td></tr>"
                        + "<tr><td><td><strong>Servicio: </strong></td><td>"+flServicio+"</td> <td></td> <td style='color:"+color+"'><strong>"+flStatus+"</strong></td></td></tr>"
                        + "<tr><td><td><strong>Falla: </strong></td><td>"+flFalla+"</td></td></tr>");
    }

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
	
	alert(imgData);	
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
			'"arcNombre":"Imagen 1",'+
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
			'"arcNombre":"Imagen 1",'+
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

