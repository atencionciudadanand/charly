var app = {
 
    initialize: function() {
		this.bindEvents();
    },
         
    bindEvents: function() {
		var takePhoto = document.getElementById('takePhoto');
        takePhoto.addEventListener('click', app.takePhoto, false);
        var sendPhoto = document.getElementById('sendPhoto');
        sendPhoto.addEventListener('click', app.sendPhoto, false);		
	},
 
    sendPhoto: function() {
		alert('Imagen enviada al servidor');
    },
 
    takePhoto: function(){
		navigator.camera.getPicture(app.onPhotoDataSuccess, app.onFail, { 
			quality: 20, 
			allowEdit: true,
			destinationType: navigator.camera.DestinationType.DATA_URL
		});
	},
 
    onPhotoDataSuccess: function(imageData) {
		//$(imageCameraClicked).attr("src", imageData);
		
		var photo = document.getElementById('fotoEdit_img1');
        //photo.style.display = 'block';
		photo.src = "data:image/jpeg;base64," + imageData;
    },
 
    onFail: function(message) {
		alert('Failed because: ' + message);
	}
};