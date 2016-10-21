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