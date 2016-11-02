var imageCameraClicked;

function validaLogin(){
    var flEmail = $("#text-CorreoLogin").val();
    var flPass = $("#text-PassLogin").val();
    if(flEmail != "" && flPass != ""){
        re= /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
		if(!re.exec($.trim(flEmail)) || $.trim(flPass).length < 6){
         alert("Error: Favor de validar sus datos");
        }else{
            jQuery.ajax({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                url: "http://189.210.245.211:7080/WSAtnCiu/getUserByNameAndPass/" + flEmail + "/" + flPass,
                dataType: "json",
                success: function (data, jqXHR, status) {
                    if(data != null){
						if(data.estatus == 1000){
							alert("Error: Contraseña incorrecta, favor de verificar datos");
							window.location.href ="#login";
						}else if(data.estatus == 1001){
							alert("Error: No se obtuvo respuesta del servidor. Favor de intentar más tarde");
							window.location.href ="#acceso";
						}else if(data.estatus == 1002){
                            alert("Error: El Usuario no existe, favor de verificar datos");
							window.location.href ="#login";
                        }else{
							alert("Éxito: Acceso correcto");
							sessionStorage.setItem("IdUsuario", data.usuarioId);
							window.location.href ="#home";
						}
                    }
                },
                error: function (data, jqXHR, status) {
                    alert("Error: No se obtuvo respuesta del servidor. Favor de intentar más tarde");
                    window.location.href ="#acceso";
                },
                done: function (e) {
                    console.log("DONE");
                }
            });
        }
    }else{
     alert("Error: Los campos con * son obligatorios.");
    }
}

function guardaReg(){
    removeItemReg(1,0);
    var email = $("#text-CorreoReg").val();
    var clave = $("#text-PassReg").val();
    var claveConfirma = $("#text-CPassReg").val();
    var nombreUser = $("#text-Nombre").val();
    var aPaterno = $("#text-APaterno").val();
    var aMaterno = $("#text-AMaterno").val();
    var numCel = $("#text-Cel").val();
    if(email != "" && clave != "" && claveConfirma != "" && nombreUser != "" && aPaterno != "" && aMaterno != "" && numCel != ""){
        re= /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
        if(!re.exec(email))    {
            alert("Error: La dirección de correo " + email + " es incorrecta.");
        }else{
            jQuery.ajax({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                url: "http://189.210.245.211:7080/WSAtnCiu/getUserByEmail/" + email + "/",
                dataType: "json",
                success: function (data, jqXHR, status) {
                    if(data == false){
                        if (clave == claveConfirma){
                            if (clave.length == 6){
                                sessionStorage.setItem("Email", email);
                                sessionStorage.setItem("Clave", clave);
                                sessionStorage.setItem("Nombre", nombreUser);
                                sessionStorage.setItem("ApellidoP", aPaterno);
                                sessionStorage.setItem("ApellidoM", aMaterno);
                                sessionStorage.setItem("Cel", numCel);
                                window.location.href ="#terminos";
                            } else{
                                alert("Error: La contraseña debe tener al menos 6 caracteres");
                            }
                        }else{
                            alert("Error: La contraseñas no son iguales.");
                        }
                    }else{
                        alert("Error: El usuario ya se encuentra registrado");
                        window.location.href ="#registro";
                        window.location.reload();

                    }
                },
                error: function (data, jqXHR, status) {
                    alert("Error: No se obtubo respuesta del servidor. Favor de intentar mas tarde");
                    window.location.href ="#acceso";
                },
                done: function (e) {
                    console.log("DONE");
                }
            });
        }
    }else {
        alert("Error: Los campos con * son obligatorios.");
    }
}

