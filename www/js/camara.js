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
		var photo = "";
		var val = 0;
		if(document.getElementById('fotoEdit_img1')){
			val = 1;
		}else if(document.getElementById('fotoEdit_img2')){
			val = 2;
		}else if(document.getElementById('fotoEdit_img3')){
			val = 3;
		}else if(document.getElementById('fotoEdit_img4')){
			val = 4;
		}
		
		if(!val == 0){
			switch(val){
				case 1: 
					photo = document.getElementById('fotoEdit_img1');
					$("#fotoEdit_img1").attr("src", imageData);
					break;
				case 2: 
					photo = document.getElementById('fotoEdit_img2');
					$("#fotoEdit_img2").attr("src", imageData);
					break;
				case 3: 
					photo = document.getElementById('fotoEdit_img3');
					$("#fotoEdit_img3").attr("src", imageData);
					break;
				case 4: 
					photo = document.getElementById('fotoEdit_img4');
					$("#fotoEdit_img4").attr("src", imageData);
					break;
			}
		}
    },
 
    onFail: function(message) {
		alert('Failed because: ' + message);
	}
};