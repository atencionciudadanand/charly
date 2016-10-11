$(document).ready(function() {
   $("#select-native-2").hide();
   $("#select-native-3").hide();
   $("#select-native-4").hide();
   $("#select-native-5").hide();
   $("#select-native-1").on("change", cargarCombo) 
});

function cargarCombo() {
	
	$("#select-native-2 option").remove();
	
    if ($("#select-native-1").val() == 1) {
        $("#select-native-2").append("<option value='1'>Falla en luminarias</option>");
        $("#select-native-2").append("<option value='2'>Luminarias faltantes</option>");
		$("#select-native-2").append("<option value='3'>Da&ntilde;o a materiales de luminarias</option>");
    }else if($("#select-native-1").val() == 2){
		$("#select-native-2").append("<option value='1'>Fuga de agua</option>");
        $("#select-native-2").append("<option value='2'>Falta de agua</option>");
		$("#select-native-2").append("<option value='3'>Suministro de agua (pipa)</option>");
		$("#select-native-2").append("<option value='4'>Robo de coladera</option>");
		$("#select-native-2").append("<option value='5'>Mantenimiento de coladera</option>");
		$("#select-native-2").append("<option value='6'>Desazolve</option>");
    }else if($("#select-native-1").val() == 3){
		$("#select-native-2").append("<option value='1'>Colocaci&oacute;n de banquetas</option>");
        $("#select-native-2").append("<option value='2'>Mantenimiento de banquetas</option>");
		$("#select-native-2").append("<option value='3'>Pintura de guarniciones</option>");
		$("#select-native-2").append("<option value='4'>Pintura de se&ntilde;alamientos</option>");
		$("#select-native-2").append("<option value='5'>Colocaci&oacute;n de tope</option>");
		$("#select-native-2").append("<option value='6'>Demolici&oacute;n de tope</option>");
		$("#select-native-2").append("<option value='7'>Bacheo</option>");
		$("#select-native-2").append("<option value='8'>Re encarpetado</option>");
		$("#select-native-2").append("<option value='9'>Mantenimiento de puentes y estructuras</option>");
		$("#select-native-2").append("<option value='10'>Sem&aacute;foro da&ntilde;ado</option>");
		$("#select-native-2").append("<option value='11'>Sem&aacute;foro descompuesto</option>");
    }else if($("#select-native-1").val() == 4){
        $("#select-native-2").append("<option value='1'>Poda de &aacute;rbol</option>");
        $("#select-native-2").append("<option value='2'>Limpieza de calle o avenida</option>");
		$("#select-native-2").append("<option value='3'>Mantenimiento de parques</option>");
		$("#select-native-2").append("<option value='4'>Mantenimiento de jardines</option>");
		$("#select-native-2").append("<option value='5'>Recolecci&oacute;n de basura</option>");
		$("#select-native-2").append("<option value='6'>Recolecci&oacute;n de animales muertos en v&iacute;a p&uacute;blica</option>");
		$("#select-native-2").append("<option value='7'>Recolecci&oacute;n de muebles o autos abandonados en v&iacute;a p&uacute;blica</option>");
		$("#select-native-2").append("<option value='8'>Otro</option>");
    }
    else{
        $("#select-native-2").hide();
        return;
    }
    $("#select-native-2").show();
}