function guardaTerm(){
    var aceptaTer = 1;
    sessionStorage.setItem("Terminos", aceptaTer);
    console.log("Terminos: ", sessionStorage.getItem("Terminos"));
    console.log("Email: ", sessionStorage.getItem("Email"));
    window.location.href ="#privacidad";
}
function guardaPriv(){
    var email2 = sessionStorage.getItem("Email");
    var clave2 = sessionStorage.getItem("Clave");
    var nombre2 = sessionStorage.getItem("Nombre");
    var aPaterno2 = sessionStorage.getItem("ApellidoP");
    var aMaterno2 = sessionStorage.getItem("ApellidoM");
    var numCel2 = sessionStorage.getItem("Cel");
    var fecha = new Date();
    var fechaAlt = padStr(fecha.getFullYear()) + "-" +
                  padStr(1 + fecha.getMonth()) + "-" +
                  padStr(fecha.getDate());
    console.log("fechaAlt: ", fechaAlt);

    var contact = '{'+
        '"rolId":1,'+
        '"nombre":"'+nombre2+'",'+
        '"apPaterno":"'+aPaterno2+'",'+
        '"apMaterno":"'+aMaterno2+'",'+
        '"telefono":'+numCel2+','+
        '"email":"'+email2+'",'+
        '"estatusSesion":'+0+','+
        '"contrasenia":"'+clave2+'",'+
        '"fechaAlta":"'+fechaAlt+'",'+
        '"fechaModif":"'+fechaAlt+'",'+
        '"usuarioAlta":15,'+
        '"usuarioModif":14,'+
        '"estatus":'+1+''+
        '}';

    console.log("contact: ",contact)

    jQuery.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "http://189.210.245.211:7080/WSAtnCiu/addUsuario",
        data: contact.toString(),
        dataType: "json",
        success: function (data, status, jqXHR) {
            alert("Éxito: Registro Exitoso");
            window.location.href ="#login";
        },
        error: function (data, jqXHR, status) {
            window.location.href ="#login";
        },
        done: function (e) {
            console.log("DONE");
        }
    });

    //timeout: 100000,
}

function padStr(i) {
    return (i < 10) ? "0" + i : "" + i;
}

function exitTermAcces(){
    removeItemReg(1,1);
    window.location.href ="#acceso";
}

function exitAviso(){
    window.location.href ="#home";
    window.location.reload();
}

function exitReportes(obj){
    removeItemReg(1,1);
    window.location.href ="#home";
    window.location.reload();
}

function removeItemReg(idRegistro,idCReportes){
    if(idRegistro == 1){
        sessionStorage.removeItem("Email");
        sessionStorage.removeItem("Clave");
        sessionStorage.removeItem("Nombre");
        sessionStorage.removeItem("ApellidoP");
        sessionStorage.removeItem("ApellidoM");
        sessionStorage.removeItem("Cel");
    }
    if(idCReportes ==   1){
        sessionStorage.removeItem("data");
    }
}

function addClassImagePhoto(e){
    imageCameraClicked=e;
}

function logOut(){
    removeItemReg(1,1);
    window.location.href ="#acceso";
    window.location.reload();
}

/*
                var folio = data[0].rpcFolioReporte;
                var StatusReporte = data[0].rpcIdEstatusServ;
*/

/*function prueba(){
    a1=parseInt(document.getElementById('a').value);
    a2=parseInt(document.getElementById('b').value);
    var total=a1+a2;
    if(localStorage){
        localStorage.setItem("resultado",total);
        document.getElementById('c').value=localStorage.getItem("resultado")
    }else{
        alert("tu navegador no puede guardar nada XD");
    }
    //if(localStorage){
      //  alert(localStorage.getItem("resultado"));
    //}
}

function borrar(){
    alert(localStorage.getItem("resultado"));
    localStorage.removeItem("resultado");
    alert(localStorage.getItem("resultado"));
}*/

/*function addUsuario() {

	var txtNombre = $('#txtNombre').val();
	var txtApellPaterno = $('#txtApellPaterno').val();
	var txtApellMaterno = $('#txtApellMaterno').val();
	var txtEmail = $('#txtEmail').val();
	var rdSexo = $('input:radio[name=rdSexo]:checked').val();


	var contact = '{"nombre":"'+txtNombre+'","apPaterno":"'+txtApellPaterno+'","apMaterno":"'+txtApellMaterno+'","email":"'+txtEmail+'","sexo":"'+rdSexo+'"}';

    jQuery.ajax({
        type: "POST",
        url: "http://localhost:8080/WSAtnCiu/addUsuario",
        data: contact.toString(),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, status, jqXHR) {
        	// rest
        },

        error: function (jqXHR, status) {
        	// rest
        }
    });
}*/
function mostrarBtnTerminarEmergencia()
{
    //alert("entro al js");
    document.getElementById('terminarEmergencia').style.display = "inline";
}

function refrescarHome()
{
    location.href = "#home";
    location.reload();
}