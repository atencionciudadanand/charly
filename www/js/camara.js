var miVariable;

var app = {
 
    initialize: function() {
		this.bindEvents();
    },
         
    bindEvents: function() {
		alert("jj");
		alert("%%%" + this.id);
		miVariable = this;
        takePhoto.addEventListener('click', app.takePhoto, false);
        var sendPhoto = document.getElementById('sendPhoto');
	},
 
    sendPhoto: function() {
		alert('Imagen enviada al servidor');
    },
 
    takePhoto: function(){
		alert("lll");
		navigator.camera.getPicture(app.onPhotoDataSuccess, app.onFail, { 
			quality: 20, 
            allowEdit: true, 
			destinationType: navigator.camera.DestinationType.DATA_URL 
		});
	},
 
    onPhotoDataSuccess: function(imageData) {
		alert ("$$$" + miVariable.id);

    },
 
    onFail: function(message) {
		alert('Failed because: ' + message);
	}
};