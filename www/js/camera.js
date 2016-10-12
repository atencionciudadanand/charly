// JavaScript Document
$(document).ready(function(e) {
	
	/**$("#btnGetCamara").click(function(e){
		alert(“btnGetCamara”);
		e.stopPropagation();
		navigator.camera.getPicture(cameraSuccess, cameraError, {
			quality: 50,
			destinationType : Camera.DestinationType.FILE_URI,
			sourceType: Camera.PictureSourceType.CAMERA,
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
			saveToPhotoAlbum: true		
		});
	}); 
	
	$("#btnGetLibrary").click(function(e){
		e.stopPropagation();
		alert(“btnGetLibrary”);
		navigator.camera.getPicture(cameraSuccess, cameraError, {
			quality:50,
			destinationType : Camera.DestinationType.FILE_URI,
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
			saveToPhotoAlbum: true			
		});
	});**/
	
	$("#btnGetCamara").click(function(e){
		alert("puta prueba de mierda");
	});
	
});

function cameraSuccess(imageURL){
	$("#fotoEdit_img").attr("src", imageURL);
	$.imageURL = imageURL;
	$("#cameraMenu").popup("close");
};
	
function cameraError(msg){
	navigator.notification.alert("Error capturando foto: " + msg)
}