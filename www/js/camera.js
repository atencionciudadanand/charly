// JavaScript Document
var cam = {
	initialize: function() {
		this.bindEvents();
	},
	
	bindEvents: function() {
		var takePhoto = document.getElementById('btnGetCamara');
		takePhoto.addEventListener('click', cam.takePhoto, false);
    },
	
	takePhoto: function(){
		navigator.camera.getPicture(cam.onPhotoDataSuccess, cam.onFail, {
			quality: 20, 
			destinationType: navigator.camera.DestinationType.DATA_URL ,
            allowEdit: true
			
		});
	},
 
	onPhotoDataSuccess: function(imageData) {
		var photo = document.getElementById('fotoEdit_img');
		photo.src = "data:image/jpeg;base64," + imageData;
	},
 
    onFail: function(message) {
		alert('Failed because: ' + message);
	},

	sendPhoto: function() {
		alert('Imagen enviada al servidor');
	}
	
};