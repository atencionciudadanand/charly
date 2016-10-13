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
		alert("lll");
		navigator.camera.getPicture(app.onPhotoDataSuccess, app.onFail, { 
			quality: 20, 
            allowEdit: true, 
			destinationType: navigator.camera.DestinationType.DATA_URL 
		});
	},
 
    onPhotoDataSuccess: function(imageData) {
		var val = 0;
		alert("val: " + val);
		if(document.getElementById('fotoEdit_img1')){
			val = 1;
			var photo = document.getElementById('fotoEdit_img1');
			$("#fotoEdit_img1").attr("src", imageData);
		}else if(document.getElementById('fotoEdit_img2')){
			val = 2;
			var photo = document.getElementById('fotoEdit_img2');
			$("#fotoEdit_img2").attr("src", imageData);
		}else if(document.getElementById('fotoEdit_img3')){
			val = 3;
			var photo = document.getElementById('fotoEdit_img3');
			$("#fotoEdit_img3").attr("src", imageData);
		}else if(document.getElementById('fotoEdit_img4')){
			val = 4;
			var photo = document.getElementById('fotoEdit_img4');
			$("#fotoEdit_img4").attr("src", imageData);
		}
    },
 
    onFail: function(message) {
		alert('Failed because: ' + message);
	}
};