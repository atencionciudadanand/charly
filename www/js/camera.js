// JavaScript Document
var camera = {
	initialize: function() {
		this.bindEvents();
	},
	
	bindEvents: function() {
		var takePhoto = document.getElementById('takePhoto');
        var sendPhoto = document.getElementById('sendPhoto');
		takePhoto.addEventListener('click', camera.takePhoto, false);
		sendPhoto.addEventListener('click', camera.sendPhoto, false);
    },
	
	takePhoto: function(){
		navigator.camera.getPicture(camera.onPhotoDataSuccess, camera.onFail, {
			quality: 20, 
            allowEdit: true, 
			destinationType: navigator.camera.DestinationType.DATA_URL 
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